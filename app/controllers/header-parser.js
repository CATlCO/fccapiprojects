'use strict';

function headerparser(req, res) {
	var ip = req.ip;
  var lang = req.headers['accept-language'];
  var soft = req.headers['user-agent'];
  res.json({'ip': ip, 'lang': lang, 'software': soft});
  // res.json(req.headers);
}

module.exports = headerparser;