conn = new Mongo()
db = conn.getDB("refunite")

var orphan = []

db.people.find().forEach(function(person) { 

	for(var idx in person.friends){

		var personExists = db.people.find({name:person.friends[idx].name})

		if(!personExists)
			orphan.push(person.friends[idx].name)
	}
})

print("Non existent friends: "+orphan.length)