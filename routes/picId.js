var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');


router.delete('/files/:id', (req, res) => {
  console.log("deleted image called")
  gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {

    
    if (err) {
      //return res.status(404).json({ err: err });

      return res.status(404).json({
        err: 'No file exists for picId'
      });
    res.redirect('plants/edit');

    };
  });

});


module.exports = router;