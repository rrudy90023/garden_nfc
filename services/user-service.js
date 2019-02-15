var bcrypt = require('bcrypt');
var User = require('../models/user').User;
var Garden = require('../models/garden').Garden;


exports.addUser = function(user, next) {
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    var newUser = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email.toLowerCase(),
      password: user.password
    });
    
    newUser.save(function(err) {
      if (err) {
        return next(err);
      }
      next(null);
    });
  });
};


// router.param("id", (req, res, id) => {
//   Meeting.findById(id)
//     .then(meeting => { meeting })
//     .catch(err => res.status(404).send("Meeting not found"))
// });


exports.addPlant = function(plant, next) {
    var newPlant = new Garden({
      plantname: plant.plantname,
      imageurl: plant.imageurl,
      desc: plant.desc,
      specs: plant.specs,
      dateplanted: plant.dateplanted,
      scrapeurl: plant.scrapeurl
    });
    
    newPlant.save(function(err) {
      next(null);
    });
};

//

exports.findUser = function(email, next) {
  User.findOne({email: email.toLowerCase()}, function(err, user) {
    next(err, user);    
  });
};