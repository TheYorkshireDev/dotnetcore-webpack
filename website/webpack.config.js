/*
 * Webpack configuration
 *
 * This file is is the entry point for running webpack. 
 */
var merge = require('webpack-merge');
var baseConfig = require('./webpack/webpack.base.config.js');
var devConfig = require('./webpack/webpack.dev.config.js');
var prodConfig = require('./webpack/webpack.prod.config.js');

var currentDirectory = __dirname;

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    return merge(baseConfig(currentDirectory), isDevBuild ? devConfig : prodConfig);
};