const api_url = "https://the-mish-dish-backend.herokuapp.com";

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
const loadHomeRecipes = () => {
    showLoader()
    axios.get(`${api_url}/recipes`)
        .then(response => {
            const recipes = response.data;
            recipes.forEach(recipe => {
                if (recipe.recipeType == "add-on") {
                    $(".home-add-on-grid .row").append(
                        `
                        <a class="home-recipe col-md-6 col-lg-4 col-xl-3" id="${recipe.recipeCode}"" href="./recipe.html#${recipe.recipeCode}">
                            <img src=${recipe.recipeThumbnailUrl}>                  
                            <h5>${recipe.name}</h5>                
                        </a>
                        `
                    )
                } else {
                    $(".home-recipe-grid .row").append(
                        `
                        <a class="home-recipe recipe-${recipe.recipeType} col-md-6 col-lg-4 col-xl-3" id="${recipe.recipeCode}"" href="./recipe.html#${recipe.recipeCode}">
                            <img src=${recipe.recipeThumbnailUrl}>                  
                            <h5>${recipe.name}</h5>                
                        </a>
                        `
                    )
                }
            });
            hideLoader()
        })
        .catch(err => console.log(err))

}


// ------------------------------

// RECIPE PAGE



const loadRecipe = () => {
    showLoader();
    let recipeCode = window.location.hash; //Get Recipe ID

    // Return to home page if no hash
    if (recipeCode == "") {
        window.location.pathname = "/index.html"
    }

    recipeCode = recipeCode.substr(1); //Remove #
    axios.get(`${api_url}/recipes/recipeCode/${recipeCode}`)
        .then(response => {
            const recipe = response.data;
            console.log(recipe)
            // Insert HTML
            document.title = recipe.name;

            // Set Landing Image
            $(".recipe-image").css("background-image", `url("${recipe.recipeImageUrls[0]}")`);

            $(".recipe-name").html(recipe.name);
            $(".recipe-description").html(recipe.description);
            $(".recipe-serving").html(recipe.servings);
            $(".recipe-prep").html(recipe.prepTime);
            $(".recipe-cook").html(recipe.cookTime);

            const ingredientComponents = Object.keys(recipe.ingredients);

            //  Insert Ingredients
            if (ingredientComponents.length > 1) { //> 1 Ingredient Component
                let ingCount = 0;
                for (i = 0; i < ingredientComponents.length; i++) {
                    let key = ingredientComponents[i];
                    $(".ingredients-list").append(
                        `
                        <h2 class="ingredient-sub-heading"> ${key} </h2>
                        `
                    );
                    recipe.ingredients[key].forEach(ingredient => {
                        $(".ingredients-list").append(
                            `
                            <div> 
                                <img src="./assets/images/icons/list-bullet.png">
                                <p> ${ingredient} </p>
                            </div>
                            `
                        )
                        ingCount++;
                    });
                    $(".recipe-ing-count").html(ingCount);

                }
            } else {
                recipe.ingredients["0"].forEach(ingredient => {
                    $(".recipe-ing-count").html(ingredientComponents.length);
                    $(".ingredients-list").append(
                        `
                        <div> 
                            <img src="./assets/images/icons/list-bullet.png">
                            <p> ${ingredient} </p>
                        </div>
                        `
                    )
                });
            }

            //  Insert Method Steps

            const methodComponents = Object.keys(recipe.method);

            //  Insert method
            if (methodComponents.length > 1) { //> 1 Method Component
                for (i = 0; i < methodComponents.length; i++) {
                    let stepCount = 1;
                    let key = methodComponents[i];
                    $(".recipe-method-steps-list").append(
                        `
                        <h2 class="method-sub-heading"> ${key} </h2>
                        `
                    );
                    recipe.method[key].forEach(Method => {
                        $(".recipe-method-steps-list").append(
                            `
                            <div> 
                                <p><span>${stepCount}</span> ${Method} </p>
                            </div>
                            `
                        )
                        stepCount++;
                    });
                }
            } else {
                let stepCount = 1;
                recipe.method["0"].forEach(Method => {
                    $(".recipe-method-steps-list").append(
                        `
                        <div> 
                            <p><span>${stepCount}</span> ${Method} </p>
                        </div>
                        `
                    );
                    stepCount++;
                });
            }

            // Serving Suggestions
            if (recipe.servingSuggestion == "") {
                $(".serving-suggestion").hide()
            } else {
                $(".recipe-serving-suggestion").html(recipe.servingSuggestion);
            }

            //  Recipe Images
            let imageCount = recipe.recipeImageUrls.length;

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
                let recipeImage = `url("${recipe.recipeImageUrls[imageClickCount -1]}")`;
                $(".recipe-image").css("background-image", recipeImage);
                $(".image-order").html(`${imageClickCount} / ${imageCount}`)
            });

            $(".prev-image").click(() => {
                imageClickCount--;
                if (imageClickCount < imageCount) {
                    imageClickCount = 1;
                }
                let recipeImage = `url("${recipe.recipeImageUrls[imageClickCount -1]}")`;
                $(".recipe-image").css("background-image", recipeImage);
                $(".image-order").html(`${imageClickCount} / ${imageCount}`)
            });


            // Add-On Recipes
            if (recipe.hasOwnProperty("addOnCode") && recipe.addOnCode != "") { // {Check if add-on recipe exists}

                $(".ingredients-list").append(
                    `<h2 class='ingredient-sub-heading'>${recipe.addOnName} </h2> \
                    <a href='./recipe.html#${recipe.addOnCode}' target="blank">Click here for the recipe</a>`
                );
            }

            hideLoader();
        })
        .catch(err => console.log(err))

    // ---------------


}