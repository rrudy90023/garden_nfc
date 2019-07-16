var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // if (req.user) {
  //   return res.redirect('/plants');
  // }
  var vm = {
  	nav: true,
    title: 'Welcome to S17',
    error: req.flash('error')
  };
  console.log(vm.nav)
  res.render('index', vm);
});

module.exports = router;
