'use strict';

const express = require('express'); // charge ExpressJS
const serveIndex = require('serve-index');

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const ws = require('./webservices.js');

var app = express();

webpackConfig.output.path = '/';
const compiler = webpack(webpackConfig);
app.use('/app/wpk/', webpackDevMiddleware(compiler, {}));

app.use('/ws', ws);

app.use(express.static('.'));
app.use(serveIndex('.', {
	icons: true
}));

app.use(['/app/produits', '/app/services', '/app/contact'], function(req, res, next) {
	console.log('URL rewriting', req.url);
	res.sendFile('./app/index.html', {
		root: __dirname
	});
});

app.use(function(req, res, next) {
	console.log('404: Page not Found', req.url);
	next();
});

app.listen(8000, function() {
	console.log('server started on port 8000');
});
