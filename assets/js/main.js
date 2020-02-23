// Owl Carousel

if (window.location.pathname.split("/").pop() === "recipe.html") {


  $(document).ready(function () {
    $(".owl-carousel").owlCarousel({
      margin: 10,
      items: 2,
      nav: true,
      responsive: {
        576: {
          items: 3
        },
        991: {
          items: 4
        },
        1200: {
          items: 5
        }
      }
    });
  });
}


// Menu 

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

    if ($(window).width() <= 768) {
      // Open Menu
      $(".navbar-content img").attr("src","./assets/images/icons/navbar-logo.png")
      $(".navbar-content").css("width", "100%");
      $(".navbar-content").css("opacity", "1");
    } else {

      // Open Menu
      $(".navbar-content").css("width", "60%");
      $(".navbar-content").css("opacity", "1");
    }


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
    recipeCat = recipeCat.replace("-cat", "");
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
    if (pageCat.indexOf("?") > 0) {
      pageCat = pageCat.slice(pageCat.indexOf("?") + 1);
      filterCat(`recipe-${pageCat}`);
      $(".home-recipe-categories > p").removeClass("active-recipe-cat");
      $(`#recipe-cat-${pageCat}`).addClass("active-recipe-cat");
      document.querySelector('#recipe-cats').scrollIntoView({ behavior: 'smooth' });
    }
  }
});