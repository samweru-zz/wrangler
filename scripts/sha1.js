var crypto = require('crypto');

var hash = {};
hash.password = function(passwd){

	return crypto
			.createHmac('sha1', "secret-key")
				.update(passwd).digest('hex');
}

module.exports = hash;