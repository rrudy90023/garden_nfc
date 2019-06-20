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
const methodOverride = require('method-override');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const conn = require('../conn');
const picId = require('./picId');
/* GET users listing. */
const plants = express();

plants.use(bodyParser.json());
plants.use(methodOverride('_method'));
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
      return res.redirect('/');
    }

    Garden.find({}, function(err, gardens){
      var model = gardens.map(function (plant){

               return {
                  title: 'List of Plants',
                  plantname: plant.plantname,
                  file: plant.file,
                  picId: plant.picId,
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



router.post('/create', upload.single('file'), function(req, res, next) {
      var vm = {
        title: 'Add a plant to garden',
        input: req.body,
      };
      var model = vm.input;
      console.log(req.file);
      model["file"] = req.file.filename;
      model["picId"] = req.file.id;
      

      userService.addPlant(model, function(err) {
          console.log(model);
          //res.json({ file: req.file });
          res.redirect('/plants');
      });
});

//

// @route GET /files
// @desc  Display all files in JSON
router.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }

    // Files exist
    return res.json(files);
  });
});

// @route GET /files/:filename
// @desc  Display single file object
router.get('/files/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // File exists
    return res.json(file);
  });
});

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

//




router.get('/:id/edit',function(req, res, next){
  
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }

      Garden.findById(req.params.id, function(err, plant){
        
        var ebin = {
            title: 'Edit '+ plant.plantname,
            plantname: plant.plantname,
            file: plant.file,
            picId: plant.picId,
            desc: plant.desc,
            specs: plant.specs,
            dateplanted: plant.dateplanted,
            id: plant._id,
            firstName: req.user.firstName
        };

        // const bucket = Object.assign(ebin, files);
        console.log(ebin);
        res.render('plants/edit', ebin);
      });

});

//



router.post('/:id/edit', upload.single('file'), function(req, res){

  if(!req.file){

    console.log(req.file)

    var plantname = req.body.plantname;
    var desc = req.body.desc;
    var specs = req.body.specs;
    var dateplanted = req.body.dateplanted;

    Garden.findById(req.params.id, function(err, plant){
      plant.plantname = plantname;
      plant.desc = desc;
      plant.specs = specs;
      plant.dateplanted = dateplanted;

      plant.save(function(err){
        console.log("edited with new image");
        res.redirect('/plants');
      });
    });

  } 

  if(req.file){
    var plantname = req.body.plantname;
    var file = req.file.filename;
    var desc = req.body.desc;
    var specs = req.body.specs;
    var dateplanted = req.body.dateplanted;
    var picId = req.file.id

    Garden.findById(req.params.id, function(err, plant){
      plant.plantname = plantname;
      plant.file = file;
      plant.desc = desc;
      plant.specs = specs;
      plant.dateplanted = dateplanted;
      plant.picId = picId

      plant.save(function(err){
        console.log("edited with new image");
        res.redirect('/plants');
      });
    });


  }


  //}
});


router.post('/:id', (req, res) => {

  if (req.query.method === "DELETE") {
    Garden.findById(req.params.id, function(err, plant){
        plant.remove(function(err){
          console.log("deleted all");
          res.redirect('/plants');
        });
    });
  }

})

//router.use('/files/picId', picId);

router.post('/files/:id', (req, res) => {
  console.log("deleted image called")
  if (req.query.method === "DELETE") {
    gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
      res.redirect('/plants');
    });
  };
});



module.exports = router;
