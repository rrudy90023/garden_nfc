var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sensorOneService = require('../services/user-service');

var sensorOneSchema = new Schema({
  data: {type: String},
  ttl: {type: Number},
  published_at: {type: String},
  coreid: {type: String},
  name: {type: String}
});


var SensorOne = mongoose.model('SensorOne', sensorOneSchema);

module.exports = {
  SensorOne: SensorOne
};
