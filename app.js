var express = require('express');
var session = require('express-session');
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

var index = require('./routes/index');
var people = require('./routes/people');
var register = require('./routes/register');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'static')));

// Make our db accessible to our router
app.use(function(req, res, next){

    req.db = db;
    next();
});

app.use(require('express-bunyan-logger')({

    name: 'logger',
    streams: [{

        level: 'info',
        // stream: stream
        stream: process.stdout
    }]
}));

// Session
app.use(session({ secret: 'secret-sess-key', 
					cookie: { maxAge: 60000 }}));

app.use('/', index);
app.use('/people', people);
app.use('/register', register);

app.listen(3333);
console.log('Running on port 3333!');