var passport = require('passport');
var GithubStrategy = require('passport-github2').Strategy;
var authConfig = require(process.cwd() + '/config/auth');
var User = require(process.cwd() + '/models/model');

//Set up passport Middleware
passport.use(
  new GithubStrategy({
      clientSecret: authConfig.github.clientSecret,
      clientID: authConfig.github.clientID,
      callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      //console.log(profile); //Console.log() output to the console
      var newUser = new User();

      newUser.id = profile.id;
      newUser.username = profile.username;
      newUser.displayName = profile.displayName;

      newUser.save().then(function(newUser) {
        console.log(newUser);
      });
    })
);
