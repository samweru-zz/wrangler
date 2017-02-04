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

	var newUserId;
	var newUserEmail = "pitsolu@gmail.com";
	var newUserPassword = "p@55w0rd";

	it("Add New", function(next){
  
		person.new({

			"email":newUserEmail,
			"password":newUserPassword 

		}, function(err, feedback){

			assert.equal(feedback.success, true)
			assert.equal(feedback.message, "New user successfully saved!")

			newUserId = feedback.id 

			next()
		})
	})

	it("Change Password", function(next){

		var oldPassword = newUserPassword;
		var newPassword = "p0zzwOrd";

		person.changePassword(newUserId, oldPassword, newPassword, function(err, docs, feedback){

			// console.log(feedback)

			assert.isTrue(feedback.updatedExisting)

			next()
		})
	})

	it("Update Profile", function(next){

		person.update(newUserId, {tags:["A","B","C"]}, function(err, feedback){

			// console.log(feedback)
			
			assert.equal(feedback.ok, 1)

			next()
		})
	})

	it("Delete New", function(next){
  
		person.delete(newUserId, function(err, feedback){

			assert.equal(feedback.ok, 1)

			next()
		})
	})
});