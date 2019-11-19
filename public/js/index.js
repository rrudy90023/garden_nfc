  var subBtn = document.getElementById("subscribeBtn");
  var inHabitBtn = document.getElementById("inHabitBtn");
  var formBtn = document.getElementById("formBtn");
  var interABtn = document.getElementById("interABtn");
  var header = document.getElementById("myHeader");
  var imgIndexOne = document.getElementById("imgIndexOne");
  var imgIndexTwo = document.getElementById("imgIndexTwo");
  var heightDiv = document.getElementById("heightDiv");
  //var imgIndexOneY = imgIndexOne.pageYOffset;

  var images = ['sage_1_1024.jpg', 'hopper_3_1024.jpg', 'cleves_1_1024.jpg', 'stucco_2_1024.jpg', 'catepillar_1_1024.jpg', 'ladybug_1_1024.jpg', 'ladybutterfly_2_1024.jpg', 'stucco_4_1024.jpg', 'mallow_1_1024.jpg', 'shrooms_2_1024.jpg', 'poppy_1_1024.jpg','sage_1_1024.jpg', 'stucco_3_1024.jpg', 'hopper_3_1024.jpg', 'cleves_1_1024.jpg', 'stucco_2_1024.jpg','catepillar_1_1024.jpg', 'stucco_4_1024.jpg', 'ladybug_1_1024.jpg', 'ladybutterfly_2_1024.jpg', 'mallow_1_1024.jpg', 'shrooms_2_1024.jpg', 'poppy_1_1024.jpg'];

  var imagesForm = ['stucco_2_1024.jpg', 'front_1_1024.jpg', 'front_2_1024.jpg', 'front_3_1024.jpg', 'front_4_1024.jpg', 'stucco_3_1024.jpg', 'front_1_1024.jpg', 'front_2_1024.jpg', 'front_3_1024.jpg', 'front_4_1024.jpg', 'stucco_4_1024.jpg','front_1_1024.jpg', 'front_2_1024.jpg', 'front_3_1024.jpg', 'front_4_1024.jpg', 'stucco_2_1024.jpg','front_1_1024.jpg', 'front_2_1024.jpg', 'front_3_1024.jpg', 'front_4_1024.jpg', 'stucco_3_1024.jpg', 'front_1_1024.jpg', 'front_2_1024.jpg']

  var totalImages = images.length;
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
          imgIndexOne.src = "../images/" + images[i];
          imgIndexTwo.src = "../images/" + imagesForm[i];    
     }
  }

  // inhabitants button mouse events
  function handleInhabits(evt) {
      evt.preventDefault();
      window.open("/inhabitants", '_self');
  }

  function overInhabits(evt) {
      evt.preventDefault();
  }

  function outInhabits(evt) {
      evt.preventDefault();
  }

  inHabitBtn.addEventListener('touchstart', handleInhabits);
  inHabitBtn.addEventListener('click', handleInhabits);
  inHabitBtn.addEventListener('mouseover', overInhabits);
  inHabitBtn.addEventListener('mouseout', outInhabits);

  // formation button mouse events
  function handleForm(evt) {
      console.log("hello")
      evt.preventDefault();
      window.open("/formation", '_self');
  }

  function overForm(evt) {
      evt.preventDefault();
  }

  function outForm(evt) {
      evt.preventDefault();
  }

  formBtn.addEventListener('touchstart', handleForm);
  formBtn.addEventListener('click', handleForm);         
  formBtn.addEventListener('mouseover', overForm);
  formBtn.addEventListener('mouseout', outForm);

  //interactive button mouse events
  function handleInterA(evt) {
      evt.preventDefault();
      window.open("/interactive", '_self');
  }

  function overInterA(evt) {
      evt.preventDefault();
  }

  function outInterA(evt) {
      evt.preventDefault();
  }

  interABtn.addEventListener('touchstart', handleInterA);
  interABtn.addEventListener('click', handleInterA);         
  interABtn.addEventListener('mouseover', overInterA);
  interABtn.addEventListener('mouseout', outInterA);