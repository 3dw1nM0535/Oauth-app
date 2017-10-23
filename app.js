var express = require('express'); //import express module
var authRoutes = require(process.cwd() + '/routes/auth-routes');
var passportSetup = require(process.cwd() + '/config/passport-setup');
var profileRoutes = require(process.cwd() + '/routes/profile-routes');
var mongoose = require('mongoose');
var keys = require(process.cwd() + '/config/keys');
var passport = require('passport');
var session = require('cookie-session');

//db connection instance
mongoose.connect(keys.mongodb.dburi, {
  useMongoClient: true
}, function() {
  console.log('Connected to mongodb successfully!');
});

//mongoose Promise Middleware
mongoose.Promise = global.Promise;

var app = express(); //instantiate express object

//session Middleware
app.use(session({
  keys: [keys.session.cookieKey],
  maxAge: 24 * 60 * 60 * 1000
}));

//passport Middleware
app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

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
  res.render('home', { user: req.user });
});



app.listen(3000, function() {
  console.log('Server running on port 3000');
});
