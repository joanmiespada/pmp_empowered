'use strict';
var webpack = require('webpack');
var fs = require('fs');
var path = require('path');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

const config = {
    mode:'development',
    target:'node',
    entry: [ './src/index.js'],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'apis.business.login.js'
    },
    externals: nodeModules, 
    plugins: [
        new webpack.IgnorePlugin(/\.(css|less)$/),
        new webpack.BannerPlugin('require("source-map-support").install();')
      ],
    devtool:'source-map',
    stats:{
        colors:true
    },
    
}

module.exports = config;