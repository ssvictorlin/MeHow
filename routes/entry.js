
/*
 * GET entry page.
 */

var memories = require('../memories.json');

function addWeekday(date) {
	var day = new Date(date.year, date.month - 1, date.day);
	switch(day.getDay()) {
		case 1:
			date.weekday = "Mon.";
			break;
		case 2:
			date.weekday = "Tue.";
			break;
		case 3:
			date.weekday = "Wed.";
			break;
		case 4:
			date.weekday = "Thu.";
			break;
		case 5:
			date.weekday = "Fri.";
			break;
		case 6:
			date.weekday = "Sat.";
			break;
		case 0:
			date.weekday = "Sun.";
			break;
	}
	return date;
}

function monthToString(date) {
	switch(date.month) {
		case 1:
			date.month = "Jan";
			break;
		case 2:
			date.month = "Feb";
			break;
		case 3:
			date.month = "Mar";
			break;
		case 4:
			date.month = "Apr";
			break;
		case 5:
			date.month = "May";
			break;
		case 6:
			date.month = "Jun";
			break;
		case 7:
			date.month = "Jul";
			break;
		case 8:
			date.month = "Aug";
			break;
		case 9:
			date.month = "Sep";
			break;
		case 10:
			date.month = "Oct";
			break;
		case 11:
			date.month = "Nov";
			break;
		case 12:
			date.month = "Dec";
			break;
	}
	return date;
}

function timeToString(time) {
	if (time.hour / 10 < 1)
		time.hour = ("0" + time.hour).slice(-2);
	if (time.minute / 10 < 1)
		time.minute = ("0" + time.minute).slice(-2);
	return time;
}

exports.viewEntry = function(req, res){
	var context = { "memory": "", "emojis": require('../emojis.json')};

	for (var i = 0; i < memories.memories.length; i++) {
		if (memories.memories[i].id == req.params.id) {
			context.memory = memories.memories[i];
			break;
		}
	}
	// deal with date/time string
	context.memory.date = addWeekday(context.memory.date);
	context.memory.date = monthToString(context.memory.date);
	context.memory.time = timeToString(context.memory.time);
	for (var i = 0; i < context.emojis.length; i++) {
		if (context.memory.emoji == context.emojis[i].id) {
			context.memory.emojiImageURL = context.emojis[i].imageURL;
			break;
		}
	}

  	res.render('entry', context);
};

