conn = new Mongo()
db = conn.getDB("wrangler")

var distinctFriends = []
var allPeople = []

db.people.find().forEach(function(person){

	allPeople.push(person.name)

	person.friends.forEach(function(friend){

		//Find distinct friends records
		if(distinctFriends.indexOf(friend.name) < 0)
			distinctFriends.push(friend.name)
	})
})

print("All peoples records: "+ allPeople.length)
print("All distinct friends: "+ distinctFriends.length)

var peopleFriends = allPeople.filter(function(x) { return distinctFriends.indexOf(x) > -1 })

print("All friends with people records: "+ peopleFriends.length)