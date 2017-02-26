
/*
 * GET entry page.
 */
// var memories = require('../memories.json');
var sqlite3 = require('sqlite3').verbose();
var tools = require('./tools');

var dbPath = "./data.db";
var noImageURL = "/images/no-image.jpg";
var dataPath = "/data/";

exports.viewEntry = function(req, res){
	var emojis = require('../emojis.json');
	var context = { "memory": "", "emojis": emojis};
	
	var db = new sqlite3.Database(dbPath, function(err){
		if(err) console.log("open DB error");
	});
	db.serialize(function() {
		db.each("SELECT * FROM memories", function(err, row) {
			// console.log("read " + row.id + " " + row.hour + " " + row.minute + " " + row.day + " " + row.month + " " + row.year + " " + row.emoji + " " + row.imageURL + " " + row.audioURL + " " + row.memo);
			if (row.id == req.params.id){
				context.memory = tools.copyDBMemory(row);
				// deal with date/time string
				context.memory.date = tools.addWeekday(context.memory.date);
				context.memory.date = tools.monthToString(context.memory.date);
				context.memory.date = tools.dateToString(context.memory.date);
				context.memory.time = tools.timeToString(context.memory.time);
				if (context.memory.imageExist)
					context.memory.imageURL = dataPath + row.filename + ".jpg";
				else
					context.memory.imageURL = noImageURL;

				if (context.memory.audioExist)
					context.memory.audioURL = dataPath + row.filename + ".webm";
				
				for (var i = 0; i < emojis.emojis.length; i++) {
					if (context.memory.emoji == emojis.emojis[i].id) {
						context.memory.emojiImageURL = emojis.emojis[i].imageURL;
						break;
					}
				}
  				res.render('entry', context);
			}
		});
	});
	db.close();
};

