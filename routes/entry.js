
/*
 * GET entry page.
 */

var memories = require('../memories.json');
var index = require('./index');

function month2Digit(date) {
	if (date.month / 10 < 1)
		date.month = ("0" + date.month).slice(-2);
	if (date.day / 10 < 1)
		date.day = ("0" + date.day).slice(-2);
	return date;
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
	context.memory.date = index.addWeekday(context.memory.date);
	context.memory.date = index.monthToString(context.memory.date);
	context.memory.date = month2Digit(context.memory.date);
	context.memory.time = index.timeToString(context.memory.time);
	for (var i = 0; i < context.emojis.length; i++) {
		if (context.memory.emoji == context.emojis[i].id) {
			context.memory.emojiImageURL = context.emojis[i].imageURL;
			break;
		}
	}

  	res.render('entry', context);
};

