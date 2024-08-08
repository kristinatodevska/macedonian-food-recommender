/* INITALIZING THE WEB SITE */
/* Kristina Todevska */
/* Uppgift 5 Projekt */
/* 2024-08-09 */

// Import modules that we need
import DataHandler from './dataHandler.js';
import UIHandler from './uiHandler.js';

// Add event listener for when page is loaded and then instantiate the App class
window.addEventListener('load', () => {
    const app = new App();
});

// Create a new class for the app
class App {
    constructor() { // The constructor method will be instantly called when the class is instantiated
        // We use the this keyword to refer to the current instance of the app
        this.dataHandler = new DataHandler(); // Create a new instance of the DataHandler class which will be used to fetch the data from the API
        this.uiHandler = new UIHandler(); // Create a new instance of the UIHandler class which will be used to display the datain the user interface (UI)
        
        this.dataHandler.fetchData().then(data => { // Fetch the data and wen the data is fetched, pass it to the then method
            // Then check which page we are on and call the appropriate method::
            if (document.querySelector('.show-all-recipes')) { // If we are on the Find Recipe page (which has the class "show-all-recipes"):
                this.uiHandler.showAllRecipes(data); // Call method to show all recipes on load and pass the data
                this.uiHandler.populateFilters(data); // Call the method to populate the filtering dropdowns/checkboxes and pass the data
                this.setupEventListeners(data); // Call the method for adding appropriate listeners for this page and pass the data
            } else if (document.querySelector('.show-random-recipe')) {
                this.uiHandler.showRandomRecipe(data); // Call the  method to display a random recipe and pass the data
            }

        this.uiHandler.printYear(); // Call the method to print the current year in the footer
        });
    }

    setupEventListeners(data) {
        // Add event listeners to the search input field and the filter dropdowns and checkboxes
        // When the input/dopdown/checkbox values change, call the searchAndFilter method and pass the data
        document.getElementById('search').addEventListener('input', () => this.uiHandler.searchAndFilter(data));
        document.getElementById('type-of-dish').addEventListener('change', () => this.uiHandler.searchAndFilter(data));
        document.getElementById('cooking-time').addEventListener('change', () => this.uiHandler.searchAndFilter(data));
        document.getElementById('vegetarian').addEventListener('change', () => this.uiHandler.searchAndFilter(data));
        document.getElementById('vegan').addEventListener('change', () => this.uiHandler.searchAndFilter(data));
    }
}
