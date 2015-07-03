var express = require('express');
var uuid = require('node-uuid');
var router = express.Router();

router.get('/', function(req, res){

	res.render('register', {});
});

router.post('/new', function(req, res){

	var db = req.db;
	var collection = db.get('people');

	var body = req.body;
	body.guid = uuid();
	body.picture = "http://placehold.it/32x32";
	body.tags = [];
	body.friends = [];
	body.registered = new Date().toISOString();
	body.name = body.surname + ", " + body.othernames;
	body.age = new Date().getFullYear() - new Date(body.dob).getFullYear();

	delete body.dob
	delete body.surname
	delete body.othernames

	collection.insert(body, function(err, bug){

		if (err) 
			res.json(500, err);
		else 
			res.json(201, bug);
	});
});

module.exports = router