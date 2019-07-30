var express = require('express');
var router = express.Router();
var appdata = require('../data.json');
/* GET home page. */
router.get('/', function(req, res, next) {
  var vm = {
  	nav: true,
    title: 'Welcome to s17',
    error: req.flash('error')
  };
  console.log(vm.nav)
  res.render('index', vm);
});

module.exports = router;

router.get('/inhabitants', function(req, res) {
	var myFriends = [];
	appdata.inhabitants.forEach ( function (item){
      myFriends = myFriends.concat(item.namecase);
  	});

	  res.render('inhabitants', { 
	  	title: 'Our Inhabitants',
	  	friends: myFriends
	  });
});