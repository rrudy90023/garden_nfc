var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // if (req.user) {
  //   return res.redirect('/plants');
  // }
  var vm = {
    title: 'Welcome to Sanctuary 17',
    error: req.flash('error')
  };
  res.render('index', vm);
});

module.exports = router;
