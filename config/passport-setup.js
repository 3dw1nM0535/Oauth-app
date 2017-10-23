var passport = require('passport'); 
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var authConfig = require(process.cwd() + '/config/auth');

//Set up passport Middleware
passport.use(
  new GoogleStrategy({
    clientSecret: 'authConfig.google.clientSecret',
    clientID: 'authConfig.google.clientID',
    callbackUrl: '/auth/google/redirect'
  },
  function () {

  })
);