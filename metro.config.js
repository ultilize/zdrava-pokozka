const { getDefaultConfig } = require('@expo/metro-config');

module.exports = (async () => {
  const {
    resolver: { assetExts },
    transformer,
  } = await getDefaultConfig(__dirname);

  return {
    transformer: {
      ...transformer,
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    resolver: {
      assetExts: [...assetExts, 'bin'],
    },
  };
})();