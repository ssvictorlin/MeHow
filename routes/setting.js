
/*
 * GET setting page.
 */
var fs = require('fs');
exports.viewSetting = function(req, res){
	//console.log(req.params);
	var name;
	fs.readFile('loginName.txt', 'utf8', function(err, data) {
	  if (err) throw err;
	  //console.log(data)
	  name = data;
	  console.log("A "+ name);
		  res.render('setting', {
	  		"loginName" : name
	  	});
	});
	/*console.log("B "+ name);
  	res.render('setting', {
  		"loginName" : name
  	});*/
};