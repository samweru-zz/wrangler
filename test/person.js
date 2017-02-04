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

	var newId;

	it("Add New", function(next){
  
		person.new({

			"email":"pitsolu@gmail.com",
			"password": "p@55w0rd"

		}, function(err, feedback){

			// console.log(err)

			assert.equal(feedback.success, true)
			assert.equal(feedback.message, "New user successfully saved!")

			newId = feedback.id 

			next()
		})
	})

	it("Delete New", function(next){
  
		person.delete(newId, function(err, feedback){

			// console.log(err)

			assert.equal(feedback.ok, 1)

			next()
		})
	})
});