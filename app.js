var express = require('express');
var session = require('express-session');
var logger = require('express-bunyan-logger');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
var mongojs = require("mongojs");
var db = mongojs("refunite", ['people']);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname+'/views');

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

        level: 'info',
        stream: process.stdout
    }]
}));

// session
app.use(session({ secret: 'secret-sess-key', 
					cookie: { maxAge: 60000 }}));

app.use(function(req, res, next){

	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

	if(req.xhr){

		if(["/profile/update",
			"/profile/view",
			"/change"].indexOf(req.originalUrl) >= 0){

			if(!req.session.user)
				res.json(201, {"request":"failed"});
		}
		else if(["/", "/register"].indexOf(req.originalUrl) >= 0){

			if(req.session.user)
				res.json(201, {"request":"failed"});
		}
	}
	else{

		if(req.originalUrl!="/auth/logout"){

			if(!req.session.user)
				res.render("guest");
			else
				res.render("authorized");
		}
	}

	next();
})

//import routes
app.use('/auth', require('./routes/auth'));
app.use('/register', require('./routes/register'));
app.use('/change', require('./routes/change'));
app.use('/profile', require('./routes/profile'));

//start server
app.listen(3333);
console.log('Running on port 3333!');