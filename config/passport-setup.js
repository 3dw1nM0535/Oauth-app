var passport = require('passport'); 
var GoogleStrategy = require('passport-google-oauth20');
var authConfig = require(process.cwd() + '/config/auth');

//Set up passport Middleware
passport.use(
  new GoogleStrategy({
    clientID: authConfig.google.clientId,
    clientSecret:authConfig.google.clientSecret 
  }),
  function () {

  }
);