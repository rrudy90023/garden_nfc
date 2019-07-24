var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var emailService = require('../services/user-service');

var emailSchema = new Schema({
  firstName: {type: String, required: 'Please enter your first name'},
  lastName: {type: String, required: 'Please enter your last name'},
  email: {type: String, required: 'Please enter your email'},
  created: {type: Date, default: Date.now}
});


var Email = mongoose.model('Email', emailSchema);

module.exports = {
  Email: Email
};