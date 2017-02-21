
/*
 * GET entry page.
 */

var memories = require('../memories.json');
var tools = require('./tools');

exports.viewEntry = function(req, res){
	var emojis = require('../emojis.json');
	var context = { "memory": "", "emojis": emojis};

	for (var i = 0; i < memories.memories.length; i++) {
		if (memories.memories[i].id == req.params.id) {
			context.memory = memories.memories[i];
			break;
		}
	}
	// deal with date/time string
	context.memory.date = tools.addWeekday(context.memory.date);
	context.memory.date = tools.monthToString(context.memory.date);
	context.memory.date = tools.month2Digit(context.memory.date);
	context.memory.time = tools.timeToString(context.memory.time);

	for (var i = 0; i < emojis.emojis.length; i++) {
		if (context.memory.emoji == emojis.emojis[i].id) {
			context.memory.emojiImageURL = emojis.emojis[i].imageURL;
			break;
		}
	}

  	res.render('entry', context);
};

