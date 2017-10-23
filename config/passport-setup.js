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
      process.nextTick(function() {
        User.findOne({
          'id': profile.id
        }, function(err, user) {
          if (err) {
            throw err;
          }

          if (user) {
            return done(null, user);
          } else {
            var newUser = new User();

            newUser.id = profile.id;
            newUser.username = profile.username;
            newUser.displayName = profile.displayName;

            newUser.save().then(function(newUser) {
              console.log(newUser);
            });
          }
        });
      });
    })
);
