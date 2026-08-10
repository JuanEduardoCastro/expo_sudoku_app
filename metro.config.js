const {
  getSentryExpoConfig
} = require("@sentry/react-native/metro");

module.exports = (() => {
  /** @type {import('expo/metro-config').MetroConfig} */
  const config = getSentryExpoConfig(__dirname);

  config.resolver.sourceExts.push("sql");

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  return config;
})();