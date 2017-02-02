var express = require('express');
var sha1 = require("crypto-js/sha1");
var validator = require('validator');
var router = express.Router();

var person = require("../controllers/person");

router.post("/friends/friends/:id", function(req, res, next){

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

	var id  = parseInt(req.params.id);

	person.find(id, function(err, user){

		if(err)
			res.json(500, err)
		else
			res.json(201, user)
	})
})

router.post('/new', function(req, res){

	var db = req.db;
	var body = req.body;
	
	person.new(body, function(err, feedback){

		if(err)
			res.json(500, err)
		else
			res.json(201, feedback)
	})
});

module.exports = router;