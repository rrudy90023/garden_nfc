var aboutCopyOne = document.getElementById('aboutCopyOne');
var aboutCopyTwo = document.getElementById('aboutCopyTwo');
var aboutCopyThree = document.getElementById('aboutCopyThree');
var aboutCopyFour = document.getElementById('aboutCopyFour');

  var i = 0;
  var f = 0;
  var g = 0;
  var h = 0;
  var k = 0;

  var textOne = "This parcel that serves as a sanctuary for wildlife and native plants also has a deep symbolic meaning because of its geographic location. The neighborhood of Boyle Heights has been and still is an area where residents endure ecological hardship. According to federal and state data, the area is considered one of the most environmentally hazardous in the state.";
  var textTwo = "During the modernization of Los Angeles, the government allowed industrial polluters to operate adjacent to this migrant neighborhood and the birth of four surrounding freeways exacerbated the already polluted area. This also caused residents deprived access to the city and resources(Redlining), access to state or local parks, and years of the worst air pollution in the country. Generations later, residents to this day are fighting for clean air, water, and access to green space. Regardless of government acknowledging the data of high cancer rates, low infant mortality, low graduation rates, and asthma, no meaningful action has been initiated.";
  var textThree = "S17 is symbolic of the ever-growing resistance to government neglect on its residents. It nurtures community involvement, environmental activism, ground-truthing, and ecological restoration.";
  //var textFour = "S17 is a sanctuary for stewards who push back against polluters and corrupt county supervisors and city councilmen who have oppressed generations of residents.";


  var speed = 20;

  function typeWriterOne() {
    if (i < textOne.length) {
      document.getElementById("aboutCopyOne").innerHTML += textOne.charAt(i);
      i++;
      setTimeout(typeWriterOne, speed);
    } else if (textOne.length === i){
        typeWriterTwo();
    }
  }

  function typeWriterTwo() {
    if (f < textTwo.length) {
      document.getElementById("aboutCopyTwo").innerHTML += textTwo.charAt(f);
      f++;
      setTimeout(typeWriterTwo, speed);
    } else if (textTwo.length === f){
        typeWriterThree();
    }
  }

  function typeWriterThree() {
    if (g < textThree.length) {
      document.getElementById("aboutCopyThree").innerHTML += textThree.charAt(g);
      g++;
      setTimeout(typeWriterThree, speed);
    } else if (textThree.length === g) {
        //typeWriterFour();
    }
  }

  // function typeWriterFour() {
  //   if (h < textFour.length) {
  //     document.getElementById("aboutCopyFour").innerHTML += textFour.charAt(h);
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
    //imgAboutOne.src = "../images/pinksky_2_1024.jpg";
    typeWriterTwo()
  });


  document.addEventListener('aos:in:aboutPicThree', ({ detail }) => {
    console.log("trig 3")
    typeWriterThree()
  
  });

  document.addEventListener('aos:in:aboutPicFour', ({ detail }) => {
    console.log("trig 4")
    typeWriterFour()
  
  });



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