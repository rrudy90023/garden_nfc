var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var gardenSchema = require('../services/user-service');

var gardenSchema = new Schema({
  plantname: { type: String, required: 'Please enter plant name' },
  // imageurl: { type: String, required: 'Please enter image url' },
  desc: { type: String, required: 'Please enter description'},
  specs: { type: String, required: 'Please enter specs'},
  dateplanted: { type: String, required: 'Please enter date planted'},
  created: { type: Date, default: Date.now }
});

var Garden = mongoose.model('Garden', gardenSchema);

module.exports = {
  Garden: Garden
};