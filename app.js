var express = require('express');
var app = express();
var path = require('path');

// Jade
app.set('views', __dirname+'/views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

var index = require('./routes/index');
var people = require('./routes/people');
var register = require('./routes/register');

app.use('/', index);
app.use('/people', people);
app.use('/register', register);
app.use(express.static(path.join(__dirname, 'static')));

app.listen(3333);
console.log('Running on port 3333!');