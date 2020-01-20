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

$(".home-recipe-categories > p").click(function () {
  clickedCat = $(this).attr("id");
  filterCat(clickedCat);
  $(".home-recipe-categories > p").removeClass("active-recipe-cat");
  $(this).addClass("active-recipe-cat");
});

function filterCat(recipeCat) {
  if (recipeCat == "recipe-cat-all") {
    $(".home-recipe").fadeIn(500);
  } else {
    recipeCat = recipeCat.replace("-cat","");
    $(".home-recipe").hide();
    $(`.${recipeCat}`).fadeIn(500);
  }
}

// Filter Categories on Load

$(document).ready(function () {

  if (window.location.pathname.split("/").pop() === "index.html") {

    // Get Category Type
    pageCat = $(location).attr("href");

    // Filter if not "All"
    if (pageCat.indexOf("#") > 0) {
      pageCat = pageCat.slice(pageCat.indexOf("#") + 1);
      filterCat(`recipe-${pageCat}`);
      $(".home-recipe-categories > p").removeClass("active-recipe-cat");
      $(`#recipe-cat-${pageCat}`).addClass("active-recipe-cat");
    }
  }
});