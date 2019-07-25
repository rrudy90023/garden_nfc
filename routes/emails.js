var express = require('express');
var router = express.Router();
var userService = require('../services/user-service');
const Email = require('../models/email').Email;
var config = require('../config');

/* GET email listing. */
router.get('/', function(req, res, next) {
  Email.find({}, function(err, emails){

    var model = emails.map(function (email){
      //console.log(typeof email)
      return {
        firstName: email.firstName,
        lastName: email.lastName,
        email: email.email

      }
     

    });
      var emailList = Object.assign({emails});
      console.log(typeof model)
      res.json(emailList);
  })


});



    // Garden.find({}, function(err, gardens){
    //   var model = gardens.map(function (plant){

    //            return {
    //               plantname: plant.plantname,
    //               file: plant.file,
    //               picId: plant.picId,
    //               desc: plant.desc,
    //               specs: plant.specs,
    //               dateplanted: plant.dateplanted,
    //               id: plant._id
    //            };
    //     });
    //   //console.log(model)
    //   res.render('plants/index', { "title": "Admin", "plantlist": model, "firstName": req.user.firstName });
    // });





router.get('/join', function(req, res) {
  var vm = {
    title: 'Join s17'
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
        input: req.body
      }
      res.render('emails/oneofus', vm);
    });
  });
});



module.exports = router;
