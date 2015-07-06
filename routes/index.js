var express = require('express');
var crypto = require('crypto');
var router = express.Router();

router.get('/', function(req, res){
		
	res.render('index');
});

router.post('/login', function(req, res){

	var db = req.db;
	var body = req.body;

	password_hash = crypto
						.createHmac('sha1', "secret-key")
							.update(body.password).digest('hex');

	db.people.findOne({"email": body.email, 
						"password": password_hash}, function(err, user){

							if (err)
								res.json(500, err);
							else
  								if(user){

  									req.session.user = {

										"email": user.email,
										"name": user.name
									};

									res.json(201, {"login":"successful"});
  								}
								else{

									res.json(201, {"login":"failed"});
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