conn = new Mongo()
db = conn.getDB("refunite")
printjson(db.people.getIndexes())