const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.transformer.babelTransformerPath = require.resolve(
    "react-native-svg-transformer/expo"
);

config.resolver.assetExts = config.resolver.assetExts.filter(
    (ext) => ext !== "svg"
);

config.resolver.sourceExts = [...config.resolver.sourceExts, "svg"];

// Expo Go에서 react-native-screens 4.x + Fabric 충돌 우회용 mock.
config.resolver.extraNodeModules = {
    ...(config.resolver.extraNodeModules || {}),
    "react-native-screens": path.resolve(__dirname, "mocks/react-native-screens.js"),
};

module.exports = withNativeWind(config, {
    input: "./global.css",
});
