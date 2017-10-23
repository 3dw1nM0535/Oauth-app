var express = require('express'); //import express module
var authRoutes = require(process.cwd() + '/routes/auth-routes');
var passportSetup = require(process.cwd() + '/config/passport-setup');
var mongoose = require('mongoose');
var keys = require(process.cwd() + '/config/auth');
mongoose.connect(keys.mongodb.dburi, {
  useMongoClient: true
}, function() {
  console.log('Connected to mongodb successfully!');
});

var app = express(); //instantiate express object

app.use('/auth', authRoutes);

//Static files Middleware
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/config', express.static(process.cwd() + '/config'));
app.use('/semantic', express.static(process.cwd() + '/semantic'));
app.use('/controllers', express.static(process.cwd() + '/controllers'));

//set view Middleware
app.set('views', process.cwd() + '/views');
app.set('view engine', 'ejs');

//get home route
app.get('/', function(req, res) {
  res.render('home');
});



app.listen(3000, function() {
  console.log('Server running on port 3000');
});
