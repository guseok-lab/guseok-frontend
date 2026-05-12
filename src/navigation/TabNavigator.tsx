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

function NormalTabIcon({
                           focused,
                           Icon,
                       }: {
    focused: boolean;
    Icon: any;
}) {
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
            className="w-14 h-14 rounded-full items-center justify-center"
            style={{
                backgroundColor: focused ? colors.bk : colors.gr200,
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
                    backgroundColor: colors.bg,
                    position: "absolute",
                    elevation: 0,
                    overflow: "visible",
                },
                sceneStyle: {
                    backgroundColor: "transparent",
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
                        marginTop: 14,
                    },
                    tabBarIconStyle: {
                        marginTop: -10,
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