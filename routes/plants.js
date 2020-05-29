const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config()
const userService = require('../services/user-service');
const config = require('../config');
const request = require('request');
const fs      = require('fs');
const Garden = require('../models/garden').Garden;

//file upload
const aws = require('aws-sdk');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const multerS3 = require('multer-s3')
const s3 = new aws.S3({})

const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const conn = require('../conn');
const admin = require('./admin');
/* GET users listing. */
const plants = express();
const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = 'eu-west-1';

plants.use(bodyParser.json());
plants.use(methodOverride('_method'));

/// Multer S3

var upload = multer({
  //const S3_BUCKET = process.env.S3_BUCKET;
  storage: multerS3({
    s3: s3,
    bucket: S3_BUCKET,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString(), req.params.id + ".jpg")
    }
  })
})

// API call

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


router.get('/:id/view', function(req, res, next){
  Garden.findById(req.params.id, function(err, plant){

    var ebin = {
        title: plant.plantname,
        plantname: plant.plantname,
        file: plant.file,
        picId: plant.picId,
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
      return res.redirect('/admin');
    }

    Garden.find({}, function(err, gardens){
      var model = gardens.map(function (plant){

               return {
                  plantname: plant.plantname,
                  file: plant.file,
                  picId: plant.picId,
                  desc: plant.desc,
                  specs: plant.specs,
                  dateplanted: plant.dateplanted,
                  id: plant._id
               };
        });

      res.render('plants/index', { "title": "Admin", "plantlist": model, "firstName": req.user.firstName });
    });
});


///

router.get('/create', function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/admin');
  }
  // show object if valid user
  var vm = {
    title: 'Add plant to garden',
    firstName: req.user.firstName
  };
  res.render('plants/create', vm);

});

//



router.post('/create', upload.single('file'), function(req, res, next) {
      var vm = {
        title: 'Add a plant to garden',
        input: req.body,
      };
      var model = vm.input;
      model["file"] = req.file.location;

      userService.addPlant(model, function(err) {
          res.redirect('/plants');
      });
});

//

router.get('/:id/edit',function(req, res, next){
  
  if (!req.isAuthenticated()) {
    return res.redirect('/admin');
  }

      Garden.findById(req.params.id, function(err, plant){
        var ebin = {
            title: 'Edit '+ plant.plantname,
            plantname: plant.plantname,
            file: plant.file,
            desc: plant.desc,
            specs: plant.specs,
            dateplanted: plant.dateplanted,
            id: plant._id,
            firstName: req.user.firstName
        };
        // const bucket = Object.assign(ebin, files);
        res.render('plants/edit', ebin);
      });
});

//


router.post('/:id/edit', upload.single('file'), function(req, res){

  if(!req.file){

    var plantname = req.body.plantname;
    var desc = req.body.desc;
    var specs = req.body.specs;
    var dateplanted = req.body.dateplanted;

    Garden.findById(req.params.id, function(err, plant){

      if (req.query.method === "DELETE") {
        var clearFile = true;
          Garden.findById(req.params.id, function(err, plant){
            const str = plant.file;
            const txt = str.substr(-13);

          const params = {  
            Bucket: S3_BUCKET, 
            Key: txt 
          };

          s3.deleteObject(params, function(err, data) {
            if (err) {
              console.log(err, err.stack);
            } else {    
              // Garden.findById(req.params.id, function(err, plant){
                
              //   Garden.update({ 
              //     $unset: { file: "" } 
              //   });
              //   console.log(plant.file)
              // });
              console.log(params);
            }
          });
        });
      }

      plant.plantname = plantname;
      plant.desc = desc;
      plant.specs = specs;
      plant.dateplanted = dateplanted;

      plant.save(function(err){
        console.log("edited with new copy or image");
        res.redirect('/plants');
      });
    });

  } 

  if(req.file){
    var plantname = req.body.plantname;
    var file = req.file.location;
    var desc = req.body.desc;
    var specs = req.body.specs;
    var dateplanted = req.body.dateplanted;
    //var picId = req.file.id
    console.log(req.file.location)
    Garden.findById(req.params.id, function(err, plant){
      plant.plantname = plantname;
      plant.file = req.file.location;
      plant.desc = desc;
      plant.specs = specs;
      plant.dateplanted = dateplanted;

      plant.save(function(err){
        console.log("edited with new image");
        res.redirect('/plants');
      });
    });
  }
});


router.post('/:id', (req, res) => {
  if (req.query.method === "DELETE") {
    Garden.findById(req.params.id, function(err, plant){
        // deleteOne()
        plant.remove(function(err){

          console.log("deleted all" + "  " + plant);
          res.redirect('/plants');
        });
    });
  }
})

// removes the specific image object for AWS S3
// router.post('/:id/edit', (req, res) => {
  
//   if (req.query.method === "DELETE") {
//       Garden.findById(req.params.id, function(err, plant){
        
//         const str = plant.file;
//         const txt = str.replace("https://s17.s3.amazonaws.com/","");
//         console.log(txt);

//       const params = {  
//         Bucket: S3_BUCKET, 
//         Key: txt 
//       };

//       s3.deleteObject(params, function(err, data) {
//         if (err) {
//           console.log(err, err.stack); // an error occurred
//         } else {    
//           console.log(data);           // successful response
//           console.log(params);
//           res.redirect('/:id/edit');
//         }
//       });
        
//     });


//   }
  // if (req.query.method === "DELETE") {
  //   const params = {  
  //     Bucket: S3_BUCKET, 
  //     Key: req.file.key 
  //   };

  //   s3.deleteObject(params, function(err, data) {
  //     if (err) {
  //       console.log(err, err.stack); // an error occurred
  //     } else {    
  //       console.log(data);           // successful response
  //       console.log(params);
  //     }
  //   });
  // };

//});



module.exports = router;
