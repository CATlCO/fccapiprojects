'use strict';

function headerparser(req, res) {
	var ip = req.headers['x-forwarded-for'];
  var lang = req.headers['accept-language'].substr(0, 5);
  var soft = req.headers['user-agent'].replace( /(^.*\(|\).*$)/g, '' );
  res.json({'ip': ip, 'lang': lang, 'software': soft});
}

module.exports = headerparser;