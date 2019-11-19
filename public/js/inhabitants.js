  var imgHabOne = document.getElementById("imgHabOne");
  var imgHabTwo = document.getElementById("imgHabTwo");
  var heightDiv = document.getElementById("heightDiv");
  //var imgIndexOneY = imgIndexOne.pageYOffset;

  var imagesPlants = ['sage_1_1024.jpg', 'hopper_3_1024.jpg', 'cleves_1_1024.jpg', 'stucco_2_1024.jpg', 
  'catepillar_1_1024.jpg', 'ladybug_1_1024.jpg', 'ladybutterfly_2_1024.jpg', 'stucco_4_1024.jpg', 
  'mallow_1_1024.jpg', 'shrooms_2_1024.jpg', 'poppy_1_1024.jpg','sage_1_1024.jpg', 'stucco_3_1024.jpg', 
  'hopper_3_1024.jpg', 'cleves_1_1024.jpg', 'stucco_2_1024.jpg','catepillar_1_1024.jpg', 'stucco_4_1024.jpg', 
  'ladybug_1_1024.jpg', 'ladybutterfly_2_1024.jpg', 'mallow_1_1024.jpg', 'shrooms_2_1024.jpg', 'poppy_1_1024.jpg'];

  var imagesInsects = ['sage_1_1024.jpg', 'hopper_3_1024.jpg', 'cleves_1_1024.jpg', 'stucco_2_1024.jpg', 
  'catepillar_1_1024.jpg', 'ladybug_1_1024.jpg', 'ladybutterfly_2_1024.jpg', 'stucco_4_1024.jpg', 
  'mallow_1_1024.jpg', 'shrooms_2_1024.jpg', 'poppy_1_1024.jpg','sage_1_1024.jpg', 'stucco_3_1024.jpg', 
  'hopper_3_1024.jpg', 'cleves_1_1024.jpg', 'stucco_2_1024.jpg','catepillar_1_1024.jpg', 'stucco_4_1024.jpg', 
  'ladybug_1_1024.jpg', 'ladybutterfly_2_1024.jpg', 'mallow_1_1024.jpg', 'shrooms_2_1024.jpg', 'poppy_1_1024.jpg']

  var totalImages = imagesPlants.length;
  var i = 0;
  var pageHeight = document.body.clientHeight - window.innerHeight;
  var scrollInterval = Math.floor(pageHeight / totalImages);

  window.onload = function()
  {
     window.onscroll = function()
     {
          var i = Math.floor(window.pageYOffset / scrollInterval);
          if (i === 24){
            i = 0;
          }
          console.log(i);
          imgHabOne.src = "../images/" + imagesPlants[i];
          imgHabTwo.src = "../images/" + imagesInsects[i];    
     }
  }