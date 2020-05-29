var bcrypt = require('bcrypt');
var User = require('../models/user').User;
var Garden = require('../models/garden').Garden;
var Email = require('../models/email').Email;
var SensorOne = require('../models/sensorOne').SensorOne;


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



exports.addPlant = function(plant, next) {
    var newPlant = new Garden({
      plantname: plant.plantname,
      // imageurl: plant.imageurl,
      desc: plant.desc,
      specs: plant.specs,
      dateplanted: plant.dateplanted,
      file: plant.file,
      picId: plant.picId
    });
    
    newPlant.save(function(err) {
      next(null);
    });
};


exports.addEmail = function(email, next) {
    var newEmail = new Email({
      firstName: email.firstName,
      lastName: email.lastName,
      email: email.email.toLowerCase(),
    });
    
    newEmail.save(function(err) {
      next(null);
    });
};


exports.addSensorOne = function(humidity, next) {
    var newSensorOne = new SensorOne({
      data: humidity.data,
      ttl: humidity.ttl,
      published_at: humidity.published_at,
      coreid: humidity.coreid,
      name: humidity.name
    });
    
    newSensorOne.save(function(err) {
      //next(null);
    });

    // newSensorOne.remove({_id: 1},function(err) {
    //   console.log("deleted the first doc")
    //   next(null);
    // });
};


//

exports.findUser = function(email, next) {
  User.findOne({email: email.toLowerCase()}, function(err, user) {
    next(err, user);    
  });
};