/**
 * Created by robertzzy on 03/07/16.
 */
"use strict";

// MAIN DEPENDENCIES
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import Clean from 'clean-webpack-plugin';

// base app dir
let root_dir = path.resolve(__dirname, '..');
let output = path.join(root_dir, 'build');
let cleanDirectories = ['build'];


module.exports = (option)=> {
	let processVars = {
		'process.env': {}
	};
	processVars['DEBUG'] = option.debug;
	processVars['LOCAL'] = !option.all;

	let commonPlugin = [];
	let appPlugin = [];
	let loginPlugin = [];

	if(option.debug){
		appPlugin.push(
			new HtmlWebpackPlugin({
				title:'健客',
				filename: 'index.html',
				template: path.join(root_dir, 'template/index.html')
			}),
			new webpack.HotModuleReplacementPlugin(),
			new Clean(cleanDirectories, root_dir),
			new ExtractTextPlugin("app.css"))
	}else{
		processVars['process.env'].NODE_ENV = JSON.stringify('production');
		processVars['process.env'].BROWSER = JSON.stringify(true);
		commonPlugin.push(
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			}),
			new webpack.PrefetchPlugin("react"),
			new webpack.optimize.OccurrenceOrderPlugin(true),
			new webpack.optimize.DedupePlugin());
		appPlugin.push(
			new HtmlWebpackPlugin({
				title:'T.N.T 管理',
				filename: '../template/index.html',
				template: path.join(root_dir, 'template/index.html')
			}),
			new Clean(cleanDirectories, root_dir),
			new ExtractTextPlugin("[hash].css"));
	}

	commonPlugin.push(new webpack.DefinePlugin(processVars));
	Array.prototype.push.apply(appPlugin, commonPlugin);
	Array.prototype.push.apply(loginPlugin, commonPlugin);

	if(option.debug){
		return {
			context: path.join(root_dir, 'app'),
			entry: [
				'./app',
				'webpack/hot/dev-server',
				'webpack-dev-server/client?http://localhost:3002'
			],
			output:{
				publicPath: "http://localhost:3002/assets/",
				path: path.join(output, 'app'),
				filename: 'app.js'
			},
			resolve: {
				extensions: ['', '.js', '.jsx']
			},
			module: {
				loaders: [
					{ test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: [/node_modules/, /__tests__/] },
					{ test: /\.sass$/, loader: ExtractTextPlugin.extract('style', 'css!sass?indentedSyntax')},
					{ test: /\.json$/, loader: 'json'},
					{
						test: /\.(jpe?g|png|gif|svg)$/i,
						loaders: [
							'file?hash=sha512&digest=hex&name=[hash].[ext]'
						]
					}
				]
			},
			devtool:"#inline-source-map",
			devServer: {
				contentBase: path.join(output, 'app')
			},
			plugins:appPlugin
		}
	}else{
		return{
			context: path.join(root_dir, 'app'),
			entry: './app',
			output:{
				path: path.join(output, 'app'),
				filename: '[hash].js'
			},
			resolve: {
				extensions: ['', '.js', '.jsx']
			},
			module: {
				loaders: [
					{ test: /\.js?$/, loader: 'babel', exclude: [/node_modules/, /__tests__/] },
					{ test: /\.sass$/, loader: ExtractTextPlugin.extract('style', 'css!sass?indentedSyntax')},
					{ test: /\.json$/, loader: 'json'}
				]
			},
			plugins:appPlugin
		}
	}

};