var express = require('express');
var router = express.Router();
var appdata = require('../data.json');
/* GET home page. */
router.get('/', function(req, res, next) {
  // if (req.user) {
  //   return res.redirect('/plants');
  // }
  var vm = {
  	nav: true,
    title: 'Welcome to s17',
    error: req.flash('error')
  };
  console.log(vm.nav)
  res.render('index', vm);
});

module.exports = router;


/* GET work page. */
router.get('/inhabitants', function(req, res) {
	var myFriends = [];
  //myClients = appdata.works;
  //loop in the works object
	appdata.inhabitants.forEach ( function (item){
    //loop in more in the projects object
    //item.projects.forEach(function(project) {
      myFriends = myFriends.concat(item.namecase);
    //});
  	});

	  res.render('inhabitants', { 
	  	title: 'Our Inhabitants',
	  	friends: myFriends
	  });

});