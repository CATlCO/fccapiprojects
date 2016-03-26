'use strict';

var multer  = require('multer');
var upload = multer({ dest: 'uploads/' }); 

function metadata(app) {
	app.post('/metadata', upload.single('file'), function(req, res) {
    res.json({ 'size': req.file.size });
  });
}

module.exports = metadata;