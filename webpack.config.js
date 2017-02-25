var path = require('path');
var webpack = require("webpack");

module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
//	module: {
//		rules: [{
//			test: path.join(__dirname),
//			 use: {
//				 loader: 'babel-loader',
//					options: {
//						cacheDirectory: 'babel_cache',
//			//					presets: debug ? ['react', 'es2015', 'react-hmre'] : ['react', 'es2015']
//						presets: ['react', 'es2015']
//					}
//				}
//		}]
//	}
};
	