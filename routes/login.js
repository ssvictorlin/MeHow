
/*
 * GET home page.
 */

var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var data = require('../memories.json');

var dbPath = "./data.db";

exports.viewLogin = function(req, res){
	// check if db exists, if not, create one with JSON
	var db = new sqlite3.Database(dbPath, function(err){
		if(err) console.log("open DB error");
	});

	if(!fs.existsSync(dbPath)) {
		console.log("create new DB!");
		db.serialize(function() {
			db.run("CREATE TABLE memories (id INTEGER PRIMARY KEY AUTOINCREMENT, hour INT, minute INT, day INT, month INT, year INT, emoji TEXT, imageURL TEXT, audioURL TEXT, memo TEXT)");
			
			var stmt = db.prepare("INSERT INTO memories VALUES(?,?,?,?,?,?,?,?,?,?)");
			for(var i = 0; i < data.memories.length; i++) {
				stmt.run(data.memories[i].id, data.memories[i].time.hour, data.memories[i].time.minute, data.memories[i].date.day, data.memories[i].date.month, data.memories[i].date.year, data.memories[i].emoji, data.memories[i].imageURL, data.memories[i].audioURL, data.memories[i].memo); 
			}
			stmt.finalize();

			db.each("SELECT * FROM memories", function(err, row) {
			  console.log("read" + row.id + " " + row.hour + " " + row.minute + " " + row.day + " " + row.month + " " + row.year + " " + row.emoji + " " + row.imageURL + " " + row.audioURL + " " + row.memo);
			});

		});
		db.close();
	}
	else {
		console.log("DB exists!");
		// db.serialize(function() {
		// 	db.each("SELECT * FROM memories", function(err, row) {
		// 	  console.log("read" + row.id + " " + row.hour + " " + row.minute + " " + row.day + " " + row.month + " " + row.year + " " + row.emoji + " " + row.imageURL + " " + row.audioURL + " " + row.memo);
		// 	});
		// });
	}

	res.render('login');
};

