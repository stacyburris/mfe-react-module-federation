const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const prodConfig = {
  mode: 'production', // this tells webpack to use its production optimizations, like minifying our code, etc.
  output: {
    filename: '[name].[contenthash].js', // this tells webpack to use a unique name for our bundled js file
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'marketing', // this name is used by the container to reference this module
      filename: 'remoteEntry.js', // this is the file that the container will look at to see what our marketing module exposes
      exposes: {
        './MarketingApp': './src/bootstrap', // this exposes the MarketingApp component found in src/bootstrap.js
      },
      shared: packageJson.dependencies, // this lets us share all of the dependencies in the package.json file
    }),
  ],
};
module.exports = merge(commonConfig, prodConfig); // merge the common config with the prod config, listing prodConfig last so that it overrides any commonConfig properties that are the same