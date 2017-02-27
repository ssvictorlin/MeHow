
/*
 * GET home page.
 */

// var memories = require('../memories.json');
var emojis = require('../emojis.json');
var tools = require('./tools');
var sqlite3 = require('sqlite3').verbose();

var dbPath = "./data.db";
var noImageURL = "/images/no-image.jpg";
var dataPath = "/data/";

exports.view = function(req, res){
	var memories = [];
	var db = new sqlite3.Database(dbPath, function(err){
		if(err) console.log("open DB error");
	});

	db.serialize(function() {
		db.each("SELECT * FROM memories", function(err, row) {
			if(err) console.log("read DB error");
			var temp = tools.copyDBMemory(row);
	        // var temp = {"id": row.id, "time": {"hour": row.hour, "minute": row.minute}, "date": {"day": row.day, "month": row.month, "year": row.year}, "emoji": row.emoji, "imageURL": row.imageURL, "audioURL": row.audioURL, "memo": row.memo};
			
			for (var j = 0; j < emojis.emojis.length; j++) {
				if (temp.emoji == emojis.emojis[j].id) {
					temp.emojiImageURL = emojis.emojis[j].imageURL;
					// console.log(temp.emojiImageURL);
					break;
				}
			}

			if (temp.imageExist)
				temp.imageURL = dataPath + temp.filename + ".jpg";
			else
				temp.imageURL = noImageURL;

			if (temp.audioExist)
				temp.audioURL = dataPath + temp.filename + ".webm";

			memories.push(temp);
			
		}, function(){
			memories.sort(function(a, b){
				if(a.date.year != b.date.year)
					return (b.date.year - a.date.year);
				else if(a.date.month != b.date.month)
					return (b.date.month - a.date.month);
				else if(a.date.day != b.date.day)
					return (b.date.day - a.date.day);
				else if(a.time.hour != b.time.hour)
					return (b.time.hour - a.time.hour);
				else if(a.time.minute != b.time.minute)
					return (b.time.minute - a.time.minute);
			});

			for (var i = 0; i < memories.length; i++) {
				memories[i].date = tools.addWeekday(memories[i].date);
				memories[i].date = tools.monthToString(memories[i].date);
				memories[i].time = tools.timeToString(memories[i].time);
			}

			memories[0].date.visible = 1;
			for (var i = 1; i < memories.length; i++) {
				if ((memories[i].date.day == memories[i - 1].date.day) &&
					(memories[i].date.month == memories[i - 1].date.month) &&
					(memories[i].date.year == memories[i - 1].date.year)) {
					memories[i].date.visible = 0;
				}
				else
					memories[i].date.visible = 1;
			}

			memories["memories"] = memories;
			memories["playButton"] = false;
			res.render('index', memories);
        });
	});
	db.close();
};

exports.viewPlayButton = function(req, res){
	var memories = [];
	var db = new sqlite3.Database(dbPath, function(err){
		if(err) console.log("open DB error");
	});
	db.serialize(function() {
		db.each("SELECT * FROM memories", function(err, row) {
			if(err) console.log("read DB error");
			var temp = tools.copyDBMemory(row);
	        // var temp = {"id": row.id, "time": {"hour": row.hour, "minute": row.minute}, "date": {"day": row.day, "month": row.month, "year": row.year}, "emoji": row.emoji, "imageURL": row.imageURL, "audioURL": row.audioURL, "memo": row.memo};
			
			for (var j = 0; j < emojis.emojis.length; j++) {
				if (temp.emoji == emojis.emojis[j].id) {
					temp.emojiImageURL = emojis.emojis[j].imageURL;
					// console.log(temp.emojiImageURL);
					break;
				}
			}

			if (temp.imageExist)
				temp.imageURL = dataPath + temp.filename + ".jpg";
			else
				temp.imageURL = noImageURL;

			if (temp.audioExist)
				temp.audioURL = dataPath + temp.filename + ".webm";

			memories.push(temp);
			
		}, function(){
			memories.sort(function(a, b){
				if(a.date.year != b.date.year)
					return (b.date.year - a.date.year);
				else if(a.date.month != b.date.month)
					return (b.date.month - a.date.month);
				else if(a.date.day != b.date.day)
					return (b.date.day - a.date.day);
				else if(a.time.hour != b.time.hour)
					return (b.time.hour - a.time.hour);
				else if(a.time.minute != b.time.minute)
					return (b.time.minute - a.time.minute);
			});

			for (var i = 0; i < memories.length; i++) {
				memories[i].date = tools.addWeekday(memories[i].date);
				memories[i].date = tools.monthToString(memories[i].date);
				memories[i].time = tools.timeToString(memories[i].time);
			}

			memories[0].date.visible = 1;
			for (var i = 1; i < memories.length; i++) {
				if ((memories[i].date.day == memories[i - 1].date.day) &&
					(memories[i].date.month == memories[i - 1].date.month) &&
					(memories[i].date.year == memories[i - 1].date.year)) {
					memories[i].date.visible = 0;
				}
				else
					memories[i].date.visible = 1;
			}

			memories["memories"] = memories;
			memories["playButton"] = true;
			res.render('index', memories);
        });
	});
	db.close();
};