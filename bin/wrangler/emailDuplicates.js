conn = new Mongo()
db = conn.getDB("wrangler")

var emailDuplicates = db.people.aggregate({ 

    $group : {
      _id : "$email", 
      total : { 
        $sum : 1 
      } 
    } 
  },  
  { 
    $match : { 
      total : { 
        $gte : 2 
      } 
    } 
  },
  { 
    $sort : {
      total : -1
    } 
});

print("Email duplicates: "+emailDuplicates.itcount())