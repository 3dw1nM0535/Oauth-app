var routes = require('express').Router();

var authCheck = function (req, res, next) {
  if (!req.user) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};

routes.get('/', authCheck, function (req, res) {
  res.render('profile', { user: req.user });
});

module.exports = routes;