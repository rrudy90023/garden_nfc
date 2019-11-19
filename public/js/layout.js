  var subBtn = document.getElementById("subscribeBtn");
  var instaBtn = document.getElementById("instaBtn");
//subscribe button mouse events
  function handleSub(evt) {
      evt.preventDefault();
      window.open("/emails/join", '_blank');
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
      window.open("https://www.instagram.com/s17.la", '_blank');
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
