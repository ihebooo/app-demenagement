// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// 2. Enable Tamagui
const { withTamagui } = require("@tamagui/metro-plugin");
const tamaguiConfig = withTamagui(config, {
  components: ["tamagui"],
  config: "./tamagui.config.js",
  outputCSS: "./tamagui.css",
});

// Add support for SVG files
const { transformer, resolver } = tamaguiConfig;

tamaguiConfig.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

tamaguiConfig.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter(ext => ext !== 'svg'),
  sourceExts: [...resolver.sourceExts, 'svg'],
};

module.exports = tamaguiConfig;
