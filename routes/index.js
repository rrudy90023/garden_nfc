var express = require('express');
var router = express.Router();
var appdata = require('../data.json');


router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});


/* GET home page. */
router.get('/', function(req, res, next) {
  var vm = {
  	nav: true,
  	intro: true,
  	footer: true,
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

	//console.log(appdata)

	  res.render('inhabitants', { 
	  	title: 'Inhabitants',
	  	friends: myFriends,
	  	nav: true,
	  	footer: true
	  });
});

router.get('/formation', function(req, res) {
	  res.render('formation', { 
	  	title: 'Formation',
	  	nav: true,
	  	footer: true
	  });
});

router.get('/interactive', function(req, res) {
	  res.render('interactive', { 
	  	title: 'Interactive',
	  	nav: true,
	  	footer: true
	  });
});


router.get('/about', function(req, res) {
	  res.render('about', { 
	  	title: 'About',
	  	nav: true,
	  	footer: true
	  });
});


router.get('/virtualtour', function(req, res) {
	  res.render('virtualtour', { 
	  	title: 'Virtual Tour',
	  	nav: true,
	  	footer: true
	  });
});

module.exports = router;