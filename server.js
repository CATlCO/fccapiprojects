'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js'),
    metadata = require('./app/controllers/metadata.js'),
    mongo = require('mongodb').MongoClient,
    app = express();

require('dotenv').load();

mongo.connect(process.env.MONGO_URI, function (err, db) {

  if (err) {
    throw new Error('Database failed to connect!');
  } else {
    console.log('MongoDB successfully connected on port 27017.');
  }

  app.use('/public', express.static(process.cwd() + '/public'));
  app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

  routes(app, db);
  metadata(app);

  var port = process.env.PORT || 8080;
  app.listen(port, function () {
    console.log('Listening on port 8080...');
  });
});