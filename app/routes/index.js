'use strict';

var url = require('url');
var timestamp = require(process.cwd() + '/app/controllers/timestamp.js');
var headerparser = require(process.cwd() + '/app/controllers/header-parser.js');
var Shorturl = require(process.cwd() + '/app/controllers/shorturl.js');
var Imagesearch = require(process.cwd() + '/app/controllers/imagesearch.js');

module.exports = function(app, db) {

	var shorturl = new Shorturl(db);
  var imagesearch = new Imagesearch(db);

  app.route('/').get(function (req, res) {
    res.sendFile(process.cwd() + '/public/index.html');
  });
  app.route('/timestamp-microservice').get(function (req, res) {
    res.sendFile(process.cwd() + '/public/timestamp.html');
  });
  app.route('/url-shortener').get(function (req, res) {
  	res.sendFile(process.cwd() + '/public/urlshort.html');
  });
  app.route('/header-parser').get(function (req, res) {
  	res.sendFile(process.cwd() + '/public/header-parser.html');
  });
  app.route('/image-search').get(function (req, res) {
    res.sendFile(process.cwd() + '/public/imagesearch.html');
  });
  app.route('/metadata').get(function (req, res) {
    res.sendFile(process.cwd() + '/public/metadata.html');
  });
  app.route('/timestamp-microservice/:date').get(timestamp);
	app.route('/request-header-parser').get(headerparser);
	app.route('/url-shortener/:id').get(shorturl.getUrl);
	app.route('/url-shortener/new/:url*').get(shorturl.saveUrl);
  app.route('/image-search/recent').get(imagesearch.recent);
	app.route('/image-search/:term').get(imagesearch.search);  
}
