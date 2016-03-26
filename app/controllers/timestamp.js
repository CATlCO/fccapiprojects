'use strict';

function timestamp(req, res) {
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var raw = req.params.date;
	var date;
  if (isNaN(raw)){
  	date =  new Date(raw);
  } else {
  	date = new Date(parseInt(raw)*1000);
  }
  if (date > 0){
  	var unix = date.getTime()/1000;
	  var natural = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
	  res.json({ 'unix': unix, 'natural': natural });
  } else {
  	res.json({ 'unix': null, 'natural': null });
  }
}

module.exports = timestamp;