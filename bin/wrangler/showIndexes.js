conn = new Mongo()
db = conn.getDB("wrangler")
printjson(db.people.getIndexes())