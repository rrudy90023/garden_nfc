const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const userService = require('../services/user-service');
const config = require('../config');
const request = require('request');
const fs      = require('fs');
const app = require('../app')
//file upload
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
// main
const Garden = require('../models/garden').Garden;

const conn = mongoose.createConnection(config.mongoUri, { useNewUrlParser: true });
// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
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




//API
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

//Plant view PUBLIC

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

//Admin view

router.get('/', function(req, res, next) {

    if (!req.isAuthenticated()) {
      return res.redirect('/');
    }

    Garden.find({}, function(err, gardens){
      var model = gardens.map(function (plant){

               return {
                  title: 'List of Plants',
                  plantname: plant.plantname,
                  imageurl: plant.imageurl,
                  desc: plant.desc,
                  specs: plant.specs,
                  dateplanted: plant.dateplanted,
                  id: plant._id
               };
        });
      res.render('plants/index', { "plantlist": model, "firstName": req.user.firstName });
    });
});

//Add new plant view

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

//Add new plant POST

router.post('/create' , upload.single('imageurl'), function(req, res, next) {
  userService.addPlant(req.body, function(err) {
      var vm = {
        title: 'Add a plant to garden',
        input: req.body
      };
      console.log(req.body);
      res.redirect('/plants');
  });
});

//Edit plant details view

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
        id: plant._id,
        firstName: req.user.firstName
    };
    res.render('plants/edit', ebin);
  });
});

//view image
// @route GET /image/:filename
// @desc Display Image
router.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

//Edit plant details view POST and DELETE

router.post('/:id/edit',function(req, res){

  var plantname = req.body.plantname;
  var imageurl = req.body.imageurl;
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
      plant.imageurl = imageurl;
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
