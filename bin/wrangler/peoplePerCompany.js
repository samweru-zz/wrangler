conn = new Mongo()
db = conn.getDB("wrangler")


var companies = {}

db.people.find().forEach(function(person){


	if(!companies.hasOwnProperty(person.company))
		companies[person.company] = 0

	companies[person.company] += 1
})

for(idx in companies)
	print(idx + ":" + companies[idx])