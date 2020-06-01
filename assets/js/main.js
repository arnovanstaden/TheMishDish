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
  const category = recipeCat.slice(recipeCat.lastIndexOf("-") + 1, recipeCat.length);
  console.log("filter: " + category)
  if (category === "all") {
    $(".home-recipe-grid .home-recipe").fadeIn(500);
  } else {
    $(".home-recipe").hide();
    $(`.home-recipe[data-recipe-type="${category}"`).fadeIn(500);
  }
}



// 404 page

if (window.location.pathname == "/404.html") {
  setTimeout(() => {
    window.location.pathname = "./index.html"
  }, 6000);
}

// Loader

const hideLoader = () => {
  $("html").css("overflow-y", "scroll")
  $(".loader").fadeOut(500);
  $(".page-body").fadeIn(500);
}