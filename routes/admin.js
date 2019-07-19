var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    return res.redirect('/plants');
  }
  var vm = {
    title: 'Login',
    error: req.flash('error')
  };
  res.render('admin', vm);
});

module.exports = router;
