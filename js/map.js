// Wait until your documnet is ready
$(function() {
    var moreKilled = new L.LayerGroup();
    var moreInjured = new L.LayerGroup();
    
    // Function to draw your map
    var drawMap = function() {

        // Create map and set view
        var map = L.map('map-container').setView([37.038, -99.097], 4);

        // Create a tile layer variable using the appropriate url
        L.tileLayer('https://api.mapbox.com/styles/v1/huangjoyce3/ciugp02oj00a42ho85xb0gj0y/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVhbmdqb3ljZTMiLCJhIjoiY2l1Z296NXkzMDB5YjJvbXpkNHIxejE3MyJ9.bKPBvmRZBKrpAVP9tEAL9A',
         { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add the layer to your map


        // Execute your function to get data
        getData(map);
    };
    
    // Function for getting data
    var getData = function(map) {

        // Execute an AJAX request to get the data in data/data.csv file
        $.get('data/data.csv', function(data, error){
        // Use the PapaParse library to parse the information returned by your request
            var data = Papa.parse(data, {
                header:true

            }).data; 

           customBuild(map, data);
        });

        // When your request is successful, call your customBuild function
    };

    // Loop through your data and add the appropriate layers and points
    var customBuild = function(map, data) {

        //layer groups
        // Be sure to add each layer to the map
        data.map(function(d){
            //set radius of marker
            var r = 10;
            if(d.killed > 10 || d.injured > 10){
                r = 20;
            }
            if(d.killed > 15 || d.injured > 15){
                r = 25;
            }
            if(d.killed > 20 || d.injured > 20){
                r = 30;
            }
            if(d.killed > 40 || d.injured > 40){
                r = 50;
            }
            if(d.killed > 100 || d.injured > 100){
                r = 100;
            }
            if(parseInt(d.killed) > parseInt(d.injured)){
                
                 markerRed = L.circleMarker([d.lat, d.lng], {
                        color: 'red',
                        fillOpacity: 0,
                        weight: 1,
                        radius: r
                    }).bindPopup('There were ' + '<span id=red>' + d.killed + '</span>' + " killed and " + '<b>' + d.injured + '</b>'
                        + " injured in " + d.city + ", " + d.state);
                    moreKilled.addLayer(markerRed);
            }else{
                marker = L.circleMarker([d.lat, d.lng], {
                        color: 'black',
                        fillOpacity: 0,
                        weight: 1,
                        radius: r 
                    }).bindPopup('There were ' + '<b>' + d.injured + '</b>' + " injured and " + '<span id=red>' + d.killed + '</span>' 
                        + " killed in " + d.city + ", " + d.state);
                    moreInjured.addLayer(marker);
            }

        });

        // Once layers are on the map, add a leaflet controller that shows/hides layers
        var overlayMaps = {
            "More Injured": moreInjured,
            "More Killed": moreKilled
        };

        L.control.layers(null, overlayMaps).addTo(map);
        
        // Build a table showing calculated aggregate values

        var table = $('<table>');
        table.addClass('striped');

        Object.keys(data[0]).forEach(function(d){
            if(d == 'state' || d == 'killed' || d == 'injured'){
            var th = $('<th>' + d.charAt(0).toUpperCase() + d.slice(1) + '</th>');
        }
            table.append(th);
        });

        //finds unique states
        var states = [];
        var numInjured = [];
        data.map(function(d){
            if(!states.includes(d.state)){
                states.push(d.state);
            }            
        });   

        states.forEach(function(d){
            var tr = $('<tr>');
            tr.append($('<td>' + d +'</td>'));

            table.append(tr);

            //sums up injured
            var sumInjured = 0;
            for(var i = 0; i < data.length; i++){
                if(data[i].state == d){
                    sumInjured = sumInjured + parseInt(data[i].injured);
                }
            }
            tr.append($('<td>' + sumInjured + '</td>'));

            //sums up killed
            var sumKilled = 0;
            for(var i = 0; i < data.length; i++){
                if(data[i].state == d){
                    sumKilled = sumKilled + parseInt(data[i].killed);
                }
            }
            tr.append($('<td>' + sumKilled + '</td>'));
        });

        $('.striped').append(table);
    };

    // Execute your drawMap function
    drawMap();
});
