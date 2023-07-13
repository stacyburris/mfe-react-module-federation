module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/, // whenever webpack sees a file that ends in .js or .mjs, we want it processed by babel-loader
        exclude: /node_modules/, // we don't want to run babel on any files inside of node_modules
        use: {
          loader: "babel-loader", // use babel-loader to run babel on every file it runs through
          options: {
            presets: [
              // presets are collections of plugins that teach babel how to handle certain things
              "@babel/preset-react", // tells babel to understand jsx tags
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
};
