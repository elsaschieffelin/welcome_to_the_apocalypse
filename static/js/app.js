// Reading data
d3.csv("/data").then((data) => {
  console.log(data);
});

// ************************* MAP CODE **************************************************
// Define tile layers for basemap
const streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
  });

const darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});

const gebco_color = L.esri.tiledMapLayer({url: "https://tiles.arcgis.com/tiles/C8EMgrsFcRFL6LrL/arcgis/rest/services/GEBCO_2019_basemap_ncei/MapServer?f=pjson&cacheKey=b92695a3fb65e691", maxZoom: 15
});

const gebco_greyscale = L.esri.tiledMapLayer({url: "https://tiles.arcgis.com/tiles/C8EMgrsFcRFL6LrL/arcgis/rest/services/GEBCO_2019_grayscale_basemap_ncei/MapServer?f=pjson&cacheKey=aa7b7421bc725fd9", maxZoom: 15
});

// Define a baseMaps object to hold our base layers
const baseMaps = {
  Street: streetmap,
  Dark: darkmap,
  NOAAcolor: gebco_color,
  NOAAgrey: gebco_greyscale
};

// Create Leaflet map
let myMap = L.map("map", {
  center: [48.10, -100.10],
  zoom: 3,
  layers: [gebco_color]
});

//Add basemap layers
L.control.layers(baseMaps, null, {collapsed:false} ).addTo(myMap);

// Define overlay groups
const earthquake_layer = new L.LayerGroup();
const volcano_layer = new L.LayerGroup();
const tsunami_layer = new L.LayerGroup();




// Retrieve key for selected map
d3.select('section')
  .selectAll('label')
  .on("change", function() {
    
    console.log(this);
    // Key for selected map
    let selText = d3.select(this)
      .select('span')
      .text();
    console.log(selText);    
    
  });

  // Event listener to change height and weight of death chart
  d3.select("#chart-death")
    .on("mouseover", function() {

      d3.select(this)
        .attr("class", "col-12 chart-selected");
      
      // More lines of codes here <-- //

    }),

    on("mouseout", function() {

      d3.select(this)
        .attr("class", "col-4");

      // More lines of codes here <-- //        

    });

  // Event listener to change height and weight of house loss chart
  d3.select("#chart-death")
  .on("mouseover", function() {

  }),

  on("mouseout", function() {
      
  });




// var picnic_parks = L.geoJson(myJson, {filter: picnicFilter}).addTo(map);
//
// function picnicFilter(feature) {
//   if (feature.properties.Picnic === "Yes") return true
// }

// Perform a GET request to the query URL
// Once we get a response, send the data.features object to the createFeatures function
// d3.json(queryUrl, function(response) {
//
//
//   // const earthquake_data = L.marker({filter: eqFilter});
//   //
//   // function eqFilter(response) {
//   //   if (response.DISASTER_TYPE === "earthquake") return true
//   // }
//   //
//   // // Create a new marker cluster group
//   // // Loop through data
//   // Loop through data
//   for (var i = 0; i < response.length; i++) {
//     console.log(response)}
//   });

  //   // Set the lat longs to a variable
  //   var lat = response[i].LATITUDE;
  //   var lon = response[i].LONGITUDE;
  //   // Add a new marker to the cluster group and bind a pop-up
  //     markers.addLayer(L.marker(lat, lon)
  //       .bindPopup(response[i].DISASTER_TYPE));
  //
  // }

  // Add our marker cluster layer to the map
//   myMap.addLayer(markers);
//
// });
//
// function createFeatures(earthquakeData) {
// // filter earthquake data
//   function eqFilter(feature) {
//   if (feature.DISASTER_TYPE === "earthquake") return true
//   }
// // Give each earthquake a popup describing the year, deaths, injuries, and damages
//   function onEachFeature(feature, layer) {
//     layer.bindPopup("<h5>" + "Year: " + feature.YEAR + "</h5><hr>" + "<p>" + "Total Deaths: " + feature.TOTAL_DEATH + "</p>" + "<p>" + "Total Injuries: " + feature.TOTAL_INJURIES + "</p>" + "<p>" + "Damage ($MM USD: " + feature.TOTAL_DAMAGE_MILLIONS_DOLLARS + "</p>")
//     .addTo(earthquakes);
//     };
//     // Create a GeoJSON layer to display circle markers
//     L.geoJSON(earthquakeData, {
//       filter: eqFilter,
//       onEachFeature: onEachFeature,
//       pointToLayer: (function (feature, LATITUDE, LONGITUDE) {
//         return L.circleMarker(latlng, {
//           fillOpacity: 0.75,
//           color: "#000",
//           stroke: true,
//           weight: .8,
//           fillColor: orange;
//           radius: 5px;
//         })
//       })
//     })
//     .addTo(earthquakes);
//     // Sending our earthquakes layer to the createMap function
//     createMap(earthquakes);
// }
