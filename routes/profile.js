var express = require('express');
var router = express.Router();

router.post('/view', function(req, res){

	var db = req.db;
	var session = req.session;

	db.people.findOne({email:session.user.email}, function(err, user){

		var names = user.name.split(",");
		user.surname = names[0];
		user.othernames = names[1].trim();

		delete user.password

		if(err)
			res.json({"view":"failed"});
		else
			res.json({"view":"successful", "user":user});
	});
});

router.post("/update", function(req, res){

	var db = req.db;
	var body = req.body;
	var session = req.session;

	db.people.update({'id': session.user.id}, {$set:body}, {}, function(err, docs){

		if(err)
			res.json({"update":"failed"});
		else
			res.json({"update":"successful"});
	});
})

module.exports = router;