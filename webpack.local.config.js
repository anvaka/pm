// development config
var webpack = require('webpack');

// Where to listen for the dev server
var devPort = process.env.DEVPORT || 9090;

// For more information, see: http://webpack.github.io/docs/configuration.html
module.exports = {
  devPort: devPort,

  // Efficiently evaluate modules with source maps
  devtool: "eval",

  // Set entry point to ./src/main and include necessary files for hot load
  entry:  [
    "webpack-dev-server/client?http://localhost:" + devPort,
    "webpack/hot/only-dev-server",
    "./src/main"
  ],

  // This will not actually create a bundle.js file in ./build. It is used
  // by the dev server for dynamic hot loading.
  output: {
    path: __dirname + "/build/",
    filename: "app.js",
    publicPath: "http://localhost:" + devPort + "/build/"
  },

  // Necessary plugins for hot load
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  // Transform source code using Babel and React Hot Loader
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ["react-hot", "babel-loader"]}
    ]
  },

  // Automatically transform files with these extensions
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
