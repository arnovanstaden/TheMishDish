// // OWL CAROUSEL
// function loadCarousel() {
//     $(".owl-carousel").owlCarousel({
//         margin: 10,
//         responsiveClass: true,
//         items: 2,
//         nav: true,
//         responsive: {
//             576: {
//                 items: 3
//             },
//             991: {
//                 items: 4
//             },
//             1200: {
//                 items: 5
//             }
//         }
//     });
// }

// $('.owl-next').click(function () {
//     $(".owl-carousel").trigger('next.owl.carousel');
// })
// // Go to the previous item
// $('.owl-prev').click(function () {
//     // With optional speed parameter
//     // Parameters has to be in square bracket '[]'
//     $(".owl-carousel").trigger('prev.owl.carousel', [300]);
// })




// HOME PAGE

// Normal Recipes

const insertHomeRecipes = () => {
    axios.get("http://localhost:3000/recipes")
        .then(response => {
            const recipes = response.data;

            // Insert HTML
            recipes.forEach(recipe => {
                if (recipe.recipeType == "add-on") {
                    // Insert HTML
                    $(".home-add-on-grid").append(
                        `<a class="home-recipe" id="${recipeNo}"  href="./recipe.html#${recipeNo}">\
                            <div class="home-recipe-image"  >\
                                <div class="home-recipe-image-cover"></div>\
                            </div>\
                            <h5>${recipeName}</h5>\
                        </a>`
                    );
                } else {
                    $(".home-recipe-grid").append(
                        `<a class="home-recipe recipe-${recipe.recipeType} col-md-3" id="${recipe.recipeCode}" href="./recipe.html#${recipe.recipeCode}">\
                            <div class="home-recipe-image">\
                               <img src="${recipe.recipeThumbnailUrl}" alt="${recipe.name} Thumbnail">
                            </div>\
                            <h5>${recipe.name}</h5>\
                        </a>`
                    );
                }
                // Insert HTML
            })
        })
        .catch(error => {
            console.log(error)
        });
}

if (window.location.pathname == "/index.html" || window.location.pathname == "/") {
    insertHomeRecipes();
}



// ------------------------------

// RECIPE PAGE

const insertRecipeInfo = () => {

    let recipeCode = window.location.hash; //Get Recipe ID

    // Return to home page if no hash
    if (recipeCode == "") {
        window.location.pathname = "/index.html"
    }

    recipeCode = recipeCode.substr(1); //Remove #

    // Fetch Recipe Data
    axios.get(`http://localhost:3000/recipes/recipeCode/${recipeCode}`)
        .then(response => {
            const recipe = response.data;
            // Insert HTML
            document.title = recipe.name;

            // Set Landing Image
            $(".recipe-image").css("background-image", `url('${recipe.recipeImageUrls[0]}'`);

            $(".recipe-name").html(recipe.name);
            $(".recipe-description").html(recipe.description);
            $(".recipe-serving").html(recipe.servings);
            $(".recipe-prep").html(recipe.prepTime);
            $(".recipe-cook").html(recipe.cookTime);
            $(".recipe-ing-count").html(recipe.ingredients.length);

            //  Insert Ingredients
            let ingredientType = Object.keys(recipe.ingredients);
            if (ingredientType[0] != 0) { // {Check if multiple methods (objects)}
                let ingredientKeys = Object.keys(recipe.ingredients);
                for (i = 0; i < ingredientKeys.length; i++) { // {run for every method}

                    let currentKey = ingredientKeys[i];
                    $(".ingredients-list").append(
                        `<h2 class='ingredient-sub-heading'> ${currentKey}: </h2>`
                    )
                    for (j = 0; j < recipe.ingredients[currentKey].length; j++) { // {run for every step in method}
                        $(".ingredients-list").append(
                            `<div> \
                    <img src="./assets/images/icons/list-bullet.png"> \
                    <p>${recipe.ingredients[currentKey][j]}</p> \
                    </div>`
                        );

                    }
                }

            } else {
                for (i = 0; i < recipe.ingredients.length; i++) {
                    $(".ingredients-list").append(
                        `<div> \
                  <img src="./assets/images/icons/list-bullet.png"> \
                  <p> ${recipe.ingredients[i]}</p> \
                  </div>`
                    );
                }
            }




            //  Insert Method Steps
            let methodType = Object.keys(recipe.method);
            if (methodType[0] != 0) { // {Check if multiple methods (objects)}
                let methodKeys = Object.keys(recipe.method);
                for (i = 0; i < methodKeys.length; i++) { // {run for every method}

                    let currentKey = methodKeys[i];
                    $(".recipe-method-steps-list").append(
                        `<h2 class='method-sub-heading'> ${currentKey}: </h2>`
                    )
                    for (j = 0; j < recipe.method[currentKey].length; j++) { // {run for every step in method}
                        $(".recipe-method-steps-list").append(
                            `<p><span>${j+1}.</span>${recipe.method[currentKey][j]}</p>`
                        );

                    }
                }

            } else {
                for (j = 0; j < recipe.method.length; j++) {
                    $(".recipe-method-steps-list").append(
                        `<p><span>${j+1}.</span>${recipe.method[j]}</p>`
                    );

                }
            }



            // Serving Suggestions
            if (recipe.servingSuggestion == "") {
                $(".serving-suggestion").hide()
            } else {
                $(".recipe-serving-suggestion").html(recipe.servingSuggestion);
            }

            //  Recipe Images
            let imageCount = recipe.recipeImageUrls.length;
            let imageClickCount = 1;

            if (imageCount < 2) {
                $(".recipe-arrows").css("display", "none")
            }

            $(".image-order").html(`${imageClickCount} / ${imageCount}`)

            $(".next-image").click(() => {
                imageClickCount++;
                if (imageClickCount > imageCount) {
                    imageClickCount = 1;
                }
                let recipeImage = `url(${recipe.recipeImageUrls[imageClickCount-1]})`;
                $(".recipe-image").css("background-image", recipeImage);
                $(".image-order").html(`${imageClickCount} / ${imageCount}`)
            });


            // Add-On Recipes
            if (recipe.addOnCode !== undefined) { // {Check if add-on recipe exists}

                $(".ingredients-list").append(
                    `<h2 class='ingredient-sub-heading'> ${recipe.addOnName}: </h2> \
                    <a href='./recipe.html#${recipe.addOnID}' target="blank">Click here for the recipe</a>`
                );
            }
        })



}

//  Run on Recipe Page
if (window.location.pathname == "/recipe.html") {
    insertRecipeInfo();
}