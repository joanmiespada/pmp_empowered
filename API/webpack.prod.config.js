'use strict';

var webpack = require('webpack');
var path = require('path');

const config = {
    mode:'production',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'api.min.js'
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