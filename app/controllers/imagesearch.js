'use strict';

// require('dotenv').load();

var google = require('googleapis');
var search = google.customsearch('v1');

function imagesearch(db){	

	var searchterms = db.collection('searchterms');

	this.search = function(req, res) {
		searchterms.insert({ 'search_term': req.params.term, 'date': new Date().toUTCString() }, function(err){
			if (err) { throw err; }
		});
		var offset = parseInt(req.query.offset, 10) || 1;
		search.cse.list({ q: req.params.term, searchType: 'image', start: offset, cx: process.env.CSE_ID, key: process.env.API_KEY }, function(err, result){
			if (err) throw err;
			var data = [], img;
			for (var i=0; i < result.items.length; i++) {
				img = result.items[i];
				data.push({'image_url': img.link, 'snippet': img.snippet, 'page_url': img.image.contextLink });
			}
			res.json(data);
		});
	}

	this.recent = function(req, res){
		searchterms.find({}, { _id: false }).sort({ _id: -1 }).limit(10).toArray(function(err, result){
			res.json(result);
		});
	}
	
}

module.exports = imagesearch;





