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

const env = process.env.NODE_ENV

const config = {
    mode:env || 'development',
    target:'node',
    entry: [ './src/index.js'],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'api.login.js'
    },

    resolve: {
        extensions: ['.js'],
        modules: [
          'node_modules',
        ],
        symlinks: false,
      },
    
    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },

    externals: nodeModules, 
    plugins: [
        new webpack.BannerPlugin({ banner:'require("source-map-support").install();',
                                                  raw:true, entryOnly:false}  ),
        
         new webpack.optimize.SplitChunksPlugin({
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
          }),
      ],
    devtool:'source-map',
    stats:{
        colors:true
    },
    
}

module.exports = config;