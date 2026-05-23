import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./TabNavigator";
import type { RootStackParamList } from "./types";

import PreRegisterScreen from "../features/setting/screens/PreRegisterScreen";
import FaqScreen from "../features/setting/screens/FaqScreen";
import TermsScreen from "../features/setting/screens/TermsScreen";
import NotificationSettingScreen from "../features/setting/screens/NotificationSettingScreen";

import VideoUploadScreen from "../features/explore/screens/VideoUploadScreen";
import DroneConnectScreen from "../features/explore/screens/DroneConnectScreen";
import DroneCameraScreen from "../features/explore/screens/DroneCameraScreen";
import AIResultScreen from "../features/explore/screens/AIResultScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="MainTabs"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="MainTabs" component={TabNavigator} />

            <Stack.Screen name="PreRegister" component={PreRegisterScreen} />
            <Stack.Screen name="Faq" component={FaqScreen} />
            <Stack.Screen name="Terms" component={TermsScreen} />
            <Stack.Screen
                name="NotificationSetting"
                component={NotificationSettingScreen}
            />

            <Stack.Screen name="VideoUpload" component={VideoUploadScreen} />
            <Stack.Screen name="DroneConnect" component={DroneConnectScreen} />
            <Stack.Screen name="DroneCamera" component={DroneCameraScreen} />
            <Stack.Screen name="AIResult" component={AIResultScreen} />
        </Stack.Navigator>
    );
}
