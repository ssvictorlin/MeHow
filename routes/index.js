
/*
 * GET home page.
 */

// var memories = require('../memories.json');
var emojis = require('../emojis.json');
var tools = require('./tools');
var sqlite3 = require('sqlite3').verbose();

var dbPath = "./data.db";
var noImageURL = "/images/no-image.jpg";

exports.view = function(req, res){
	var memories = [], previous_date = {"day": "", "month": "", "year": ""};
	var db = new sqlite3.Database(dbPath, function(err){
		if(err) console.log("open DB error");
	});

	db.serialize(function() {
		db.each("SELECT * FROM memories", function(err, row) {
			if(err) console.log("read DB error");
			var temp = tools.copyDBMemory(row);
	        // var temp = {"id": row.id, "time": {"hour": row.hour, "minute": row.minute}, "date": {"day": row.day, "month": row.month, "year": row.year}, "emoji": row.emoji, "imageURL": row.imageURL, "audioURL": row.audioURL, "memo": row.memo};
			temp.date = tools.addWeekday(temp.date);
			temp.date = tools.monthToString(temp.date);
			temp.time = tools.timeToString(temp.time);

			if ((temp.date.day == previous_date.day) &&
				(temp.date.month == previous_date.month) &&
				(temp.date.year == previous_date.year)) {
				temp.date.visible = 0;
			}
			else
				temp.date.visible = 1;
			previous_date = temp.date;

			console.log(temp.emoji);

			for (var j = 0; j < emojis.emojis.length; j++) {
				if (temp.emoji == emojis.emojis[j].id) {
					temp.emojiImageURL = emojis.emojis[j].imageURL;
					console.log(temp.emojiImageURL);
					break;
				}
			}

			if (temp.imageURL == "")
				temp.imageURL = noImageURL;

			memories.push(temp);
			
		}, function(){
			memories["memories"] = memories;
			res.render('index', memories);
        });
	});
	db.close();
};