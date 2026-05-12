import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

import HomeScreen from "../features/home/screens/HomeScreen";
import ExploreScreen from "../features/explore/screens/ExploreScreen";
import SettingsScreen from "../features/setting/screens/SettingsScreen";

import HomeIcon from "./assets/svg/Home.svg";
import SearchIcon from "./assets/svg/Search.svg";
import MyIcon from "./assets/svg/My.svg";

const Tab = createBottomTabNavigator();

const fullConfig = resolveConfig(tailwindConfig);
const colors = fullConfig.theme.colors as any;

function NormalTabIcon({ focused, Icon }: { focused: boolean; Icon: any }) {
    return (
        <Icon
            width={24}
            height={24}
            color={focused ? colors.bk : colors.gr200}
        />
    );
}

function SearchTabIcon({ focused }: { focused: boolean }) {
    return (
        <View
            style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: focused ? colors.bk : colors.gr200,
                alignItems: "center",
                justifyContent: "center",
                marginTop: -18,
            }}
        >
            <SearchIcon width={26} height={26} color={colors.bg} />
        </View>
    );
}

export default function TabNavigator() {
    return (
        <Tab.Navigator
            detachInactiveScreens={false}
            screenOptions={{
                headerShown: false,
                freezeOnBlur: false,
                tabBarActiveTintColor: colors.bk,
                tabBarInactiveTintColor: colors.gr200,
                tabBarStyle: {
                    height: 90,
                    overflow: "visible",
                    backgroundColor: colors.bg,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "HOME",
                    tabBarItemStyle: {
                        paddingTop: 8,
                    },
                    tabBarIcon: ({ focused }) => (
                        <NormalTabIcon focused={focused} Icon={HomeIcon} />
                    ),
                }}
            />

            <Tab.Screen
                name="Explore"
                component={ExploreScreen}
                options={{
                    tabBarLabel: "EXPLORE",
                    tabBarLabelStyle: {
                        marginTop: 12,
                    },
                    tabBarIcon: ({ focused }) => (
                        <SearchTabIcon focused={focused} />
                    ),
                }}
            />

            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarLabel: "MY",
                    tabBarItemStyle: {
                        paddingTop: 8,
                    },
                    tabBarIcon: ({ focused }) => (
                        <NormalTabIcon focused={focused} Icon={MyIcon} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}