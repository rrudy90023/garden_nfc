var express = require('express');
var router = express.Router();
var userService = require('../services/user-service');
const SensorOne = require('../models/sensorOne').SensorOne;
var config = require('../config');
// var request = require('request');
// var extend = require('xtend');

var Particle = require('particle-api-js');
var particle = new Particle();
var token = "b0411c901db00e00b4f1510b8ce0bcbe6289f290";

particle.login({username: 'rrudy90023@gmail.com', password: 'kuDvI3#HYo'}).then(
  function(data) {
    token = data.body.access_token;
  },
  function (err) {
    console.log('Could not log in.', err);
  }
);


var devicesPr = particle.listDevices({ auth: token });

devicesPr.then(
  function(devices){
    console.log('Devices: ', devices);
  },
  function(err) {
    console.log('List devices call failed: ', err);
  }
);



particle.getEventStream({ name: 'sensor_1', auth: token}).then(function(stream) {
  stream.on('event', function(data) {

    // console.log(data)
    // userService.addSensorOne(data, function(err) {
      
    // });

  });
});




router.get('/', function(req, res, next) {

    SensorOne.find({}, function(err, humidity){

        var oneSensorModel = humidity.map(function(sensor){

            return {     
                data: sensor.data,
                ttl: sensor.ttl,
                published_at: sensor.published_at,
                coreid: sensor.coreid,
                name: sensor.name,
                id: sensor._id
            };
        })
        var cordX = 0;
        oneSensorModel.reverse();
        var currentLevel = oneSensorModel[0].data;
        
        for(var i = 0; i < 9; i++){
            if(i>=1){
                cordX+=100;
            }
            oneSensorModel[i].data = cordX+","+oneSensorModel[i].data;
            //humidArray.push(oneSensorModel[i].data);
        }
        oneSensorModel.length = 9;

        //oneSensorModel.slice(-4).join(' ');

        res.render('dashboard', { 
            "title": 'Dashboard',
            "sensor_1": oneSensorModel,
            "current": currentLevel,
            nav: true,
            footer: true
        });


    });



});




module.exports = router;