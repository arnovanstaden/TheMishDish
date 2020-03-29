// OWL CAROUSEL
function loadCarousel() {
    $(".owl-carousel").owlCarousel({
        margin: 10,
        responsiveClass: true,
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
}

$('.owl-next').click(function () {
    $(".owl-carousel").trigger('next.owl.carousel');
})
// Go to the previous item
$('.owl-prev').click(function () {
    // With optional speed parameter
    // Parameters has to be in square bracket '[]'
    $(".owl-carousel").trigger('prev.owl.carousel', [300]);
})




// HOME PAGE

// Normal Recipes

async function insertHomeRecipes() {
    let res = await fetch("./assets/js/recipes.json");
    const recipesResponse = await res.json();
    const recipeKeys = Object.keys(recipesResponse);

    // Insert HTML
    for (i = 0; i < recipeKeys.length; i++) {

        // Get recipe details
        let recipeNo = recipeKeys[i]
        let recipe = recipesResponse[recipeNo]
        let recipeName = recipe.Name;

        recipeType = "";

        if (recipeNo.substr(0, 1) == "M") {
            recipeType = "Meat";
        } else if (recipeNo.substr(0, 2) == "VT") {
            recipeType = "Vegetarian";
        } else {
            recipeType = "Vegan";
        }

        // Insert HTML
        $(".home-recipe-grid").append(
            `<a class="home-recipe recipe-${recipeType.toLowerCase()}" id="${recipeNo}" href="./recipe.html#${recipeNo}">\
                    <div class="home-recipe-image">\
                        <div class="home-recipe-image-cover"></div>\
                    </div>\
                    <h5>${recipeName}</h5>\
                </a>`
        );

        // Change Image
        $(`#${recipeNo} > .home-recipe-image `).css("background-image", `url("./assets/images/recipes/${recipeType}/${recipeNo}/t1.jpg")`);
    }

}

if (window.location.pathname == "/index.html" || window.location.pathname == "/") {
    insertHomeRecipes();
}


async function insertHomeAddOnRecipes() {
    let res = await fetch("./assets/js/add-on-recipes.json");
    const recipesResponse = await res.json();
    const recipeKeys = Object.keys(recipesResponse);

    // Insert HTML
    for (i = 0; i < recipeKeys.length; i++) {

        // Get recipe details
        let recipeNo = recipeKeys[i]
        let recipe = recipesResponse[recipeNo]
        let recipeName = recipe.Name;
        const recipeType = "add-on";

        // Insert HTML
        $(".home-add-on-grid").append(
            `<a class="home-recipe" id="${recipeNo}"  href="./recipe.html#${recipeNo}">\
            <div class="home-recipe-image"  >\
                <div class="home-recipe-image-cover"></div>\
            </div>\
            <h5>${recipeName}</h5>\
        </a>`
        );

        // Change Image
        $(`#${recipeNo} > .home-recipe-image `).css("background-image", `url("./assets/images/recipes/${recipeType}/${recipeNo}/t1.jpg")`);
    }
}



// Add-on Recipes
if (window.location.pathname == "/index.html" || window.location.pathname == "/") {
    insertHomeAddOnRecipes();
}



// ------------------------------

// RECIPE PAGE

async function insertRecipeInfo() {

    let recipeNo = window.location.hash; //Get Recipe ID

    // Return to home page if no hash
    if (recipeNo == "") {
        window.location.pathname = "/index.html"
    }

    recipeNo = recipeNo.substr(1); //Remove #
    recipeType = "";

    if (recipeNo.substr(0, 1) == "M") {
        recipeType = "Meat";
    } else if (recipeNo.substr(0, 2) == "VT") {
        recipeType = "Vegetarian";
    } else if (recipeNo.substr(0, 2) == "AO") {
        recipeType = "Add-on";
    } else if (recipeNo.substr(0, 1) == "V") {
        recipeType = "Vegan";
    }

    recipeType = recipeType.toLowerCase();

    // ------------------------


    // Fetch Recipe Data
    let res = ""
    let recipesResponse = "";
    if (recipeType == "add-on") {
        res = await fetch("./assets/js/add-on-recipes.json");
        recipesResponse = await res.json();
    } else {
        res = await fetch("./assets/js/recipes.json");
        recipesResponse = await res.json();
    }
    const recipeKeys = Object.keys(recipesResponse);
    let recipe = recipesResponse[recipeNo];

    // ---------------

    // Insert HTML
    document.title = recipe.Name;

    // Set Landing Image
    $(".recipe-image").css("background-image", `url('./assets/images/recipes/${recipeType}/${recipeNo}/1.jpg')`);

    $(".recipe-name").html(recipe.Name);
    $(".recipe-description").html(recipe.Description);
    $(".recipe-serving").html(recipe.Servings);
    $(".recipe-prep").html(recipe.PrepTime);
    $(".recipe-cook").html(recipe.CookTime);
    $(".recipe-ing-count").html(recipe.Ingredients.length);

    // Ingredient List
    let ingredientList = recipe.IngredientList;

    // if (ingredientList != "") { // {Don't create catalogue for empty ingredientLists}

    //     for (i = 0; i < ingredientList.length; i++) {

    //         let ingredientListImages = ingredientList.slice();
    //         ingredientListImages[i] = ingredientListImages[i].toLowerCase();
    //         ingredientListImages[i] = ingredientListImages[i].replace(" ", "-");
    //         let ingredientImage = `url("./assets/images/ingredients/${ingredientListImages[i]}.jpg")`

    //         $(".recipe-ingredients").append(
    //             `<div class="ingredient item">\
    //                 <div class="ingredient-image" id="ing-${ingredientListImages[i]}"></div>\
    //                 <h5 class="ingredient-name"> ${ingredientList[i]} </h5>\
    //             </div>`
    //         );

    //         $(`#ing-${ingredientListImages[i]}`).css("background-image", ingredientImage);
    //     }
    // }

    //  Insert Ingredients
    let ingredientType = Object.keys(recipe.Ingredients);
    if (ingredientType[0] != 0) { // {Check if multiple methods (objects)}
        let ingredientKeys = Object.keys(recipe.Ingredients);
        for (i = 0; i < ingredientKeys.length; i++) { // {run for every method}

            let currentKey = ingredientKeys[i];
            $(".ingredients-list").append(
                `<h2 class='ingredient-sub-heading'> ${currentKey}: </h2>`
            )
            for (j = 0; j < recipe.Ingredients[currentKey].length; j++) { // {run for every step in method}
                $(".ingredients-list").append(
                    `<div> \
                    <img src="./assets/images/icons/list-bullet.png"> \
                    <p>${recipe.Ingredients[currentKey][j]}</p> \
                    </div>`
                );

            }
        }

    } else {
        for (i = 0; i < recipe.Ingredients.length; i++) {
            $(".ingredients-list").append(
                `<div> \
                  <img src="./assets/images/icons/list-bullet.png"> \
                  <p> ${recipe.Ingredients[i]}</p> \
                  </div>`
            );
        }
    }




    //  Insert Method Steps
    let methodType = Object.keys(recipe.Method);
    if (methodType[0] != 0) { // {Check if multiple methods (objects)}
        let methodKeys = Object.keys(recipe.Method);
        for (i = 0; i < methodKeys.length; i++) { // {run for every method}

            let currentKey = methodKeys[i];
            $(".recipe-method-steps-list").append(
                `<h2 class='method-sub-heading'> ${currentKey}: </h2>`
            )
            for (j = 0; j < recipe.Method[currentKey].length; j++) { // {run for every step in method}
                $(".recipe-method-steps-list").append(
                    `<p><span>${j+1}.</span>${recipe.Method[currentKey][j]}</p>`
                );

            }
        }

    } else {
        for (j = 0; j < recipe.Method.length; j++) {
            $(".recipe-method-steps-list").append(
                `<p><span>${j+1}.</span>${recipe.Method[j]}</p>`
            );

        }
    }



    // Serving Suggestions
    if (recipe.ServingSuggestion == "") {
        $(".serving-suggestion").hide()
    } else {
        $(".recipe-serving-suggestion").html(recipe.ServingSuggestion);
    }

    //  Recipe Images
    let imageCount = recipe.ImageCount;

    if (imageCount < 2) {
        $(".recipe-arrows").css("display", "none")
    }

    let imageClickCount = 1;

    $(".image-order").html(`${imageClickCount} / ${imageCount}`)

    $(".next-image").click(() => {
        imageClickCount++;
        if (imageClickCount > imageCount) {
            imageClickCount = 1;
        }
        let recipeImage = `url("../assets/images/recipes/${recipeType}/${recipeNo}/${imageClickCount}.jpg")`;
        $(".recipe-image").css("background-image", recipeImage);
        $(".image-order").html(`${imageClickCount} / ${imageCount}`)
    });


    // Add-On Recipes
    if (recipe.AddOnID != "") { // {Check if add-on recipe exists}

        $(".ingredients-list").append(
            `<h2 class='ingredient-sub-heading'> ${recipe.AddOnName}: </h2> \
            <a href='./recipe.html#${recipe.AddOnID}' target="blank">Click here for the recipe</a>`
        );
    }
}

//  Run on Recipe Page
if (window.location.pathname == "/recipe.html") {
    insertRecipeInfo();
}