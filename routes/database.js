var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var tools = require('./tools');
var randomstring = require('randomstring');

var dbPath = "./data.db";
var dataPath = "./public/data/";

exports.insertMemory = function(req, res){
	var data = req.body, imageExist = 0, audioExist = 0, filename = randomstring.generate();
	data.date = tools.dateToString(data.date);
	data.time = tools.timeToString(data.time);

	if (data.imageData) {
		// imageURL = dataPath + data.date.year + "-" + data.date.month + "-" + data.date.day + "-" + data.time.hour + "-" + data.time.minute + ".jpg";
		var imageURL = dataPath + filename + ".jpg";

		var matches = data.imageData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/), response = {};
		response.type = matches[1];
		response.data = new Buffer(matches[2], 'base64');

		fs.writeFile(imageURL, response.data, 'base64', function(err) {
			console.log(err);
		});
		imageExist = 1;
	}

	if (data.audioData) {
		// audioURL = dataPath + data.date.year + "-" + data.date.month + "-" + data.date.day + "-" + data.time.hour + "-" + data.time.minute + ".webm";
		var audioURL = dataPath + filename + ".webm";
		var base64Data = String(data.audioData.toString().match(/,(.*)$/)[1]);
		var decodeData = new Buffer(base64Data.toString(), 'base64');
		fs.writeFile(audioURL, decodeData, function (err){
			if (err) return console.log(err);
		});
		audioExist = 1;
	}

	console.log(data.time);
	console.log(data.date);
	console.log(data.memo);
	console.log(data.emoji);
	console.log(filename);
	console.log(imageExist);
	console.log(audioExist);
	
	var db = new sqlite3.Database(dbPath, function(err){
		if(err) console.log("open DB error");
	});

	var stmt = db.prepare("INSERT INTO memories(hour, minute, day, month, year, emoji, filename, imageExist, audioExist, memo) VALUES(?,?,?,?,?,?,?,?,?,?)");
	stmt.run(data.time.hour, data.time.minute, data.date.day, data.date.month, data.date.year, data.emoji, filename, imageExist, audioExist, data.memo);
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
		if(row.imageExist)
			fs.unlinkSync(dataPath + row.filename + ".jpg");
		if(row.audioExist)
			fs.unlinkSync(dataPath + row.filename + ".webm");
	});

	db.run("DELETE FROM memories WHERE id=(?)", req.body.id, function(err) {
        if(err) console.log(err);
    });
	db.close();

	res.redirect("/index");
};

exports.updateMemory = function(req, res){
	var data = req.body, filename;
	console.log("update!!");
	console.log(req.body.id);
	console.log(req.body.time);
	console.log(req.body.date);
	console.log(req.body.memo);
	console.log(req.body.emoji);
	if (req.body.imageData && data.imageData.substring(0, 5) == "/data")
		console.log(data.imageData);
	else if (req.body.imageData)
		console.log("image update!!");
	if (req.body.audioData && data.audioData.substring(0, 5) == "/data")
		console.log(data.audioData);
	else if (req.body.audioData)
		console.log("audio update!!");

	var db = new sqlite3.Database(dbPath, function(err){
		if(err) console.log("open DB error");
	});

	db.run("UPDATE memories SET memo = ? WHERE id = ?", data.memo, data.id);
	db.run("UPDATE memories SET year = ? WHERE id = ?", data.date.year, data.id);
	db.run("UPDATE memories SET month = ? WHERE id = ?", data.date.month, data.id);
	db.run("UPDATE memories SET day = ? WHERE id = ?", data.date.day, data.id);
	db.run("UPDATE memories SET hour = ? WHERE id = ?", data.time.hour, data.id);
	db.run("UPDATE memories SET minute = ? WHERE id = ?", data.time.minute, data.id);
	db.run("UPDATE memories SET emoji = ? WHERE id = ?", data.emoji, data.id);

	db.each("SELECT * FROM memories WHERE id = ?", data.id, function(err, row) {
		if (!data.imageData && row.imageExist && fs.existsSync(dataPath + row.filename + ".jpg")) {
			console.log("delete exist image");
			fs.unlinkSync(dataPath + row.filename + ".jpg");
		}
		else if (data.imageData && data.imageData.substring(0, 5) != "/data") {
			console.log("update exist image");
			var imageURL = dataPath + row.filename + ".jpg";

			var matches = data.imageData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/), response = {};
			response.type = matches[1];
			response.data = new Buffer(matches[2], 'base64');

			fs.writeFile(imageURL, response.data, 'base64', function(err) {
				console.log(err);
			});
		}
		if (!data.audioData && row.audioExist && fs.existsSync(dataPath + row.filename + ".webm")) {
			console.log("delete exist audio");
			fs.unlinkSync(dataPath + row.filename + ".webm");
		}
		else if (data.audioData && data.audioData.substring(0, 5) != "/data"){
			console.log("update exist audio");
			var audioURL = dataPath + row.filename + ".webm";
			var base64Data = String(data.audioData.toString().match(/,(.*)$/)[1]);
			var decodeData = new Buffer(base64Data.toString(), 'base64');
			fs.writeFile(audioURL, decodeData, function (err){
				if (err) return console.log(err);
			});
		}

		
	});
  	if (data.imageData)
		db.run("UPDATE memories SET imageExist = ? WHERE id = ?", 1, data.id);
	else
		db.run("UPDATE memories SET imageExist = ? WHERE id = ?", 0, data.id);
	if (data.audioData)
		db.run("UPDATE memories SET audioExist = ? WHERE id = ?", 1, data.id);
	else
		db.run("UPDATE memories SET audioExist = ? WHERE id = ?", 0, data.id);

	db.close();

	res.redirect("/index");
};