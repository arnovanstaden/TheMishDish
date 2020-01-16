// Hide Navbar on Scroll

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementsByClassName("navbar").style.top = "0";
  } else {
    document.getElementsByClassName("navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}


// Owl Carousel

$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      1000: {
        items: 5
      }
    }
  });

  $(".owl-carousel recipe-gallery").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      1000: {
        items: 1
      }
    }
  });
});