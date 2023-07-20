const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: "./src/index.js", // this tells webpack where our application starts and where to start bundling our files
  output: {
    filename: "[name].[contenthash].js", // this tells webpack to use a unique name for our bundled file
  },
  resolve: {
    extensions: [".js", ".vue"],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i, 
        use: [
          { loader: 'file-loader' }
        ]
      },
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.scss|\.css$/, // this tells webpack to use css-loader for any file that ends in .css
        use: ["vue-style-loader", "style-loader", "css-loader", "sass-loader"], // these are the loaders
      },
      {
        test: /\.m?js$/, // whenever webpack sees a file that ends in .js or .mjs, we want it processed by babel-loader
        exclude: /node_modules/, // we don't want to run babel on any files inside of node_modules
        use: {
          loader: "babel-loader", // use babel-loader to run babel on every file it runs through
          options: {
            presets: [
              // presets are collections of plugins that teach babel how to handle certain things
              "@babel/preset-env", // tells babel to understand es2015, 16, 17 syntax and convert it to es5
            ],
            plugins: [
              // plugins are used to teach babel how to handle certain syntax
              "@babel/plugin-transform-runtime", // allows us to use async/await syntax
            ],
          },
        },
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
