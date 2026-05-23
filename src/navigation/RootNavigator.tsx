import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TabNavigator from "./TabNavigator";
import type { RootStackParamList } from "./types";

import PreRegisterScreen from "../features/setting/screens/PreRegisterScreen";
import FaqScreen from "../features/setting/screens/FaqScreen";
import TermsScreen from "../features/setting/screens/TermsScreen";
import NotificationSettingScreen from "../features/setting/screens/NotificationSettingScreen";

const Stack = createStackNavigator<RootStackParamList>();

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
        </Stack.Navigator>
    );
}
