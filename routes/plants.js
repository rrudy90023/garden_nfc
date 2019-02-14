var express = require('express');
var router = express.Router();
var passport = require('passport');
var userService = require('../services/user-service');
var config = require('../config');
var request = require('request');
//var cheerio = require('cheerio');
var fs      = require('fs');
//var restrict = require('../auth/restrict')
var Garden = require('../models/garden').Garden;
/* GET users listing. */

router.get('/api', function(req, res, next) {
  //res.send('respond with a resource');
    // if (!req.isAuthenticated()) {
    //   return res.redirect('/');
    // }

  Garden.find({}, function(err, plants){
    var gardenMap = {};
    //dockets.forEach(function(docket){
      for(var i = 0; i<plants.length; i++){ 
      gardenMap[i] = plants;

      };
    //});
    res.json(plants);


  })

});


router.get('/:id/view', function(req, res, next){

  Garden.findById(req.params.id, function(err, plant){

    var ebin = {
        title: plant.plantname,
        plantname: plant.plantname,
        imageurl: plant.imageurl,
        desc: plant.desc,
        specs: plant.specs,
        dateplanted: plant.dateplanted,
        id: plant._id
    };
        res.render('plants/view', ebin);
    })
  });


router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
    if (!req.isAuthenticated()) {
      return res.redirect('/');
    }

    Garden.find({}, function(err, gardens){
      // var docketMap = {};
      // //dockets.forEach(function(docket){
      //   for(var i = 0; i<dockets.length; i++){ 
      //     var doclist = dockets[i];
      var model = gardens.map(function (plant){

               return {
                  title: 'List of Plants',
                  plantname: plant.plantname,
                  imageurl: plant.imageurl,
                  desc: plant.desc,
                  specs: plant.specs,
                  dateplanted: plant.dateplanted,
                  //scrapeurl: plant.scrapeurl,
                  id: plant._id
               };
        });
      //console.log(model);
      res.render('plants/index', { "plantlist": model, "firstName": req.user.firstName });
    });
      //});
});




router.get('/create', function(req, res, next) {


  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  var vm = {
    title: 'Add plant to garden',
    firstName: req.user.firstName
  };
  res.render('plants/create', vm);
});




router.post('/create', function(req, res, next) {
  userService.addPlant(req.body, function(err) {
    //if (err) {
      //console.log(err);
      var vm = {
        title: 'Add a plant to garden',
        input: req.body
        //error: err
      };
      console.log(req.body);
      //delete vm.input.password;
      res.redirect('/plants');
    //}
    // req.login(req.body, function(err) {
    //   res.redirect('/dockets');
    // });
  });
});



router.get('/:id/edit',function(req, res, next){
  
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }


  Garden.findById(req.params.id, function(err, plant){

    var ebin = {
        title: 'Edit '+ plant.plantname,
        plantname: plant.plantname,
        imageurl: plant.imageurl,
        desc: plant.desc,
        specs: plant.specs,
        dateplanted: plant.dateplanted,
        //scrapeurl: plant.scrapeurl,
        id: plant._id,
        firstName: req.user.firstName
    };
    //console.log(ebin)
    res.render('plants/edit', ebin);
    //res.json(docket);

  });


});






router.post('/:id/edit',function(req, res){

  var plantname = req.body.plantname;
  var imageurl = req.body.imageurl;
  var desc = req.body.desc;
  var specs = req.body.specs;
  var dateplanted = req.body.dateplanted;
  //var scrapeurl = req.body.scrapeurl;

    

  if (req.query.method === "delete") {



  Garden.findById(req.params.id, function(err, plant){

    plant.remove(function(err){

      console.log("deleted");

      res.redirect('/plants');
    //res.json(docket);

    });

  });

  } else {

    Garden.findById(req.params.id, function(err, plant){

      plant.plantname = plantname;
      plant.imageurl = imageurl;
      plant.desc = desc;
      plant.specs = specs;
      plant.dateplanted = dateplanted;
      //plant.scrapeurl = scrapeurl;



      plant.save(function(err){

        console.log("edited");

        res.redirect('/plants');
      //res.json(docket);

      });

    });

  }

});






module.exports = router;
