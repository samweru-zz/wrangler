var express = require('express');
var router = express.Router();

var person = require("../controllers/person");

router.post("/update", function(req, res){

	var body = req.body;
	var session = req.session;

	var userId = session.user.id

	person.update(userId, body, function(err, docs){

		if(err)
			res.json(500, err);
		
		if(docs)
			res.json(201, {

				"success":true,
				"message":"Profile successfully updated"
			});
		else
			res.json(201, {

				"success":false,
				"message":"Failed to update profile"
			});
	})
})

router.post('/change/password', function(req, res){

	var body = req.body;
	var session = req.session;

	var userId = session.user.id
	var newPassword = body.newpassword
	var oldPassword = body.oldpasword
	var confirmPassword = body.confrimpassword

	if(newPassword!=confirmPassword){

		res.json(201, {

			"success":false,
			"message":"New and confirm passwords did not match"
		});
	}
	else{

		person.changePassword(userId, oldPassword, newPassword, function(err, docs){

			if(err)
				res.json(500, err)

			if(docs)
				res.json(201, {

					"success":true,
					"message":"Password successfully changed."
				});
			else
				res.json(201, {

					"success":false,
					"message":"Failed to change password!"
				});
		})
	}
});

router.post("/:id/friends", function(req, res, next){

	var id  = parseInt(req.params.id);

	person.find(id, function(err, user){

		if(err)
			res.json(500, err)

		var names = []

		user.friends.forEach(function(friend){

			names.push(friend.name)
		})

		person.findNames(names, function(err, friends){

			if(err)
				res.json(500, err)
			else
				res.json(201, friends)
		})
	})
})

router.post("/find/:id", function(req, res){

	var id = parseInt(req.params.id);

	person.find(id, function(err, user){

		if(err)
			res.json(500, err)
		else
			res.json(201, user)
	})
})

router.post('/new', function(req, res){

	var body = req.body;
	
	person.new(body, function(err, feedback){

		if(err)
			res.json(500, err)
		else
			res.json(201, feedback)
	})
});

module.exports = router;