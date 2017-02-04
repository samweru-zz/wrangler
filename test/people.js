var assert = require('chai').assert;

var people = require("../controllers/people")

describe('People',function(){

	it("List All", function(next){

		var page=1
		var size=10		
  
		people.list(page, size, function(err, data){

			assert.equal(size, data.length)

			next()
		})
	})
})