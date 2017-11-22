var devConfig = require('./webpack.local.config');

ensureBuildExists();

// Start webpack:
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var compiler = webpack(devConfig);

new WebpackDevServer(compiler, {
  publicPath: devConfig.output.publicPath,
  contentBase: "./build",
  disableHostCheck: true,
  hot: true,
  quiet: false,
  filename: 'app.js',
  stats: { colors: true },
  noInfo: false,
  historyApiFallback: true
}).listen(devConfig.port, '0.0.0.0', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Dev Server listening at http://127.0.0.1:' + devConfig.port);
  }
});

function ensureBuildExists() {
  var fs = require('fs');
  var path = require('path');
  var buildDir = path.join(__dirname, 'build');

  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
  }

  var source = path.join(__dirname, 'src', 'index.html');
  var dest = path.join(__dirname, 'build', 'index.html');

  console.log('Copying ' + source + ' to ' + dest);
  fs.createReadStream(source).pipe(fs.createWriteStream(dest));
}
