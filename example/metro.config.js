const path = require('path');
const { getDefaultConfig } = require('@expo/metro-config');
const { withMetroConfig } = require('react-native-monorepo-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = withMetroConfig(getDefaultConfig(projectRoot), {
  root: workspaceRoot,
  dirname: projectRoot,
});

// Ensure Metro watches the workspace and resolves modules correctly from the app
config.watchFolders = Array.from(
  new Set([...(config.watchFolders || []), workspaceRoot])
);

config.resolver = {
  ...(config.resolver || {}),
  // Avoid duplicate React/React Native copies
  nodeModulesPaths: [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(workspaceRoot, 'node_modules'),
  ],
  disableHierarchicalLookup: true,
  extraNodeModules: {
    // Resolve the library import to its source for Fast Refresh during local dev
    '@jamadd/react-native-template-ui': path.resolve(workspaceRoot, 'src'),
    // Always use the app's React/React Native
    'react': path.resolve(projectRoot, 'node_modules/react'),
    'react-native': path.resolve(projectRoot, 'node_modules/react-native'),
  },
};

config.resolver.unstable_enablePackageExports = true;

module.exports = config;
