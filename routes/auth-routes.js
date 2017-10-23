var routes = require('express').Router(); //instantiate Router object
var passport = require('passport');

//Auth login
routes.get('/login', function (req, res) {
  //render login page
  res.render('login', { user: req.user });
});

//logout route
routes.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

//Auth/google route handler
routes.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

//Redirect route
routes.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login'}),
function (req, res) {
  res.redirect('/profile');
});

module.exports = routes;


