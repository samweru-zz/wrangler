var express = require('express');
// var session = require('express-session');
var logger = require('express-bunyan-logger');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var mongojs = require("mongojs");
var db = mongojs("refunite", ['people']);
var mustacheExpress = require('mustache-express');

app.engine('html', mustacheExpress()); 
app.set('view engine', 'html');
app.set('views', __dirname+'/views');

// static content
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'static/dev')));
app.use(cookieParser());

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


app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/people', require('./routes/people'));
app.use('/person', require('./routes/person'));

// catch 404 and forward to error handler
// app.use(function(req, res, next) {

//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);

// });

// error handler
// app.use(function(err, req, res, next) {

//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');

// });

app.use(function(err, req, res, next){

	if(err){

	    console.log(err);
	}

	next();
});

module.exports = app;
