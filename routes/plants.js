const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const userService = require('../services/user-service');
const config = require('../config');
const request = require('request');
const fs      = require('fs');
const Garden = require('../models/garden').Garden;

//file upload
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const conn = require('../conn');
/* GET users listing. */

//console.log("plants.js", conn.connectorCreate)

router.get('/api', function(req, res, next) {
  //res.send('respond with a resource');
    // if (!req.isAuthenticated()) {
    //   return res.redirect('/');
    // }

  Garden.find({}, function(err, plants){
    var gardenMap = {};
      for(var i = 0; i<plants.length; i++){ 
      gardenMap[i] = plants;
      };
    res.json(plants);
  })
});

//

//const conn = mongoose.createConnection(config.mongoUri, { useNewUrlParser: true });
// Init gfs
let gfs;
let connector = conn.connectorCreate;
connector.once('open', () => {
  // Init stream
  gfs = Grid(connector.db, mongoose.mongo);
  gfs.collection('uploads');
});
// Create storage engine
const storage = new GridFsStorage({
  url: config.mongoUri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });


//

router.get('/:id/view', function(req, res, next){

  Garden.findById(req.params.id, function(err, plant){

    var ebin = {
        title: plant.plantname,
        plantname: plant.plantname,
        // imageurl: plant.imageurl,
        desc: plant.desc,
        specs: plant.specs,
        dateplanted: plant.dateplanted,
        id: plant._id
    };
        res.render('plants/view', ebin);
    })
  });

//

router.get('/', function(req, res, next) {

    if (!req.isAuthenticated()) {
      return res.redirect('/');
    }

    Garden.find({}, function(err, gardens){
      var model = gardens.map(function (plant){

               return {
                  title: 'List of Plants',
                  plantname: plant.plantname,
                  //imageurl: plant.imageurl,
                  desc: plant.desc,
                  specs: plant.specs,
                  dateplanted: plant.dateplanted,
                  id: plant._id
               };
        });
      res.render('plants/index', { "plantlist": model, "firstName": req.user.firstName });
    });
});

//

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

//

router.post('/create', upload.single('imageurl'),function(req, res, next) {
  userService.addPlant(req.body, function(err) {
      var vm = {
        title: 'Add a plant to garden',
        input: req.body
      };
      console.log(req.body);
      res.redirect('/plants');
  });
});

//

router.get('/:id/edit',function(req, res, next){
  
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }

  Garden.findById(req.params.id, function(err, plant){
    var ebin = {
        title: 'Edit '+ plant.plantname,
        plantname: plant.plantname,
        // imageurl: plant.imageurl,
        desc: plant.desc,
        specs: plant.specs,
        dateplanted: plant.dateplanted,
        id: plant._id,
        firstName: req.user.firstName
    };
    res.render('plants/edit', ebin);
  });
});

//

router.post('/:id/edit',function(req, res){

  var plantname = req.body.plantname;
  // var imageurl = req.body.imageurl;
  var desc = req.body.desc;
  var specs = req.body.specs;
  var dateplanted = req.body.dateplanted;

  if (req.query.method === "delete") {
      Garden.findById(req.params.id, function(err, plant){
        plant.remove(function(err){
          console.log("deleted");
          res.redirect('/plants');
      });
  });

  } else {

    Garden.findById(req.params.id, function(err, plant){
      plant.plantname = plantname;
      // plant.imageurl = imageurl;
      plant.desc = desc;
      plant.specs = specs;
      plant.dateplanted = dateplanted;

      plant.save(function(err){
        console.log("edited");
        res.redirect('/plants');
      });
    });
  }
});


module.exports = router;
