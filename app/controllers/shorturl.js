'use strict';

require('dotenv').config({
  silent: true
});

var appurl = process.env.APP_URL + 'url-shortener/';
var valid = require('valid-url');

function shorturl(db) {
	
	var urls = db.collection('urls');

	this.getUrl = function(req, res){
		var id = req.params.id;
		urls.findOne({short_url: appurl + id}, function(err, result){
			if (err) { throw err; } 
			if (result) {
				res.redirect(result.original_url);
			} 
		})
	}

	this.saveUrl = function(req, res){
		var urlsProjection = { '_id': false };
		var original = req.params.url + req.params[0];
		urls.findOne({ original_url: original }, urlsProjection, function(err, result){
			if (err) { throw err; }
			if (result) {
				res.json(result);
			} else if (valid.isUri(original)) {
				urls.count({}, function(err, count){
					if (err) { throw err; }
					urls.insert({ 'original_url': original, 'short_url': appurl + count }, function(err){
						if (err) { throw err; }
						urls.findOne({ original_url: original }, urlsProjection, function(err, doc){
							if (err) { throw err; }
								res.json(doc);
							})
						});
					});
				
			} else {
				res.json({'error': 'invalid URL'});
			}
		})
	}
}

module.exports = shorturl;