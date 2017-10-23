var routes = require('express').Router(); //instantiate Router object
var passport = require('passport');

//Auth login
routes.get('/login', function (req, res) {
  //render login page
  res.render('login');
});

//logout route
routes.get('/logout', function (req, res) {
  res.send('Logging you out!');
});

//Auth/google route handler
routes.get('/google', passport.authenticate('google', { scope: ['profile'] }));

module.exports = routes;


