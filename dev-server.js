var port = process.env.PORT || 8080;

var express = require('express');
var app = express();
var devConfig = require('./webpack.local.config');

ensureBuildExists();

// Serve application file depending on environment
app.get('/app.js', function(req, res) {
  if (process.env.PRODUCTION) {
    res.sendFile(__dirname + '/build/app.js');
  } else {
    res.redirect('//localhost:' + devConfig.devPort + '/build/app.js');
  }
});

// Serve index page
app.get('*', function(req, res) {
  res.sendFile(__dirname + '/build/index.html');
});

// Start webpack:
if (!process.env.PRODUCTION) {
  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');

  new WebpackDevServer(webpack(devConfig), {
    publicPath: devConfig.output.publicPath,
    hot: true,
    noInfo: true,
    historyApiFallback: true
  }).listen(devConfig.devPort, 'localhost', function (err) {
    if (err) {
      console.log(err);
    }
  });
}

// GO!
var server = app.listen(port, function () {
  var port = server.address().port;

  console.log('Dev Server listening at http://127.0.0.1:' + port);
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
