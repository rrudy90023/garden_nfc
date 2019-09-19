var express = require('express');
var router = express.Router();
var appdata = require('../data.json');
/* GET home page. */
router.get('/', function(req, res, next) {
  var vm = {
  	nav: true,
  	intro: true,
    title: 'Welcome to s17',
    error: req.flash('error')
  };
  res.render('index', vm);
});


router.get('/inhabitants', function(req, res) {
	var myFriends = [];
	appdata.inhabitants.forEach ( function (item){
      myFriends = myFriends.concat(item.namecase);
  	});

	  res.render('inhabitants', { 
	  	title: 'Inhabitants',
	  	friends: myFriends,
	  	nav: true
	  });
});

router.get('/formation', function(req, res) {
	  res.render('formation', { 
	  	title: 'Formation',
	  	nav: true
	  });
});

router.get('/interactive', function(req, res) {
	  res.render('interactive', { 
	  	title: 'Interactive',
	  	nav: true
	  });
});

module.exports = router;