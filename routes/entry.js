
/*
 * GET entry page.
 */
var data = require('../emojis.json');

exports.viewEntry = function(req, res){
  	res.render('entry',data);
};

