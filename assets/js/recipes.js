// Run on Home Page
if (window.location.pathname == "/index.html") {

    // Insert Recipes

    // JSON
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);

            // Get Object Keys
            const recipeKeys = Object.keys(response);

            // Insert HTML
            for (i = 0; i < recipeKeys.length; i++) {

                // Get recipe details
                let recipeNo = recipeKeys[i]
                let recipe = response[recipeNo]
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
                    `<a class="home-recipe recipe-meat" id=${recipeNo} href="./recipe.html#${recipeNo}">\
                    <div class="home-recipe-image">\
                        <div class="home-recipe-image-cover"></div>\
                    </div>\
                    <h5>${recipeName}</h5>\
                </a>`
                );

                // Change Image
                $(`#${recipeNo} > .home-recipe-image `).css("background-image", `url("./assets/images/recipes/${recipeType}/${recipeNo}/1.jpg")`);
            }


        }
    };

    xhttp.open("GET", "./assets/js/recipes.json", true);
    xhttp.send();
}


//  Run on Recipe Page
else if (window.location.pathname == "/recipe.html") {
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
    } else {
        recipeType = "Vegan";
    }

    recipeType = recipeType.toLowerCase();


    // Set Landing Image
    $(".recipe-image").css("background-image",`url('../assets/images/recipes/${recipeType}/${recipeNo}/1.jpg')`);

    // Insert Recipe Details

    // JSON
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(xhttp.responseText);
            let recipe = response[recipeNo];

            // Insert HTML
            document.title = recipe.Name;

            $(".recipe-name").html(recipe.Name);
            $(".recipe-description").html(recipe.Description);
            $(".recipe-serving").html(recipe.Serving);
            $(".recipe-prep").html(recipe.PrepTime);
            $(".recipe-cook").html(recipe.CookTime);
            $(".recipe-ing-count").html(recipe.Ingredients.length);

            // Serving Suggestions
            if (recipe.ServingSuggestion == "") {
                $(".serving-suggestion").hide()
            } else {
                $(".recipe-serving-suggestion").html(recipe.ServingSuggestion);
            }
            

            //  Insert Method Steps

            for (i = 0; i < recipe.Ingredients.length; i++) {
                $(".ingredients-list").append(
                    `<div> \
                      <img src="./assets/images/icons/list-bullet.png"> \
                      <p> ${recipe.Ingredients[i]}</p> \
                      </div>`
                );
            }

            //  Insert Method Steps

            for (j = 0; j < recipe.Method.length; j++) {
                $(".recipe-method-steps-list").append(
                    `<p><span>${j+1}.</span>${recipe.Method[j]}</p>`
                );
            }

            //  Recipe Images
            let imageCount = recipe.ImageCount;

            if (imageCount < 2) {
                $(".recipe-arrows").css("display", "none")
            }

            let imageClickCount = 1;

            $(".image-order").html(`${imageClickCount} / ${imageCount}`)
            
            $(".next-image").click(()=> {
                imageClickCount++;
                if(imageClickCount > imageCount) {
                    imageClickCount =1;
                }
                let recipeImage = `url("../assets/images/recipes/${recipeType}/${recipeNo}/${imageClickCount}.jpg")`;
                $(".recipe-image").css("background-image",recipeImage);
                $(".image-order").html(`${imageClickCount} / ${imageCount}`)
            });

        }
    };

    xhttp.open("GET", "./assets/js/recipes.json", true);
    xhttp.send();
}

