var db = require("mongojs")("refunite", ['people']);

var people = {

	list:function(page, size, callback){

		var skip = page > 0 ? ((page - 1) * size) : 0;

		db.people.find(null, null, {skip: skip, limit: size}, callback);
	}
}

module.exports = people;