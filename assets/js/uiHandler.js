/* MODULE FOR HANDLING UI UPDATES */
/* Kristina Todevska */
/* Uppgift 5 Projekt */
/* 2024-08-09 */

// Import modules that we need
import { randomize } from './helpers.js';
import { printNoResults, printResults } from './printResults.js';

// Create constants for the type of dish and cooking time dropdown elements since we will use them in multiple methods
const TYPE_OF_DISH_ELEM = document.getElementById('type-of-dish');
const COOKING_TIME_ELEM = document.getElementById('cooking-time');

// Create new class and export the class as default since we will only have one class in this module that we use in other modules
export default class UIHandler {
    populateFilters(data) { // This method will populate the filtering dropdowns/checkboxes
        const typesOfDish = new Set(); // Create a new Set object to store the types of dishes. We use Set to avoid duplicates, since we only want to show each type of dish once.
        const cookingTimes = new Set(); // Create a new Set object to store the different cooking times. We use Set here too to avoid any duplicates, since we only want to show each available cooking time one time.

        // Loop through each recipe that we found in the data object
        Object.values(data).forEach(recipe => { // Use Object.values to get the values of the data (to get the recipes)
            typesOfDish.add(recipe.type); // Add the type of the current dish to our typesOfDish Set
            cookingTimes.add(recipe.time); // Add the cooking time of the current recipe to our cookingTimes Set
        });

        // Loop through each type of dish and cooking time and create an option element in the HTML for each value
        typesOfDish.forEach(type => {
            const option = document.createElement('option'); // Create an option element in the HTML
            option.value = type; // Set the value of the option element to type of dish
            option.textContent = type; // Set the text content of the option element to the type of dish
            TYPE_OF_DISH_ELEM.appendChild(option); // Add the option element to the type of dish dropdown select element
        });

        // Now loop through each cooking time too and create an option element for each one
        cookingTimes.forEach(time => {
            const option = document.createElement('option');
            option.value = time; // Set the value of the option element to cooking time
            option.textContent = time; // Set the text content of the option element to the cooking time
            COOKING_TIME_ELEM.appendChild(option); // Add the option element to the cooking time dropdown select element
        });
    }

    // Create the searchAndFilter method and pass the data as an argument
    searchAndFilter(data) {
        const query = document.getElementById('search').value.toLowerCase(); // Get the value of the search input field and convert it to lowercase in case user searches with uppercase letters
        const typeOfDish = TYPE_OF_DISH_ELEM.value; // Get the value of the type of dish dropdown
        const cookingTime = COOKING_TIME_ELEM.value; // Get the value of the cooking time dropdown
        const vegetarian = document.getElementById('vegetarian').checked; // Get the value of the vegetarian checkbox (true or false depending on if it is checked)
        const vegan = document.getElementById('vegan').checked; // Get the value of the vegan checkbox (true or false depending on if it is checked)

        // Filter the recipes based on the search query, type of dish, cooking time, vegetarian and vegan checkboxes
        const filteredRecipes = Object.values(data).filter(recipe => // Use Object.values to get the values of the data object (the recipes) and filter them based on the following conditions:
            (recipe.name.toLowerCase().includes(query)) && // If the recipe name includes the search query
            (typeOfDish === '' || recipe.type === typeOfDish) && // If the type of dish is empty OR the recipe type is the same as the type of dish
            (cookingTime === '' || recipe.time === cookingTime) && // If the cooking time is empty OR the recipe cooking time is the same as the cooking time
            (!vegetarian || recipe.vegetarian) && // If the vegetarian checkbox is not checked OR the recipe is vegetarian
            (!vegan || recipe.vegan) // If the vegan checkbox is not checked OR the recipe is vegan
        );

        const recipesElement = document.getElementById('recipes'); // Get the recipes element
        recipesElement.innerHTML = ''; // Clear the recipes element from any previous results

        // Check if there are no results
        if (filteredRecipes.length === 0) {
            printNoResults(); // If there are no results, call the printNoResults function
        } else {
            filteredRecipes.forEach(recipe => printResults(recipe, 'show-all-recipes')); // If there are results, loop through each recipe and call the printResults function and pass the recipe and the page type
        }
    }

    // Create the showRandomRecipe method and pass the data as an argument
    showRandomRecipe(data) {
        const recipes = Object.values(data); // Get the values of the data object (the recipes) and store them in the recipes variable
        const recipe = randomize(recipes); // Call the randomize function and pass the recipes to get a random recipe back
        printResults(recipe, 'show-random-recipe'); // Call the printResults function and pass the random recipe and the page type
    }

    // Create the showAllRecipes method and pass the data as
    showAllRecipes(data) {
        const recipes = Object.values(data); // Get the values of the data object (the recipes) and store them in the recipes variable
        recipes.forEach(recipe => printResults(recipe, 'show-all-recipes')); // Loop through each recipe and call the printResults function and pass the recipe and the page type
    }

    // Create the printYear method 
    printYear() {
        const year = new Date().getFullYear(); // Get the current year
        document.querySelector('#current-year').textContent = year; // Get the current year element and set the text content to the current year (for the footer)
    }
}
