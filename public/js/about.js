var imgAboutOne = document.getElementById('imgAboutOne');


  var i = 0;
  // var f = 0;
  // var g = 0;
  // var h = 0;
  // var k = 0;

  var textOne = "A parcel which serves mainly as a sanctuary for wild life and native plants also has deep symbolic meaning because of its geographic location and its ecological stewards. After generations of systemic neglect in an area largely known as the Ellis Island of Los Angeles. The neighborhood of Boyle Heights has been and still is an area where residents endure ecological hardship. During the modernization of Los Angeles, government let industrial polluters operate near migrant neighborhoods such Boyle Heights. The birth of four freeways in this area were designed to segregate migrant communities even more from the rest of Los Angeles. This caused residents to be deprived access to resources and access to state and local parks. Generations later, residents to this day are fighting for clean air, water, and access to green space. Regardless of government acknowledging the data of high cancer rates, low infant mortality, low graduation rates, and youth asthma, no meaningful action has been initiated. ";
  // var textTwo = "Multiple zones are monitored daily and real-time for humidity levels. Data is published to a database and transmits text messages for warnings of low moisture levels.";
  // var textThree = "Each plant is logged into database and tracked with valuable information. Once inputed, each plant is given a Near Field Communication tag. This proximity technology lets the public access the information stored in the database.";
  // var textFour = "Users can experience 360° virtual tours and 360° live streams.";


  var speed = 20;

  function typeWriterOne() {
    if (i < textOne.length) {
      document.getElementById("aboutCopyOne").innerHTML += textOne.charAt(i);
      i++;
      setTimeout(typeWriterOne, speed);
    }
  }

  // function typeWriterTwo() {
  //   if (f < textTwo.length) {
  //     document.getElementById("intCopyTwo").innerHTML += textTwo.charAt(f);
  //     f++;
  //     setTimeout(typeWriterTwo, speed);
  //   }
  // }

  // function typeWriterThree() {
  //   if (g < textThree.length) {
  //     document.getElementById("intCopyThree").innerHTML += textThree.charAt(g);
  //     g++;
  //     setTimeout(typeWriterThree, speed);
  //   }
  // }

  // function typeWriterFour() {
  //   if (h < textFour.length) {
  //     document.getElementById("intCopyFour").innerHTML += textFour.charAt(h);
  //     h++;
  //     setTimeout(typeWriterFour, speed);
  //   }
  // }




  document.addEventListener('aos:in:aboutPicOne', ({ detail }) => {
    console.log("trig 1")
    typeWriterOne()
  });

  document.addEventListener('aos:in:aboutPicTwo', ({ detail }) => {
    console.log("trig 2")
    imgAboutOne.src = "../images/pinksky_2_1024.jpg";
    //typeWriterTwo()
  });


  // document.addEventListener('aos:in:intPicThree', ({ detail }) => {
  //   typeWriterThree()
  
  // });

  // document.addEventListener('aos:in:intPicFour', ({ detail }) => {
  //   typeWriterFour()
  
  // });



  // live button mouse events
  // function handleLive(evt) {
  //     evt.preventDefault();
  //     window.open("/emails/join", '_self');
  // }

  // function overLive(evt) {
  //     evt.preventDefault();
  // }

  // function outLive(evt) {
  //     evt.preventDefault();
  // }

  // liveBtn.addEventListener('touchstart', handleLive);
  // liveBtn.addEventListener('click', handleLive);
  // liveBtn.addEventListener('mouseover', overLive);
  // liveBtn.addEventListener('mouseout', outLive);


  // // outVirtual button mouse events
  // function handleVirtual(evt) {
  //     evt.preventDefault();
  //     window.open("/virtual", '_self');
  // }

  // function overVirtual(evt) {
  //     evt.preventDefault();
  // }

  // function outVirtual(evt) {
  //     evt.preventDefault();
  // }

  // virtualBtn.addEventListener('touchstart', handleVirtual);
  // virtualBtn.addEventListener('click', handleVirtual);
  // virtualBtn.addEventListener('mouseover', overVirtual);
  // virtualBtn.addEventListener('mouseout', outVirtual);


  // // levels/dashboard button mouse events
  // function handleLevels(evt) {
  //     evt.preventDefault();
  //     window.open("/dashboard", '_self');
  // }

  // function overLevels(evt) {
  //     evt.preventDefault();
  // }

  // function outLevels(evt) {
  //     evt.preventDefault();
  // }

  // levelsBtn.addEventListener('touchstart', handleLevels);
  // levelsBtn.addEventListener('click', handleLevels);
  // levelsBtn.addEventListener('mouseover', overLevels);
  // levelsBtn.addEventListener('mouseout', outLevels);



  window.onload = function()
  {

     window.onscroll = function()
     {
  
     }
  }