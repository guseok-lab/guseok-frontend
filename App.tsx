import "./global.css";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, Easing } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import TabNavigator from "./src/navigation/TabNavigator";
import { enableFreeze } from "react-native-screens";

enableFreeze(false);
SplashScreen.preventAutoHideAsync();

function AnimatedSplash({ onFinish }: { onFinish: () => void }) {
  const scale = useRef(new Animated.Value(0.6)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        Animated.timing(fadeOut, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }).start(onFinish);
      }, 900);
    });
  }, []);

  return (
    <Animated.View
      style={{ opacity: fadeOut, flex: 1, backgroundColor: "#6366f1", alignItems: "center", justifyContent: "center" }}
    >
      <Animated.View style={{ transform: [{ scale }], opacity, alignItems: "center" }}>
        <View
          style={{
            width: 96,
            height: 96,
            backgroundColor: "#ffffff",
            borderRadius: 24,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 4 },
            elevation: 8,
          }}
        >
          <Text style={{ fontSize: 44 }}>🧪</Text>
        </View>
        <Text style={{ color: "#ffffff", fontSize: 28, fontWeight: "700", letterSpacing: -0.5 }}>
          guseok-lab
        </Text>
        <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginTop: 8 }}>
          새로운 경험을 시작하세요
        </Text>
      </Animated.View>
    </Animated.View>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    async function prepare() {
      await new Promise((r) => setTimeout(r, 300));
      await SplashScreen.hideAsync();
      setReady(true);
    }
    prepare();
  }, []);

  if (!ready) return null;

  if (showSplash) {
    return (
      <SafeAreaProvider>
        <AnimatedSplash onFinish={() => setShowSplash(false)} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
