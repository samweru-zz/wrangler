conn = new Mongo()
db = conn.getDB("wrangler")

var addresses = []

db.people.find({

	address:{ 

		// $regex: /(?!\d+,\s\w+,\s\w+)/
		// $regex: /\d+,\s\w+,\s\w+/
		// $regex: /^(?!\d+,\s\w+,\s\w+)/
		$regex: /^\d+,\s\w+,[\s\w]+/
	}
})
.forEach(function(person){

	addresses.push(person)
})

print("Addresses: " + addresses.length)