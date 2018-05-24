conn = new Mongo()
db = conn.getDB("wrangler")

var distinctFriends = []
var allPeople = []
var allFriends = []

db.people.find().forEach(function(person){

	allPeople.push(person.name)

	person.friends.forEach(function(friend){

		allFriends.push(friend.name)

		//Find distinct friends records
		if(distinctFriends.indexOf(friend.name) < 0)
			distinctFriends.push(friend.name)
	})
})

print("All friends in peoples records: "+ allFriends.length)
print("All peoples records: "+ allPeople.length)
print("All distinct friends: "+ distinctFriends.length)

//itersection
var peopleFriends = allPeople.filter(function(person){

	return distinctFriends.indexOf(person) > -1 
})

print("All friends with people records: "+ peopleFriends.length)
print("Orphaned distinct friends: ", distinctFriends.length - peopleFriends.length)