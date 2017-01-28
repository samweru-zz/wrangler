conn = new Mongo()
db = conn.getDB("refunite")

var persons = []
db.people.find().forEach(function(person){

	if(["male","female"].indexOf(person.gender.toLowerCase()) < 0){

		persons.push(person.name)
	}
})

print("Persons with inconsistent gender: "+persons.length)