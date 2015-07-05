var express = require('express');
var session = require('express-session');
var logger = require('express-bunyan-logger');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
var debug = require("debug");
var mongojs = require("mongojs")
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

        level: 'info',
        stream: process.stdout
    }]
}));

// Session
app.use(session({ secret: 'secret-sess-key', 
					cookie: { maxAge: 60000 }}));

//import routes
app.use('/', require('./routes/index'));
app.use('/people', require('./routes/people'));
app.use('/register', require('./routes/register'));

//start server
app.listen(3333);
console.log('Running on port 3333!');