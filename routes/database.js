var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var tools = require('./tools');

var dbPath = "./data.db";
var dataPath = "./public/data/";

exports.insertMemory = function(req, res){
	var data = req.body, imageURL = "", audioURL = "";
	data.date = tools.dateToString(data.date);
	data.time = tools.timeToString(data.time);

	if (data.imageData) {
		imageURL = dataPath + data.date.year + "-" + data.date.month + "-" + data.date.day + "-" + data.time.hour + "-" + data.time.minute + ".jpg";
		var base64Data = data.imageData.replace(/^data:image\/png;base64,/, "");
		fs.writeFile(imageURL, base64Data, 'base64', function(err) {
			console.log(err);
		});
		imageURL = imageURL.substring(8);
	}

	if (data.audioData) {
		audioURL = dataPath + data.date.year + "-" + data.date.month + "-" + data.date.day + "-" + data.time.hour + "-" + data.time.minute + ".webm";
		var base64Data = String(data.audioData.toString().match(/,(.*)$/)[1]);
		var decodeData = new Buffer(base64Data.toString(), 'base64');
		fs.writeFile(audioURL, decodeData, function (err){
			if (err) return console.log(err);
		});
		audioURL = audioURL.substring(8);
	}

	console.log(data.time);
	console.log(data.date);
	console.log(data.memo);
	console.log(data.emoji);
	console.log(imageURL);
	console.log(audioURL);
	
	var db = new sqlite3.Database(dbPath, function(err){
		if(err) console.log("open DB error");
	});

	var stmt = db.prepare("INSERT INTO memories(hour, minute, day, month, year, emoji, imageURL, audioURL, memo) VALUES(?,?,?,?,?,?,?,?,?)");
	stmt.run(data.time.hour, data.time.minute, data.date.day, data.date.month, data.date.year, data.emoji, imageURL, audioURL, data.memo);
	stmt.finalize();
	db.close();

	res.redirect("/index");
};

exports.deleteMemory = function(req, res){
	console.log(req.body.id);

	var db = new sqlite3.Database(dbPath, function(err){
		if(err) console.log("open DB error");
	});
	// check if image or audio exist, then delete them
	db.each("SELECT * FROM memories WHERE id=(?)", req.body.id, function(err, row) {
        if(err) console.log(err);
		if(row.imageURL)
			fs.unlinkSync("./public" + row.imageURL);
		if(row.audioURL)
			fs.unlinkSync("./public" + row.audioURL);
	});

	db.run("DELETE FROM memories WHERE id=(?)", req.body.id, function(err) {
        if(err) console.log(err);
    });
	db.close();

	res.redirect("/index");
};