/* MODULE FOR PRINTING RESULTS FROM API REQUEST RESPONSE */
/* Kristina Todevska */
/* Uppgift 5 Projekt */
/* 2024-08-09 */

// Set global variable that will be used in multiple functions
const RECIPES_ELEMENT = document.getElementById('recipes');

// Initialize the function that will print the no results message
export function printNoResults() {
    const noResultsElement = document.createElement('p'); // Create a paragraph element
    noResultsElement.textContent = 'No recipes found. Please try searching for something else! :)'; // Set the text content of the paragraph element
    noResultsElement.classList.add('bold'); // Add class "bold" to the paragraph element to make it bolded
    RECIPES_ELEMENT.appendChild(noResultsElement); // Add the paragraph element to the recipes element
}

// Initialize the function that will print the results
export function printResults(recipe, pageType) {
    const recipeElement = document.createElement('article'); // Create an article element
    recipeElement.classList.add('recipe'); // Add class "recipe" to the article element
    const spinner = document.querySelector('.spinner'); // Get the spinner element

    // Check if spinner exists
    if (spinner) { 
        spinner.remove(); // If it exists, remove spinner since data is loaded (otherwise don't do anything)
    }
    
    // Check if we are printing a random recipe, if yes add specific HTML
    if (pageType == 'show-random-recipe') { 
        RECIPES_ELEMENT.innerHTML += `
            <h2><a href="${recipe.url}" title="Original recipe for ${recipe.name}" target="_blank">${recipe.name}</a></h2>
        `;
    } else if (pageType == 'show-all-recipes') { // Check if we are printing all recipes, if yes add specific HTML
        recipeElement.innerHTML += `
            <h3>${recipe.name}</h3>
        `;
    }

    // Print this HTML for both random and all recipes
    recipeElement.innerHTML += `
        <p>Cooking time: ${recipe.time}</p>
        <p>Type of food: ${recipe.type}</p>
        <p>Vegetarian: ${recipe.vegetarian ? 'Yes' : 'No'}</p>
        <p>Vegan: ${recipe.vegan ? 'Yes' : 'No'}</p>
        <footer>
            <a class="button-recipe" href="${recipe.url}" title="Original recipe for ${recipe.name}" target="_blank">Read recipe</a>
        </footer>
    `;

    // Add the recipeElement to the RECIPES_ELEMENT so it is displayed on the page
    RECIPES_ELEMENT.appendChild(recipeElement);
}