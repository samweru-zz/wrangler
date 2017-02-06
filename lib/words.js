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
	* Word Similarity
	*
	* String first  Word/Sentence/Phrase
	* String second "
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
	}
}