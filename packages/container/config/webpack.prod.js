const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN; // this is set in the build command in package.json

const prodConfig = {
  mode: 'production', // this tells webpack to use its production optimizations, like minifying our code, etc.
  output: {
    filename: '[name].[contenthash].js', // this tells webpack to use a unique name for our bundled js file
    publicPath: '/container/latest/', // this tells webpack where to put the bundled file when we run the build command 
  },
  headers: {
    'Access-Control-Allow-Origin': '*', // this allows us to make requests from any domain  
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container', // this name is used by the container to reference this module
      remotes: {
        marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
        auth: `auth@${domain}/auth/latest/remoteEntry.js`,
        dashboard: `dashboard@${domain}/dashboard/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies, // this lets us share all of the dependencies in the package.json file
    }),
  ],
};
module.exports = merge(commonConfig, prodConfig); // merge the common config with the prod config, listing prodConfig last so that it overrides any commonConfig properties that are the same