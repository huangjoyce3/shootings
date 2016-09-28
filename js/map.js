// Wait until your documnet is ready
$(function() {
    // Function to draw your map
    var drawMap = function() {

        // Create map and set view


        // Create a tile layer variable using the appropriate url


        // Add the layer to your map


        // Execute your function to get data

    };

    // Function for getting data
    var getData = function() {

        // Execute an AJAX request to get the data in data/data.csv file

        // Use the PapaParse library to parse the information returned by your request

        // When your request is successful, call your customBuild function

    };

    // Loop through your data and add the appropriate layers and points
    var customBuild = function() {
        // Be sure to add each layer to the map

        // Once layers are on the map, add a leaflet controller that shows/hides layers

        // Build a table showing calculated aggregate values

    };

    // Execute your drawMap function
    drawMap();
});
