'use strict';

var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

const config = {
    mode:'development',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'api.min.js'
    },
    devtool:'source-map',
    stats:{
        colors:true
    },
    module: {
        rules: [
            { test: /\.json$/, loader: 'json-loader'}, 
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-2']
                }
            },
         ]
    },
}

module.exports = config;