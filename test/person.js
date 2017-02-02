var assert = require('chai').assert;

var person = require("../controllers/person")

describe('Person',function(){

	it("Find One", function(next){		
  
		person.find(1, function(err, user){

			assert.equal(1, user.id)

			next()
		})
	})

	it("Find Names", function(next){

		var names = ["Jasmine Miers"]
  
		person.findNames(names, function(err, persons){

			assert.equal(names[0], persons[0].name)

			next()
		})
	})
});