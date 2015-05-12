// development config
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

// Where to listen for the dev server
var port = process.env.PORT || 8080;

// For more information, see: http://webpack.github.io/docs/configuration.html
module.exports = {
  port: port,

  // Efficiently evaluate modules with source maps
  //devtool: "eval",

  // Set entry point to ./src/main and include necessary files for hot load
  entry: [
    "webpack-dev-server/client?http://localhost:" + port,
    "webpack/hot/only-dev-server",
    "./src/main"
  ],

  // This will not actually create a bundle.js file in ./build. It is used
  // by the dev server for dynamic hot loading.
  output: {
    path: __dirname + "/build/",
    filename: "app.js",
    publicPath: "/"
  },

  // Transform source code using Babel and React Hot Loader
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ["react-hot", "babel-loader"]
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('css!less')
    }, {
      test: /\.(woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=1&name=[name].[ext]'
    }]
  },

  // Necessary plugins for hot load
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // extract inline css into separate 'styles.css'
    new ExtractTextPlugin('styles.css', {allChunks: true})
  ],

  // Automatically transform files with these extensions
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
