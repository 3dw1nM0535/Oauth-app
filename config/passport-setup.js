var passport = require('passport');
var GithubStrategy = require('passport-github2').Strategy;
var authConfig = require(process.cwd() + '/config/keys');
var User = require(process.cwd() + '/models/model');

//serializeUser()/deserializeUser()
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id).then(function (user) {
    done(null, user);
  });
});

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
          '_id': profile.id
        }, function(err, user) {
          if (err) {
            throw err;
          }

          if (user) {
            return done(null, user);
          } else {
            var newUser = new User();

            newUser._id = profile.id;
            newUser.username = profile.username;
            newUser.displayName = profile.displayName;

            newUser.save(function (err) {
              if (err) { 
                throw err;
              }

              return done(null, newUser);
            });
          }
        });
      });
    })
);
