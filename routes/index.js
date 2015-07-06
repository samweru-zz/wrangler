var express = require('express');
var crypto = require('crypto');
var sha1 = require("../scripts/sha1");
var router = express.Router();

router.get('/', function(req, res){
		
	res.render('index');
});

router.post('/login', function(req, res){

	var db = req.db;
	var body = req.body;

	db.people.findOne({"email": body.email, 
						"password": sha1.password(body.password)}, function(err, user){

							if (err)
								res.json(500, err);
							else
  								if(user){

  									req.session.user = {

										"email": user.email,
										"name": user.name,
										"id": user.id
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