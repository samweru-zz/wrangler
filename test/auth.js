var assert = require('chai').assert;

var auth = require("../controllers/auth");

describe('Auth',function(){

	it("Login", function(next){

		var email="pitsolu@gmail.com"
		var password="p0zzwOrd"		
  
		auth.login(email, password, function(err, docs){

			// console.log(docs)

			assert.equal(docs.email, email)

			next()
		})
	})
})