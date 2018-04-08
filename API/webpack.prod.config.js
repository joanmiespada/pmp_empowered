'use strict';

var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

const config = {
    mode:'production',
    module: {
       /* loaders: [
            { test: /\.json$/, loader: 'json'}, 
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-2']
                }
            },
         ]*/
    },
    
    resolve: {
        extensions: ['.json','.js','.jsx'] // common extensions
    },
    // other plugins, postcss config etc. common for frontend and backend

    devtool: debug ? "inline-sourcemap" : null,
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'api.min.js'
    },
    target: 'node',
    externals:  fs.readdirSync("node_modules")
    .reduce(function(acc, mod) {
      if (mod === ".bin") {
        return acc
      }
  
      acc[mod] = "commonjs " + mod
      return acc
    }, {})

}
const devServer = {
    colors:true,
    historyApiFallback:true, 
    inline:true,
    hot:true,
    contentBase: './public'
}

module.exports = config;