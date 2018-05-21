conn = new Mongo()
db = conn.getDB("refunite")

var allfriends = []
var incorrectFormat = []

var regex = new RegExp("^[A-Za-z]+\\s[A-Za-z]+$")

db.people.find().forEach(function(person){

	person.friends.forEach(function(friend){

		//Test for correct format
		if(!regex.test(friend.name))
			incorrectFormat.push(friend.name)

		//Find distinct friends records
		if(allfriends.indexOf(friend.name) < 0)
			allfriends.push(friend.name)
	})
})

var allPeople = db.people.count()
if(allfriends.length > allPeople)
	var orphanFriends = allfriends.length - allPeople 

print("Orphaned friends: "+orphanFriends)
print("Incorrect formats: "+incorrectFormat.length)