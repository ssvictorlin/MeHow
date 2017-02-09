
/*
 * GET add page.
 */

exports.viewAdd = function(req, res){
	console.log(req.params);
  	res.render('add');
};

