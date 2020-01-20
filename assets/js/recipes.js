 var recipeNo = window.location.hash; //Get Recipe Name

 recipeNo = recipeNo.substr(1); //Remove #


 // Set Landing Images
 var recipeImage1 = "url('../assets/images/recipes/meat/" + recipeNo + "/1.jpg')";
 var recipeImage2 = "url('../assets/images/recipes/meat/" + recipeNo + "/2.jpg')";

 // Insert Recipe Details

 // JSON
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function () {
     if (this.readyState == 4 && this.status == 200) {
         var response = JSON.parse(xhttp.responseText);
         var recipe = response[recipeNo];

         // Insert HTML
         document.title = recipe.Name;
         $(".recipe-image").css("background-image", recipeImage1);

         $(".recipe-name").html(recipe.Name);
         $(".recipe-description").html(recipe.Description);
         $(".recipe-serving").html(recipe.Serving);
         $(".recipe-minutes").html(recipe.Minutes);
         $(".recipe-calories").html(recipe.Calories);
         $(".recipe-ing-count").html(recipe.Ingredients.length);

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
         $(".next-image").click(function () {
             $(".recipe-image").css("background-image", recipeImage2)
         });

         $(".prev-image").click(function () {
             $(".recipe-image").css("background-image", recipeImage1)
         });
     }
 };

 xhttp.open("GET", "./assets/js/meat.json", true);
 xhttp.send();



