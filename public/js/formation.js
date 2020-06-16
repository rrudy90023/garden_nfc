  var imgFormOne = document.getElementById("imgFormOne");
  var imgFormTwo = document.getElementById("imgFormTwo");
  var heightDiv = document.getElementById("heightDiv");
  //var imgIndexOneY = imgIndexOne.pageYOffset;


  var i = 0;
  var f = 0;
  var g = 0;
  var textOne = "In prehistoric times, this region slowly emerged from the sea as the San Gabriel mountains. Hundreds of millions later, coastal sage scrub was formed by its unique Mediterranean climate. Currently, the parcel lying on Tongva land sits on the outskirts of Downtown Los Angeles. Much of the basin's natural landscape and species were destroyed by urban sprawl and industrialization.";
  var textTwo = "The parcel was formed during post World War II to house the growing population in the basin. The surrounding homes where mostly cookie-cutter single-family homes. During that era, it was common to have grass lawns in the front and back of the homes. This parcel had cemented outdoor with no flora.";
  var textThree = "After three years of regenerating the native flora, much of the intended goal is still a work in progress.";

  var speed = 20;

  function typeWriterOne() {
    if (i < textOne.length) {
      document.getElementById("formCopyOne").innerHTML += textOne.charAt(i);
      i++;
      setTimeout(typeWriterOne, speed);
    }
  }

  function typeWriterTwo() {
    if (f < textTwo.length) {
      document.getElementById("formCopyTwo").innerHTML += textTwo.charAt(f);
      f++;
      setTimeout(typeWriterTwo, speed);
    }
  }

  function typeWriterThree() {
    if (g < textThree.length) {
      document.getElementById("formCopyThree").innerHTML += textThree.charAt(g);
      g++;
      setTimeout(typeWriterThree, speed);
    }
  }




  document.addEventListener('aos:in:formPicOne', ({ detail }) => {
    
    typeWriterOne()
  });

  document.addEventListener('aos:in:formPicTwo', ({ detail }) => {
    imgFormOne.src = "../images/front_2_1024.jpg";
    typeWriterTwo()
  });


  document.addEventListener('aos:in:formPicThree', ({ detail }) => {
    imgFormTwo.src = "../images/front_4_1024.jpg";
    typeWriterThree()
  
  });

  window.onload = function()
  {
     window.onscroll = function()
     {
  
     }
  }