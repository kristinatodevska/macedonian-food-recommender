/* MODULE FOR HANDLING DATA FROM API REQUEST RESPONSE */
/* Kristina Todevska */
/* Uppgift 5 Projekt */
/* 2024-08-09 */

// Create new class and export the class as default since we will only have one class in this module that we use in other modules
export default class DataHandler {
    // Create the method to fetch data from the API
    // We use async so to optimize the performance of the app and only move on in the metod when the fetch is completed
    async fetchData() {
        try {
            const response = await fetch('https://kristinatodevska.github.io/macedonian-food-api/assets/data/food.json'); // Fetch the data from the external API and assign it to the response variable. We use await so the fetch is completed before moving on
            const data = await response.json(); // Parse the data as JSON and assign it to the data variable (we use await so it's completed before moving on)
            return data; // Return the data so it can be used in other parts of the app (the promise is resolved)
        } catch (error) { // Catch any errors that occur during the fetch
            console.error('Sorry, there was an error fetching your recipe! :( ', error); // Log the error to the console (the promise is rejected)
        }
    }
}