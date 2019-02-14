var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var gardenSchema = require('../services/user-service');

var gardenSchema = new Schema({
  plantname: { type: String, required: 'Please enter plant name' },
  imageurl: { type: String, required: 'Please enter image url' },
  desc: { type: String, required: 'Please enter description'},
  specs: { type: String, required: 'Please enter specs'},
  dateplanted: { type: String, required: 'Please enter date planted'},
  //scrapeurl: { type: String, required: 'Please enter scrape url'},
  created: { type: Date, default: Date.now }
});

// userSchema.path('email').validate(function(value, next) {
//   userService.findUser(value, function(err, user) {
//     if (err) {
//       console.log(err);
//       return next(false);
//     }
//     next(!user);
//   });
// }, 'That email is already in use');

var Garden = mongoose.model('Garden', gardenSchema);


module.exports = {
  Garden: Garden
};