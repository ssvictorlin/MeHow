
/*
 * GET setting page.
 */

exports.viewSetting = function(req, res){
	console.log(req.params);
  	res.render('setting');
};