var express = require('express');
var router = express.Router();
var passport = require('passport');
var userService = require('../services/user-service');
const User = require('../models/user').User;
var config = require('../config');
const admin = require('./admin');


/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function(err, users){
    var userMap = {};
      for(var i = 0; i<users.length; i++){ 
      userMap[i] = users;
      };
    res.json(users);
  })
});

//

router.get('/create', function(req, res, next) {
  var vm = {
    title: 'Create an account'
  };
  res.render('users/create', vm);
});

//

router.post('/create', function(req, res, next) {

  userService.addUser(req.body, function(err) {
    if (err) {
      console.log(err);
      var vm = {
        title: 'Create an account',
        input: req.body,
        error: err
      };
      delete vm.input.password; 
      return res.render('users/create', vm);
    }

    req.login(req.body, function(err) {
      res.redirect('/plants');
    });
  });
});

//

router.post('/login',
  function(req, res, next) {
    req.session.caseId = 12345;
    if (req.body.rememberMe) {
      req.session.cookie.maxAge = config.cookieMaxAge;
    }
    next();
  }, 
  passport.authenticate('local', {
    failureRedirect: '/', 
    successRedirect: '/plants',
    failureFlash: 'Invalid credentials'
  }));

//

router.get('/logout', function(req, res, next) {
  req.logout();
  req.session.destroy();
  res.redirect('/admin');
});

module.exports = router;
