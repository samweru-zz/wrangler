var express = require('express');
var router = express.Router();

router.post('/list', function(req, res) {

	var db = req.db;
	var body = req.body;

	var page = parseInt(body.page);
	var size = parseInt(body.size);
	var skip = page > 0 ? ((page - 1) * size) : 0;

	db.people.find(null, null, {skip: skip, limit: size}, function (err, data){

		if(err) {

			res.json(500, err);
		}
		else {

			var users = [];
			for (var idx in data) {

				var user = data[idx];
				users.push({

					"id":user.id,
					"uuid":user.uuid,
					"name":user.name,
					"email":user.email,
					"age":user.age,
					"gender":user.gender,
					"company":user.company
				});
			}

			res.json({data: users});
		}
	});
});

module.exports = router;
