var sha1 = require("sha1");
var validator = require('validator');

var db = require("mongojs")("wrangler", ['people']);

var auth = {

	login:function(email, password, callback){

		if(!validator.isEmpty(password) &&
			validator.isEmail(email)){

			db.people.findOne({

				email    : email, 
				password : sha1(password).toString()

			}, callback);
		}
		else{

			callback(null,null)
		}
	}
}

module.exports = auth;