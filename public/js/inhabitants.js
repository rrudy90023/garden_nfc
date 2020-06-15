  var imgHabOne = document.getElementById("imgHabOne");
  var imgHabTwo = document.getElementById("imgHabTwo");
  var heightDiv = document.getElementById("heightDiv");
  //var imgIndexOneY = imgIndexOne.pageYOffset;


  var i = 0;
  var f = 0;
  var g = 0;

  var textOne = "There were a limited plants and species before reclaimation. As predicted, many types of native california plants such mallows, sages, grasses, attracted birds, insects, and reptiles.";
  var textTwo = "Mallows, sages, yarrows, and other variety of large shrubs were planted around the parcel. These were carefully selected depending on the region's climate and exposure to the sun, soil drainage and other factors.";
  var textThree = "Unexpected types of insects arrived to the sanctuary. Large cicadas, moths, spiders, and butterflies are present throughout. Some in the day and some at night.";
  var speed = 20;

  function typeWriterOne() {
    if (i < textOne.length) {
      document.getElementById("inHabCopyOne").innerHTML += textOne.charAt(i);
      i++;
      setTimeout(typeWriterOne, speed);
    }
  }

    function typeWriterTwo() {
    if (f < textTwo.length) {
      document.getElementById("inHabCopyTwo").innerHTML += textTwo.charAt(f);
      f++;
      setTimeout(typeWriterTwo, speed);
    }
  }


  function typeWriterThree() {
    if (g < textThree.length) {
      document.getElementById("inHabCopyThree").innerHTML += textThree.charAt(g);
      g++;
      setTimeout(typeWriterThree, speed);
    }
  }

  document.addEventListener('aos:in:habPicOne', ({ detail }) => {
    //imgHabOne.src = "../images/cleves_1_1024.jpg";
    typeWriterOne()
 
  });


  document.addEventListener('aos:in:habPicTwo', ({ detail }) => {
    imgHabOne.src = "../images/cleves_1_1024.jpg";
    typeWriterTwo()
 
  });

  document.addEventListener('aos:in:habPicThree', ({ detail }) => {
    imgHabTwo.src = "../images/ladybug_1_1024.jpg";
    typeWriterThree()
 
  });


  window.onload = function()
  {
     window.onscroll = function()
     {

     }
  }