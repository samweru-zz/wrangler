module.exports = {

	/**
	* Term Frequency
	*
	* Array doc
	* String term
	*
	* return Float
	*/
	tf:function(doc, term) {

		var termCount = 0;

		var word = 0;
		for(word in doc)
			if(doc[word] == term)
				termCount++;

		return termCount / doc.length;
	},

	/**
	* Inverse Document Frequency
	*
	* Array docs
	* String term
	*
	* return Float
	*/
	idf:function(docs, term) {

		var termCount = 0;

		var doc = 0;
		var word = 0;
		for(doc in docs)
			for(word in docs[doc])
				if(docs[doc][word] == term)
					termCount++;

		return Math.log(docs.length / termCount); 
	},

	/**
	* Word Similarity - can resolve for Word/Sentence/Phrase
	*
	* I suppose this is Jaccard Index https://goo.gl/BclhkL
	*
	* String first  
	* String second
	*
	* return Float  
	*/
	similarity:function(first,second){

		function tokenize(string){
			
			var tokens = [];
			for (var i = 0; i < string.length-1; i++) {
				
				tokens.push(string.substr(i,2));
			}

			return tokens.sort();
		}

		function intersect(a, b){

			var ai=0, bi=0;
			var result = new Array();

			while(ai < a.length && bi < b.length){

				if(a[ai] < b[bi] ){ ai++; }
		     	else if (a[ai] > b[bi] ){ bi++; }
		     	else /* they're equal */{

					result.push(a[ai]);
					ai++;
					bi++;
				}
		  	}

		  	return result;
		}

		function exec(a, b) {

		  	var left   = tokenize(a);
		  	var right  = tokenize(b);
		  	var middle = intersect(left, right);

		  	return (2*middle.length) / (left.length + right.length);
		}

		return exec(first,second)
	},

	/**
	* Word Similarity - specifically for single words
	*
	* Levenshtein Distance 
	*
	* String a 
	* String b 
	*
	* return Integer
	*/
	levenshtein:function(a,b){

		if (a.length === 0) return b.length
	  	if (b.length === 0) return a.length

	  	let tmp, i, j, prev, val

	  	// swap to save some memory O(min(a,b)) instead of O(a)
	  	if (a.length > b.length) {
	    	
	    	tmp = a
	    	a = b
	    	b = tmp
	  	}

	  	row = Array(a.length + 1)
	 	 // init the row
	  	for (i = 0; i <= a.length; i++) {
	    	
	    	row[i] = i
	  	}

	  	// fill in the rest
	  	for (i = 1; i <= b.length; i++) {
	    	
	    	prev = i
	    	for (j = 1; j <= a.length; j++) {
	      	
	      		if (b[i-1] === a[j-1]) {
	        		
	        		val = row[j-1] // match
	      		} 
	      		else {
	        		
	        		val = Math.min(row[j-1] + 1, // substitution
	              			Math.min(prev + 1,     // insertion
	                       	row[j] + 1))  // deletion
	      		}
	      		
	      		row[j - 1] = prev
	      		prev = val
	    	}
	    
	    	row[a.length] = prev
	  	}
	  
	  	return row[a.length]
	}
}