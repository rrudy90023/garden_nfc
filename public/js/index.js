  var inHabitBtn = document.getElementById("inHabitBtn");
  var formBtn = document.getElementById("formBtn");
  var interABtn = document.getElementById("interABtn");
  var header = document.getElementById("myHeader");
  var imgIndexOne = document.getElementById("imgIndexOne");
  var imgIndexTwo = document.getElementById("imgIndexTwo");
  var heightDiv = document.getElementById("heightDiv");
  //var imgIndexOneY = imgIndexOne.pageYOffset;

  document.addEventListener('aos:in:indexPicOne', ({ detail }) => {
    imgIndexOne.src = "../images/poppy_1_1024.jpg";
 
  });

  document.addEventListener('aos:in:indexPicTwo', ({ detail }) => {
    imgIndexTwo.src = "../images/front_4_1024.jpg";
 
  });



  window.onload = function()
  {
     window.onscroll = function()
     {
          // var scrollTop = window.pageYOffset;
          // var docHeight = document.body.clientHeight;
          // var winHeight = window.innerHeight;
          // var scrollPercent = (scrollTop) / (docHeight - winHeight);
          // var scrollPercentRounded = Math.round(scrollPercent*100);
          //var i = Math.floor(window.pageYOffset / scrollInterval);
          // if (i === 23){
          //   i = 0;
          // }
          //console.log(i);
          //imgIndexOne.src = "../images/" + images[i];
          //imgIndexTwo.src = "../images/" + imagesForm[i];    
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
