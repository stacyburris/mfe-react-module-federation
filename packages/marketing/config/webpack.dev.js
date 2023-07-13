const { merge } = require('webpack-merge'); // merge allows us to merge two webpack config files together
const HtmlWebpackPlugin = require('html-webpack-plugin'); // this plugin will generate an html file for us and inject our bundled js file into it
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // tells the plugin where our html file is located
    }),
  ],
};

// merge the common config with the dev config, 
//listing devConfig last so that it overrides any commonConfig properties that are the same
module.exports = merge(commonConfig, devConfig);  