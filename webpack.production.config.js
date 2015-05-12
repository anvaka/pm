/**
 * This is the Webpack configuration file for production.
 */
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: "./src/main",

  output: {
    path: __dirname + "/build/",
    filename: "app.js"
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('css-loader!less-loader')
    }, {
      test: /\.(woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=1&name=[name].[ext]'
    }]
  },

  plugins: [
    new ExtractTextPlugin('styles.css', { allChunks: true })
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  devServer: {
    info: true
  }
};
