var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var config = {
  plugins: [
    // Minify JS
    new UglifyJsPlugin({
      sourceMap: false
    })
  ]
};

module.exports = config;