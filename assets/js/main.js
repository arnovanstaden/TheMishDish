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


if (window.location.pathname.split("/").pop() === "recipe.html") {

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

}


// Menu Icon

function openMenu() {

  if ($(".navbar-content").hasClass("navbar-open")) {



    // Toggle Icon Change
    $(".navbar-icon").toggleClass("change");

    // Close Menu
    $(".navbar-content").css("width", "0");
    $(".navbar-content").css("opacity", "0");

    // Enable Scroll
    $("body").css("overflow-y", "scroll");

    // Toggle Navbar Open Class
    $(".navbar-content").toggleClass("navbar-open")

  } else {

    // Open Menu
    $(".navbar-content").css("width", "60%");
    $(".navbar-content").css("opacity", "1");

    // Toggle Icon Change
    $(".navbar-icon").toggleClass("change");

    // Disable Scroll
    $("body").css("overflow-y", "hidden");

    // Toggle Navbar Open Class
    $(".navbar-content").toggleClass("navbar-open");
  }
}


//  Filter Recipe Categories

