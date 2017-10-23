var passport = require('passport'); 
var GoogleStrategy = require('passport-google-oauth20');

//Set up passport Middleware
passport.use(
  new GoogleStrategy({}),
  function () {
    
  }
);