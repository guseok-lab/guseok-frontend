import { enableFreeze, enableScreens } from "react-native-screens";

// Expo Go (Fabric)에서 react-native-screens가 reanimated의 createAnimatedComponent로
// 자기 내부 컴포넌트(Suspender/Freeze 등)를 wrapping하면서 prop validator와 충돌해
// "HostFunction TypeError" 가 발생. screens 자체를 끄면 JS 기반 View로 fallback.
enableScreens(false);
enableFreeze(false);
