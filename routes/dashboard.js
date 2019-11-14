var express = require('express');
var router = express.Router();
// var request = require('request');
// var extend = require('xtend');



var Particle = require('particle-api-js');
var particle = new Particle();
var token = "b0411c901db00e00b4f1510b8ce0bcbe6289f290";
var hdata = null;

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
    //console.log("Event: ", data);

    hdata = data;
  });
});

// var requestSparkObj = request({
//             uri: 'https://api.particle.io/v1/devices/3c002f000a47353235303037/events/sensor_1?access_token=b0411c901db00e00b4f1510b8ce0bcbe6289f290',
//             method: "GET"
// });


// var chunks = [];




// var appendToQueue = function(arr) {

//     for(var i=0;i<arr.length;i++) {
//         var line = (arr[i] || "").trim();
//         if (line == "") {
//             continue;
//         }
//         console.log(chunks.push(line))
//         // if (line.indexOf("data:") == 0) {
//         //     processItem(chunks);
//         //     chunks = [];
//         // }
//     }
// };






// var processItem = function(arr) {
//     var obj = {};
//     for(var i=0;i<arr.length;i++) {
//         var line = arr[i];

//         if (line.indexOf("event:") == 0) {
//             obj.name = line.replace("event:", "").trim();
//         }
//         else if (line.indexOf("data:") == 0) {
//             line = line.replace("data:", "");
//             obj = extend(obj, JSON.parse(line));
//         }
//     }

//     console.log(JSON.stringify(obj));
// };





// var onData = function(event) {

//         var humid = event.toString().replace(/(\r\n|\n|\r)/gm, "").replace(/\s/g, '').slice(28, 30);
//         chunks.push(humid)    
//         console.log(chunks[]);
//             //appendToQueue(chunk.split("n"));
// };




//requestSparkObj.on('data', onData);


router.get('/', function(req, res) {
    var zoneOneLevels = hdata.data;

    console.log(hdata.data, "ready for client side");
    res.render('dashboard', { 
        title: 'Dashboard',
        sensor_1: zoneOneLevels,
        nav: true,
        footer: true
    });
});


module.exports = router;