var express = require('express');
var router = express.Router();
var userService = require('../services/user-service');
const Email = require('../models/email').Email;
var config = require('../config');

/* GET email listing. */
router.get('/', function(req, res, next) {
  Email.find({}, function(err, emails){
      var names = [];
      
      var emailList = {
        "emailList": {
        }
      }

      emails.forEach(function (item){
        var fName = [item.firstName];
        var lName = [item.lastName];
        var name = fName.concat(lName)
        var fullName = name.join(' ');
        names.push(fullName)
        emailList.emailList[fullName] = item.email;
      })
      res.json(emailList);
  })
});




router.get('/join', function(req, res) {
  var vm = {
    title: 'Join s17',
    nav: true,
    footer: true
  };
  res.render('emails/join', vm);
});



router.post('/join', function(req, res, next) {
  userService.addEmail(req.body, function(err) {
    if (err) {
      console.log(err);
      var vm = {
        input: req.body,
        error: err
      };
      return res.render('emails/join', vm);
    }

    req.login(req.body, function(err) {
      var vm = {
        input: req.body,
        title: 'One of us',
        nav: true,
        footer: true
      }
      res.render('emails/oneofus', vm);
    });
  });
});



module.exports = router;
