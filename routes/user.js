var express = require('express');
var router = express.Router();

var auth = require("../controllers/auth");

router.post('/auth', function(req, res){

	var body = req.body;
	var password = body.password;
	var email = body.email;

	auth.login(email, password, function(err, user){

		if (err){

			res.json(500, err);
		}
		else{

			if(err == null && user == null){

				res.json(201, {

					success:false,
					message:"Invalid email or/and password!"
				})
			}
			else if(user){

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
	})
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