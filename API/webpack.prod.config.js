'use strict';
var fs = require('fs');
var webpack = require('webpack');
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
    mode:'production',
    target:'node',
    entry: ['./src/index.js'],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'api.js'
    },
    externals: nodeModules
    
}

module.exports = config;