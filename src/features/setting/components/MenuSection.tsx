import React from "react";
import { View } from "react-native";

interface MenuSectionProps {
    children: React.ReactNode;
}

export default function MenuSection({
                                        children,
                                    }: MenuSectionProps) {
    return (
        <View className="mt-10 border-t border-gr200">
            {children}
        </View>
    );
}