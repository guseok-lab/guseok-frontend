import "./global.css";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TabNavigator from "./src/navigation/TabNavigator";
import { enableFreeze } from "react-native-screens";

enableFreeze(false);

export default function App() {
  return (
      <SafeAreaProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
  );
}