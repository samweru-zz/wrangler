var express = require('express');
var router = express.Router();

var sha1 = require("../scripts/sha1");

router.get('/', function(req, res){

	res.render('change');
});

router.post('/password', function(req, res){

	var db = req.db;
	var body = req.body;
	var session = req.session;

	if(body.password != body.confirm){

		res.json({"modify":"failed"});
		return;
	}

	db.people.findAndModify({
			query: {

				"id":session.user.id,
				"password":sha1.password(body.current)
			},
			update: { $set: { password:sha1.password(body.password) }},
		}, function(err, doc, lastErrorObject) {
	
			if(doc)
				if(err)
					res.json({"modify":"failed"});
				else
					res.json({"modify":"successful"});
			else
				res.json({"modify":"failed"});
	});
});

module.exports = router;