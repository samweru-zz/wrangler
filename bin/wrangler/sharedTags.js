conn = new Mongo()
db = conn.getDB("wrangler")

var allPeople = db.people.find()

var sharedTags = {}

allPeople.forEach(function(person){

	person.tags.forEach(function(tag){

		if(!sharedTags.hasOwnProperty(tag))
			sharedTags[tag] = 0

		sharedTags[tag] += 1
	})
})

for(idx in sharedTags)
	print(idx + ":" + sharedTags[idx])