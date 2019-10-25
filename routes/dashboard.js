var express = require('express');
var router = express.Router();
var request = require('request');
var extend = require('xtend');


var requestSparkObj = request({
            uri: 'https://api.particle.io/v1/devices/3c002f000a47353235303037/events/?access_token=b0411c901db00e00b4f1510b8ce0bcbe6289f290',
            method: "GET"
});


var chunks = [];
var appendToQueue = function(arr) {
    for(var i=0;i<arr.length;i++) {
        var line = (arr[i] || "").trim();
        if (line == "") {
            continue;
        }
        chunks.push(line);
        if (line.indexOf("data:") == 0) {
            processItem(chunks);
            chunks = [];
        }
    }
};

var processItem = function(arr) {
    var obj = {};
    for(var i=0;i<arr.length;i++) {
        var line = arr[i];

        if (line.indexOf("event:") == 0) {
            obj.name = line.replace("event:", "").trim();
        }
        else if (line.indexOf("data:") == 0) {
            line = line.replace("data:", "");
            obj = extend(obj, JSON.parse(line));
        }
    }

    console.log(JSON.stringify(obj));
};

var onData = function(event) {
            var chunk = event.toString();
            appendToQueue(chunk.split("n"));
};

requestSparkObj.on('data', onData);


router.get('/', function(req, res) {
    console.log(chunks)

      res.render('dashboard', { 
        title: 'Dashboard',
        particle: chunks,
        nav: true,
        footer: true
      });
});


module.exports = router;