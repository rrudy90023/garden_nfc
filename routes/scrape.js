var express = require('express');
var config = require('../config');
var request = require('request');
var cheerio = require('cheerio');
var fs      = require('fs');
var router = express.Router();
//var restrict = require('../auth/restrict')
/* GET users listing. */




router.get('/scrape', function(req, res, next){
  // Let's scrape Anchorman 2
  url = 'http://www.imdb.com/title/tt1229340/';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var title, release, rating;
      var json = { title : "", release : "", rating : ""};

      $('.title_wrapper').filter(function(){
        var data = $(this);
        title = data.children().first().text().trim();
        release = data.children().last().children().last().text().trim();

        json.title = title;
        json.release = release;
      })

      $('.ratingValue').filter(function(){
        var data = $(this);
        rating = data.text().trim();

        json.rating = rating;
      })
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

   // res.send('Check your console!')
    res.render('galleries/scrape');
  })
})




module.exports = router;
