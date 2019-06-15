var myMap = L.map('map').setView([48.10, -100.10], 3);

L.esri.tiledMapLayer({
  url: "https://tiles.arcgis.com/tiles/C8EMgrsFcRFL6LrL/arcgis/rest/services/GEBCO_2019_basemap_ncei/MapServer?f=pjson&cacheKey=b92695a3fb65e691",
  maxZoom: 15
  }).addTo(myMap);



//
// // Define basemaps layers: street, dark, satellite
//   const streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.streets",
//     accessToken: API_KEY
//   });
//
//   const darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.dark",
//     accessToken: API_KEY
//   });
//
//   const satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.satellite",
//     accessToken: API_KEY
//   });
//
//   const gebco = L.esri.tiledMapLayer({
//     url: "https://tiles.arcgis.com/tiles/C8EMgrsFcRFL6LrL/arcgis/rest/services/GEBCO_2019_basemap_ncei/MapServer/0",
//   });
//
//   // Define a baseMaps object to hold our base layers
//   const baseMaps = {
//     "Street Map": streetmap,
//     "Dark Map": darkmap,
//     "Satellite Map": satellitemap,
//     "NOAA Map": gebco
//   };
//
//     // Create overlay object to hold our overlay layer
//     // const overlayMaps = {
//     //   Earthquakes: earthquakes,
//     //   Plates: plates
//     // };
//     // Create our map, giving it the streetmap, darkmap, satellite, earthquakes and plates layers to display on load
//   const myMap = L.map("map", {
//     center: [48.10, -100.10],
//     zoom: 3,
//     layers: [gebco, streetmap, darkmap, satellitemap]
//   });
