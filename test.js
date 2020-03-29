async function fetchRecipes() {

}


async function insertRecipes() {

    let res = await fetch("./assets/js/recipes.json");
    const recipes = await res.json();
    const recipeKeys = Object.keys(recipes);

    for (i = 0; i < recipeKeys.length; i++) {
        let recipeNo = recipeKeys[i];
        let recipe = recipes[recipeNo];
        console.log(recipe.Name)
    }
}

insertRecipes();