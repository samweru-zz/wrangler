var sha1 = require("crypto-js/sha1");
var validator = require('validator');

var db = require("mongojs")("refunite", ['people']);

var auth = {

	login:function(email, password, callback){

		if(!validator.isEmpty(password) &&
			validator.isEmail(email)){

			db.people.findOne({

				email    : email, 
				password : sha1(body.password).toString()

			}, callback);
		}
		else{

			callback(null,null)
		}
	}
}

module.exports = auth;