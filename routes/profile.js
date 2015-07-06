var express = require('express');
var crypto = require('crypto');
var router = express.Router();

router.get('/', function(req, res){

	var db = req.db;
	var session = req.session;

	db.people.findOne({email:session.user.email}, function(err, user){

		var names = user.name.split(",");
		user.surname = names[0];
		user.othernames = names[1].trim();

		if(err)
			res.send("Failed to load profile");
		else
			res.render('profile', {"user":user});
	});
});

router.post("/update", function(req, res){

	var body = req.body;
	console.log(req.session);
	console.log(body);
	res.json({});
})

module.exports = router;