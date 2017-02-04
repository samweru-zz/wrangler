var assert = require('chai').assert;

var people = require("../controllers/people")

describe('People',function(){

	it("List All", function(next){

		var page=1
		var size=10		
  
		people.list(1, 10, function(err, data){

			assert.equal(10, data.length)

			next()
		})
	})
})