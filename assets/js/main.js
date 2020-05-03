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
      $(".navbar-content img").attr("src", "./assets/images/icons/navbar-logo.png")
      $(".navbar-content").css("width", "100vw");
      $(".navbar-content").css("opacity", "1");
    } else {

      // Open Menu
      $(".navbar-content").css("width", "60vw");
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
    $(".home-recipe-grid > a").fadeIn(500);
    console.log("filter-all")
  } else {
    recipeCat = recipeCat.replace("-cat", "");
    $(".home-recipe").hide();
    $(`.${recipeCat}`).fadeIn(500);
    console.log("filter " + recipeCat)
  }
}

// Filter Categories on Load

$(document).ready(function () {

  if (window.location.pathname == "/index.html") {

    // Get Category Type
    pageCat = window.location.href

    // Filter if not "All"
    if (pageCat.indexOf("?") >= 0) {
      pageCat = pageCat.slice(pageCat.indexOf("?") + 1);

      filterCat(`recipe-${pageCat}`);
      $(".home-recipe-categories > p").removeClass("active-recipe-cat");
      $(`#recipe-cat-${pageCat}`).addClass("active-recipe-cat");
      document.querySelector('#recipe-cats').scrollIntoView({
        behavior: 'smooth'
      });
    }
  }


});

// 404 page

if (window.location.pathname == "/404.html") {
  setTimeout(() => {
    window.location.pathname = "./index.html"
  }, 6000);
}

// Loader
const showLoader = () => {
  $(".loader").show();
  $("html").css("overflow-y", "hidden");
}

const hideLoader = () => {
  $("html").css("overflow-y", "scroll")
  $(".loader").fadeOut(500);
}