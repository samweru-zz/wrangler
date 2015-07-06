var express = require('express');
var session = require('express-session');
var logger = require('express-bunyan-logger');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
var mongojs = require("mongojs");
var db = mongojs("refunite", ['people']);

// Jade
app.set('views', __dirname+'/views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

// static content
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'static')));

// Make our db accessible to our router
app.use(function(req, res, next){

    req.db = db;
    next();
});

// logger
app.use(logger({

    name: 'logger',
    streams: [{

        level: 'off',
        stream: process.stdout
    }]
}));

// session
app.use(session({ secret: 'secret-sess-key', 
					cookie: { maxAge: 60000 }}));

app.use(function(req, res, next){

	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

	if(["/search", 
		"/profile", 
		"/profile/update",
		"/profile/view",
		"/change"].indexOf(req.originalUrl) >= 0)
		if(!req.session.user){

			res.redirect("/");
			return;
		}
		else;
	else
		if(["/", 
			"/register"].indexOf(req.originalUrl) >= 0)
			if(req.session.user){

				res.redirect("/search");
				return;
			}

	next();
})

//import routes
app.use('/', require('./routes/index'));
app.use('/search', require('./routes/search'));
app.use('/register', require('./routes/register'));
app.use('/change', require('./routes/change'));
app.use('/profile', require('./routes/profile'));

//start server
app.listen(3333);
console.log('Running on port 3333!');