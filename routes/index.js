var express = require('express');
var crypto = require('crypto');
var router = express.Router();

router.get('/', function(req, res){

	// if(req.session.user)
	// 	res.redirect("/search");
	// else
		
	res.render('index');
});

router.post('/login', function(req, res){

	var db = req.db;
	var body = req.body;

	password_hash = crypto
						.createHmac('sha1', "secret-key")
							.update(body.password).digest('hex');

	db.people.find({"email": body.email, 
						"password": password_hash}, function(err, usr){

							if (err){

								res.json(500, err);
							}
							else{

								req.session.user = {

									email: usr.email,
									name: usr.name,
								};

								res.json(201, usr)
							}	
						});
});

router.get('/logout', function(req, res){

	req.session.destroy(function(err) {
	  
	  	if(err)
	  		res.send("Failed to logout!");
	  	else
	  		res.redirect("/");
	})
});

module.exports = router;