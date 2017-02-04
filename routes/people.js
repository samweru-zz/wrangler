var express = require('express');
var router = express.Router();

router.post('/list', function(req, res) {

	var body = req.body;
	var page = parseInt(body.page);
	var size = parseInt(body.size);

	people.list(page, size, function(err, data){

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
	})
});

module.exports = router;
