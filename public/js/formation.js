  var imgFormOne = document.getElementById("imgFormOne");
  var imgFormTwo = document.getElementById("imgFormTwo");
  var heightDiv = document.getElementById("heightDiv");
  //var imgIndexOneY = imgIndexOne.pageYOffset;

  document.addEventListener('aos:in:formPicOne', ({ detail }) => {
    imgFormOne.src = "../images/front_2_1024.jpg";
 
  });

  document.addEventListener('aos:in:formPicTwo', ({ detail }) => {
    imgFormTwo.src = "../images/front_4_1024.jpg";
 
  });

  window.onload = function()
  {
     window.onscroll = function()
     {
  
     }
  }