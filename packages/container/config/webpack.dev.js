const { merge } = require('webpack-merge'); // merge allows us to merge two webpack config files together
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container', // this name is used by the container to reference this module
      remotes: {
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
      },
      shared: packageJson.dependencies, // this lets us share all of the dependencies in the package.json file
    }),
  ],
};

// merge the common config with the dev config, 
//listing devConfig last so that it overrides any commonConfig properties that are the same
module.exports = merge(commonConfig, devConfig);  