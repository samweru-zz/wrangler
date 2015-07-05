var express = require('express');
var crypto = require('crypto');
var router = express.Router();

router.get('/', function(req, res){

	res.render('profile', {endpoint:"update"});
});

module.exports = router;