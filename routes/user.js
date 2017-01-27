var express = require('express');
var sha1 = require("crypto-js/sha1");
var validator = require('validator');
var router = express.Router();

router.post('/auth', function(req, res){

	var db = req.db;
	var body = req.body;

	var password = body.password;
	var email = body.email;

	if(!validator.isEmpty(password) &&
		validator.isEmail(email)){

		db.people.findOne({

				email    : email, 
				password : sha1(body.password).toString()

			}, function(err, user){

				if (err){

					res.json(500, err);
				}
				else{

					if(user){

						req.session.user = {

							"email": user.email,
							"name": user.name,
							"id": user.id
						};

						res.json(201, {

							success:true,
							message:"Login successful."
						});
					}
					else{

						res.json(201, {

							success:false,
							message: "Failed to login!"
						});
					}
				}
		});
	}
	else{

		res.json(201, {

			success:false,
			message:"Invalid email or/and password!"
		})
	}
});

router.get('/logout', function(req, res){

	req.session.destroy(function(err) {

	  	if(err){

	  		res.json(500, err);
	  	}
	  	// else
	  		// res.redirect("/#login");
	})
});

module.exports = router;