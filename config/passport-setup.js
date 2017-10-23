var passport = require('passport');
var GithubStrategy = require('passport-github2').Strategy;
var authConfig = require(process.cwd() + '/config/auth');

//Set up passport Middleware
passport.use(
  new GithubStrategy({
    clientSecret: authConfig.github.clientSecret,
    clientID: authConfig.github.clientID,
    callbackURL: 'http://localhost:3000/auth/github/callback'
  },
  function (accessToken, refreshToken, profile,done) {
    console.log(profile); //Console.log() output to the console
  })
);
