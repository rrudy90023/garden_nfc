  var imgHabOne = document.getElementById("imgHabOne");
  var imgHabTwo = document.getElementById("imgHabTwo");
  var heightDiv = document.getElementById("heightDiv");
  //var imgIndexOneY = imgIndexOne.pageYOffset;

  document.addEventListener('aos:in:habPicOne', ({ detail }) => {
    imgHabOne.src = "../images/cleves_1_1024.jpg";
 
  });

  document.addEventListener('aos:in:habPicTwo', ({ detail }) => {
    imgHabTwo.src = "../images/ladybug_1_1024.jpg";
 
  });


  window.onload = function()
  {
     window.onscroll = function()
     {

     }
  }