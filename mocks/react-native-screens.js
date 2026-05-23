// Expo Go (Fabric)에서 react-native-screens 4.x의 native screens가
// reanimated의 createAnimatedComponent로 wrapping될 때 prop type 충돌이 발생.
// react-navigation/bottom-tabs와 stack은 react-native-screens 없을 때
// 일반 View로 fallback하므로 이 모듈을 빈 View 기반 stub으로 교체한다.
const React = require("react");
const { View } = require("react-native");

const passthrough = React.forwardRef((props, ref) => {
    return React.createElement(View, { ref, ...props });
});

const noop = () => {};

const exportsObj = {
    // toggles
    enableScreens: noop,
    enableFreeze: noop,
    freezeEnabled: () => false,
    screensEnabled: () => false,
    shouldUseActivityState: () => false,

    // components
    Screen: passthrough,
    ScreenContainer: passthrough,
    NativeScreen: passthrough,
    NativeScreenContainer: passthrough,
    ScreenStack: passthrough,
    ScreenStackItem: passthrough,
    ScreenStackHeaderConfig: passthrough,
    ScreenStackHeaderSubview: passthrough,
    ScreenStackHeaderRightView: passthrough,
    ScreenStackHeaderLeftView: passthrough,
    ScreenStackHeaderCenterView: passthrough,
    ScreenStackHeaderBackButtonImage: passthrough,
    ScreenStackHeaderSearchBarView: passthrough,
    SearchBar: passthrough,
    FullWindowOverlay: passthrough,

    // gesture-handler bridge stub
    ScreenContext: React.createContext(null),
    ScreenStackContext: React.createContext(null),

    // additional helpers some libs reach for
    isSearchBarAvailableForCurrentPlatform: false,
    executeNativeBackPress: noop,
    useTransitionProgress: () => ({ progress: { value: 0 } }),
};

module.exports = exportsObj;
module.exports.default = passthrough;
