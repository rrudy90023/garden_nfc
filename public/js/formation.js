  var imgFormOne = document.getElementById("imgFormOne");
  var imgFormTwo = document.getElementById("imgFormTwo");
  var heightDiv = document.getElementById("heightDiv");
  //var imgIndexOneY = imgIndexOne.pageYOffset;

  var imagesBefore = ['front_1_1024.jpg', 'stucco_2_1024.jpg', 'front_2_1024.jpg', 'stucco_3_1024.jpg','front_1_1024.jpg', 
    'stucco_2_1024.jpg', 'front_2_1024.jpg', 'stucco_3_1024.jpg'];

  var imagesAfter = ['front_3_1024.jpg' , 'stucco_2_1024.jpg', 'front_4_1024.jpg', 'stucco_3_1024.jpg', 'front_3_1024.jpg',
   'stucco_2_1024.jpg', 'front_4_1024.jpg', 'stucco_3_1024.jpg'];

  var totalImages = imagesBefore.length;
  var i = 0;
  var pageHeight = document.body.clientHeight - window.innerHeight;
  var scrollInterval = Math.floor(pageHeight / totalImages);

  window.onload = function()
  {
     window.onscroll = function()
     {
          var i = Math.floor(window.pageYOffset / scrollInterval);

          console.log(i);
          imgFormOne.src = "../images/" + imagesBefore[i];
          imgFormTwo.src = "../images/" + imagesAfter[i];    
     }
  }