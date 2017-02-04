conn = new Mongo()
db = conn.getDB("refunite")
//sparse not to index empty fields
db.people.ensureIndex({"phone": 1}, {unique: true, sparse:true}) 
db.people.ensureIndex({"guid": 1}, {unique: true})
db.people.ensureIndex({"id":1}, {unique: true})
// db.people.ensureIndex({"email":1}, {unique: true})