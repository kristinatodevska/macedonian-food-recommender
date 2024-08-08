/* MODULE FOR HELPER/UTILITY FUNCTIONS */
/* Kristina Todevska */
/* Uppgift 5 Projekt */
/* 2024-08-09 */

// Export the function that will randomize the recipes so we can use it in other modules
export function randomize(recipes) { 
    const value = Math.random() * recipes.length; // Get a random number between 0 with Math.random and multiply with the length of the recipes array that was passed
    const random = recipes[~~value]; // Get the recipe at the index of the random number via the double tilde bitwise NOT operator which returns the integer part of the passed value if it is a number
    return random; // Return the random recipe
}