import React, { useRef } from "react";
import { Animated, Dimensions, PanResponder, View } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 100;
const EDGE_HIT_ZONE = 40;

interface SwipeBackWrapperProps {
    onClose: () => void;
    children: React.ReactNode;
}

export default function SwipeBackWrapper({
                                             onClose,
                                             children,
                                         }: SwipeBackWrapperProps) {
    const translateX = useRef(new Animated.Value(0)).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, g) => {
                // 화면 왼쪽 가장자리에서 시작한 오른쪽 swipe만 인식 (가로 swipe 우선)
                const startedAtEdge = evt.nativeEvent.pageX <= EDGE_HIT_ZONE;
                return (
                    startedAtEdge &&
                    g.dx > 8 &&
                    Math.abs(g.dx) > Math.abs(g.dy)
                );
            },
            onPanResponderMove: (_, g) => {
                if (g.dx > 0) translateX.setValue(g.dx);
            },
            onPanResponderRelease: (_, g) => {
                if (g.dx > SWIPE_THRESHOLD) {
                    Animated.timing(translateX, {
                        toValue: SCREEN_WIDTH,
                        duration: 180,
                        useNativeDriver: true,
                    }).start(() => {
                        translateX.setValue(0);
                        onClose();
                    });
                } else {
                    Animated.spring(translateX, {
                        toValue: 0,
                        useNativeDriver: true,
                        bounciness: 0,
                    }).start();
                }
            },
            onPanResponderTerminate: () => {
                Animated.spring(translateX, {
                    toValue: 0,
                    useNativeDriver: true,
                    bounciness: 0,
                }).start();
            },
        }),
    ).current;

    return (
        <View style={{ flex: 1 }} {...panResponder.panHandlers}>
            <Animated.View
                style={{
                    flex: 1,
                    transform: [{ translateX }],
                }}
            >
                {children}
            </Animated.View>
        </View>
    );
}
