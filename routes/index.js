var express = require('express');
var crypto = require('crypto');
var router = express.Router();

router.get('/', function(req, res){

	res.render('index');
});

router.post('/auth', function(req, res){

	db = req.db;
	collection = db.get("people");

	body = req.body;
	password_hash = crypto
						.createHmac('sha1', "secret-key")
							.update(body.password).digest('hex');

	collection.find({"email": body.email, 
						"password": password_hash}, function(err, user){

							console.log(user);

							if (err) 
								res.json(500, err);
							else 
								res.json(201, user)
						});
});

module.exports = router;