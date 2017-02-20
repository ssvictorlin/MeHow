
/*
 * GET home page.
 */

var memories = require('../memories.json');
var emojis = require('../emojis.json');

function addWeekday(date) {
	console.log(date);
	var day = new Date(date.year, date.month - 1, date.day);
	console.log(day.getDay());
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

exports.view = function(req, res){
	for (var i = 0; i < memories.memories.length; i++) {
		// deal with date/time string
		memories.memories[i].date = addWeekday(memories.memories[i].date);
		memories.memories[i].date = monthToString(memories.memories[i].date);
		memories.memories[i].time = timeToString(memories.memories[i].time);
	}

	memories.memories[0].date.visible = 1;
	for (var i = 1; i < memories.memories.length; i++) {
		// hide same date event
		if ((memories.memories[i].date.day == memories.memories[i - 1].date.day) &&
			(memories.memories[i].date.month == memories.memories[i - 1].date.month) &&
			(memories.memories[i].date.year == memories.memories[i - 1].date.year)) {
			memories.memories[i].date.visible = 0;
		}
		else
			memories.memories[i].date.visible = 1;
	}

	for (var i = 0; i < memories.memories.length; i++) {
		// find emoji of that day
		for (var j = 0; j < emojis.emojis.length; j++) {
			if (memories.memories[i].emoji == emojis.emojis[j].id) {
				memories.memories[i].emojiImageURL = emojis.emojis[j].imageURL;
				console.log(memories.memories[i].emojiImageURL);
				break;
			}
		}
	}

	res.render('index', memories);
};