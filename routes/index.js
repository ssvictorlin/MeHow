
/*
 * GET home page.
 */

var memories = require('../memories.json');
var emojis = require('../emojis.json');
var tools = require('./tools');

exports.view = function(req, res){
	for (var i = 0; i < memories.memories.length; i++) {
		// deal with date/time string
		memories.memories[i].date = tools.addWeekday(memories.memories[i].date);
		memories.memories[i].date = tools.monthToString(memories.memories[i].date);
		memories.memories[i].time = tools.timeToString(memories.memories[i].time);
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