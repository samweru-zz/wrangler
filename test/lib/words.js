var assert = require('chai').assert;

words = require("../../lib/words.js")

var tags = [

	"vulputate",
	"ut",
	"aliquam",
	"lobortis",
	"dignissim",
	"augue",
	"aliquip"
]

var fuzzytags = [

	"vulpusstate",//ss
	"ut",
	"alissquam",//ss
	"lobortis",
	"dignddissim",//dd
	"augue",
	"aliqdduip"//dd
]

describe('Semantic Analysis',function(){

	describe('Tags Similarity',function(){

		it("Compare Same Tag But Reversed", function(next){

			joinedTags = tags.join("")
			reverseJoinedTags = tags.reverse().join("")

			// console.log(joinedTags)
			// console.log(reverseJoinedTags)
			// console.log(words.similarity(joinedTags, reverseJoinedTags))

			assert.isTrue(words.similarity(joinedTags, reverseJoinedTags)>=0.8)

			next()

		})

		it("Compare Same Tag But Fuzzy", function(next){

			joinedTags = tags.join("")
			fuzzyJoinedTags = fuzzytags.join("")

			// console.log(joinedTags)
			// console.log(reverseJoinedTags)
			// console.log(words.similarity(joinedTags, fuzzyJoinedTags))

			assert.isTrue(words.similarity(joinedTags, fuzzyJoinedTags)>=0.7)

			next()

		})
	})
})