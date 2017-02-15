
/*
 * GET add page.
 */

var data = require('../emojis.json');

exports.viewAdd = function(req, res){
	console.log(req.params);

	console.log("TEST");
  	res.render('add',data);
};



