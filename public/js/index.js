  var inHabitBtn = document.getElementById("inHabitBtn");
  var formBtn = document.getElementById("formBtn");
  var interABtn = document.getElementById("interABtn");
  var header = document.getElementById("myHeader");
  var imgIndexOne = document.getElementById("imgIndexOne");
  var imgIndexTwo = document.getElementById("imgIndexTwo");
  var heightDiv = document.getElementById("heightDiv");
  var indexCopyOne = document.getElementById("indexCopyOne");
  var indexCopyTwo = document.getElementById("indexCopyTwo");
  //var imgIndexOneY = imgIndexOne.pageYOffset;

  var i = 0;
  var f = 0;
  var g = 0;
  var textOne = "In this sanctuary, a diverse array of species includes plants, insects, reptiles, and raptors. All species co-exist to preserve a delicate balance of a diminishing eco-system in this geographical location.";
  var textTwo = "From the acquisition of the parcel to the current status of the reclamation. The formation of the sanctuary was strenuous and well researched specific to the local landscape.";
  var textThree = "A variety of tech are used to better understand the sanctuary. Realtime IoT sensors, 360° virtual tours, and NFC proximity communication, make this parcel's data highly accesible.";

  var speed = 20;

  function typeWriterOne() {
    if (i < textOne.length) {
      document.getElementById("indexCopyOne").innerHTML += textOne.charAt(i);
      i++;
      setTimeout(typeWriterOne, speed);
    }
  }

  function typeWriterTwo() {
    if (f < textTwo.length) {
      document.getElementById("indexCopyTwo").innerHTML += textTwo.charAt(f);
      f++;
      setTimeout(typeWriterTwo, speed);
    }
  }

  function typeWriterThree() {
    if (g < textThree.length) {
      document.getElementById("indexCopyThree").innerHTML += textThree.charAt(g);
      g++;
      setTimeout(typeWriterThree, speed);
    }
  }

  document.addEventListener('aos:in:indexPicOne', ({ detail }) => {
    imgIndexOne.src = "../images/mallow_1_1024.jpg";
    typeWriterOne();
  });

  document.addEventListener('aos:in:indexPicTwo', ({ detail }) => {
    imgIndexTwo.src = "../images/pinksky_2_1024.jpg";
    typeWriterTwo();
  });


  document.addEventListener('aos:in:indexThree', ({ detail }) => {
    
    typeWriterThree();
  });



  window.onload = function()
  {
     window.onscroll = function()
     {
          //fast flip of images setup
          // var totalImages = ["catepillar_2_1024.jpg", "cleves_1_1024.jpg", "hopper_3_1024.jpg", "ladybug_1_1024.jpg", "ladybutterfly_2_1024.jpg","catepillar_2_1024.jpg", "cleves_1_1024.jpg", "hopper_3_1024.jpg", "ladybug_1_1024.jpg", "ladybutterfly_2_1024.jpg"]
          // var totalImagesTwo = [ "mallow_1_1024.jpg", "pinksky_2_1024.jpg", "poppy_1_1024.jpg", "sage_1_1024.jpg", "shrooms_2_1024.jpg", "mallow_1_1024.jpg", "pinksky_2_1024.jpg", "poppy_1_1024.jpg", "sage_1_1024.jpg", "shrooms_2_1024.jpg"]
          // var scrollTop = window.pageYOffset;
          // var docHeight = document.body.clientHeight;
          // var scrollTop = window.pageYOffset;
          // var docHeight = document.body.clientHeight;
          // var winHeight = window.innerHeight;
          // var scrollInterval = Math.floor(document.body.clientHeight / totalImages.length);
          // var i = Math.floor(window.pageYOffset / scrollInterval);

          // //flip of images by percentages set up
          // var scrollPercent = (scrollTop) / (docHeight - winHeight);
          // var scrollPercentRounded = Math.round(scrollPercent*100);
          // imgIndexOne.src = "../images/" + totalImages[i];
          // imgIndexTwo.src = "../images/" + totalImagesTwo[i];    
     }
  }

  // inhabitants button mouse events
  // function handleInhabits(evt) {
  //     evt.preventDefault();
  //     window.open("/inhabitants", '_self');
  // }

  // function overInhabits(evt) {
  //     evt.preventDefault();
  // }

  // function outInhabits(evt) {
  //     evt.preventDefault();
  // }

  // inHabitBtn.addEventListener('touchstart', handleInhabits);
  // inHabitBtn.addEventListener('click', handleInhabits);
  // inHabitBtn.addEventListener('mouseover', overInhabits);
  // inHabitBtn.addEventListener('mouseout', outInhabits);

  // // formation button mouse events
  // function handleForm(evt) {
  //     evt.preventDefault();
  //     window.open("/formation", '_self');
  // }

  // function overForm(evt) {
  //     evt.preventDefault();
  // }

  // function outForm(evt) {
  //     evt.preventDefault();
  // }

  // formBtn.addEventListener('touchstart', handleForm);
  // formBtn.addEventListener('click', handleForm);         
  // formBtn.addEventListener('mouseover', overForm);
  // formBtn.addEventListener('mouseout', outForm);

  // //interactive button mouse events
  // function handleInterA(evt) {
  //     evt.preventDefault();
  //     window.open("/interactive", '_self');
  // }

  // function overInterA(evt) {
  //     evt.preventDefault();
  // }

  // function outInterA(evt) {
  //     evt.preventDefault();
  // }

  // interABtn.addEventListener('touchstart', handleInterA);
  // interABtn.addEventListener('click', handleInterA);         
  // interABtn.addEventListener('mouseover', overInterA);
  // interABtn.addEventListener('mouseout', outInterA);
