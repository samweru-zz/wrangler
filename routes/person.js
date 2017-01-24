var express = require('express');
var uuid = require('node-uuid');
var sha1 = require("crypto-js/sha1");
var validator = require('validator');
var router = express.Router();

router.post('/new', function(req, res){

	var db = req.db;
	var body = req.body;

	console.log(body);

	db.people.find({}).limit(1).sort({_id:-1}).toArray(function (err, docs){

		var password = body.password || "";
		var surname = body.surname || "";
		var othernames = body.othernames || "";
		var dob = body.dob || "";

		if(!validator.isEmpty(password) &&
			!validator.isEmpty(surname) &&
			!validator.isEmpty(othernames)){

			var data = {

				id 			: docs[0].id + 1,
				guid 		: uuid(),
				password 	: sha1(password).toString(),
				picture 	: "http://placehold.it/32x32",
				tags 		: [],
				friends 	: [],
				registered 	: new Date().toISOString(),
				name 		: surname + ", " + othernames,
				age 		: new Date().getFullYear() - new Date(dob).getFullYear()
			};

			db.people.insert(data, function(err, user){

				if (err) 
					res.json(500, err);
				else 
					res.json(201, {

						id:user.id, 
						success:true
					});
			});
		}
		else{

			res.json(200, {

				success:false,
				message:"Required password|surname|othernames"
			})
		}
	});
});

module.exports = router;