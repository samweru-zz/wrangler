var express = require('express');
var uuid = require('node-uuid');
var crypto = require('crypto');
var router = express.Router();

router.get('/', function(req, res){

	res.render('register', {endpoint:"/register"});
});

router.post('/new', function(req, res){

	var db = req.db;
	var body = req.body;

	db.people.find({}).limit(1).sort({_id:-1})
		.toArray(function (err, docs) {

			hash = crypto
				.createHmac('sha1', "secret-key")
					.update(body.password).digest('hex');

			body.id = docs[0].id + 1;
			body.guid = uuid();
			body.password = hash;
			body.picture = "http://placehold.it/32x32";
			body.tags = [];
			body.friends = [];
			body.registered = new Date().toISOString();
			body.name = body.surname + ", " + body.othernames;
			body.age = new Date().getFullYear() - new Date(body.dob).getFullYear();

			delete body.dob
			delete body.surname
			delete body.othernames

			db.people.insert(body, function(err, bug){

				if (err) 
					res.json(500, err);
				else 
					res.json(201, bug);
			});
    	});
});

module.exports = router