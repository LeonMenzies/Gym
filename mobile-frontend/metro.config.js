const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Ensure React is always resolved from the root node_modules
  if (moduleName === 'react' || moduleName === 'react-dom') {
    return {
      type: 'sourceFile',
      filePath: require.resolve(moduleName, {
        paths: [__dirname],
      }),
    };
  }
  
  // Use the default resolver for everything else
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
