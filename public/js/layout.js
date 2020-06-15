  var subBtn = document.getElementById("subscribeBtn");
  var instaBtn = document.getElementById("instaBtn");
  var youTubeCh = document.getElementById("youTubeCh")
//subscribe button mouse events
  function handleSub(evt) {
      evt.preventDefault();
      window.open("/emails/join", 'self');
  }

  function overSub(evt) {
      evt.preventDefault();
  }

  function outSub(evt) {
      evt.preventDefault();
  }

  subBtn.addEventListener('touchstart', handleSub);
  subBtn.addEventListener('click', handleSub);         
  subBtn.addEventListener('mouseover', overSub);
  subBtn.addEventListener('mouseout', outSub);

  //instaBtn

  function handleInsta(evt) {
      evt.preventDefault();
      window.open("https://www.instagram.com/s17.la", '_self');
  }

  function overInsta(evt) {
      evt.preventDefault();
  }

  function outInsta(evt) {
      evt.preventDefault();
  }

  instaBtn.addEventListener('touchstart', handleInsta);
  instaBtn.addEventListener('click', handleInsta);         
  instaBtn.addEventListener('mouseover', overInsta);
  instaBtn.addEventListener('mouseout', outInsta);

//youtube


  function handleYouTube(evt) {
      evt.preventDefault();
      window.open("https://www.youtube.com/channel/UCtH5_srP2X3BuR0nt79jXrA", '_self');
  }

  function overYouTube(evt) {
      evt.preventDefault();
  }

  function outYouTube(evt) {
      evt.preventDefault();
  }

  youTubeCh.addEventListener('touchstart', handleYouTube);
  youTubeCh.addEventListener('click', handleYouTube);         
  youTubeCh.addEventListener('mouseover', overYouTube);
  youTubeCh.addEventListener('mouseout', outYouTube);



//https://www.youtube.com/channel/UCtH5_srP2X3BuR0nt79jXrA