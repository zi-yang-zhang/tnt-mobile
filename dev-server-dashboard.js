/**
 * Created by robertzzy on 31/07/16.
 */
"use strict";
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./config/webpack-config-dev');
var express = require('express');
var proxy = require('proxy-middleware');
var url = require('url');

var app = express();
app.use('/*', proxy(url.parse('http://localhost:3002/assets')));


var server = new WebpackDevServer(webpack(config), {
	contentBase: __dirname,
	hot: true,
	quiet: false,
	noInfo: false,
	publicPath: "/assets/",

	stats: { colors: true }
});

server.listen(3002, "localhost", function() {});
app.listen(3001);