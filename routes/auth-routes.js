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
routes.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

//Redirect route
routes.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login'}),
function (req, res) {
  res.redirect('/');
});

module.exports = routes;


