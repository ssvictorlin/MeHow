
/*
 * GET add page.
 */

var emojis = require('../emojis.json');
var tools = require('./tools');

exports.viewAdd = function(req, res){

	var context = {"date": {"month": "", "day": "", "year": ""}, "time": {"hour": "", "minute": ""}, "emojis": emojis};
	var d = new Date();
	context.date.year = d.getFullYear();
	context.date.month = d.getMonth() + 1;
	context.date.day = d.getDate();
	context.time.hour = d.getHours();
	context.time.minute = d.getMinutes();
	
	context.date = tools.addWeekday(context.date);
	context.date = tools.monthToString(context.date);
	context.date = tools.month2Digit(context.date);
	context.time = tools.timeToString(context.time);
	console.log(context.date);
	console.log(context.time);
  	res.render('add', context);
};



