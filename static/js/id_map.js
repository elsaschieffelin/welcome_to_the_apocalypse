// Reading and filtering data
d3.json("/data_map").then((data) => {

  // Object to hold disasters divided either by types or by decades from 1900 to 2017
  let disasType = {
    "1900s": {"markers": [], "dataArr": [], "color": "#FFB6C1", "legendName": "the1900s"}, 
    "1910s": {"markers": [], "dataArr": [], "color": "#00FA9A", "legendName": "the1910s"},
    "1920s": {"markers": [], "dataArr": [], "color": "#90EE90", "legendName": "the1920s"}, 
    "1930s": {"markers": [], "dataArr": [], "color": "#FFA07A", "legendName": "the1930s"},
    "1940s": {"markers": [], "dataArr": [], "color": "#FF00FF", "legendName": "the1940s"}, 
    "1950s": {"markers": [], "dataArr": [], "color": "#DDA0DD", "legendName": "the1950s"},
    "1960s": {"markers": [], "dataArr": [], "color": "#D2691E", "legendName": "the1960s"}, 
    "1970s": {"markers": [], "dataArr": [], "color": "#7FFF00", "legendName": "the1970s"},
    "1980s": {"markers": [], "dataArr": [], "color": "#4169E1", "legendName": "the1980s"}, 
    "1990s": {"markers": [], "dataArr": [], "color": "#FF4500", "legendName": "the1990s"},
    "2000s": {"markers": [], "dataArr": [], "color": "#FFFF00", "legendName": "the2000s"}, 
    "2010s": {"markers": [], "dataArr": [], "legendName": "the2010s"}, 
    "tsunami": {"markers": [], "dataArr": [], "legendName": "Tsunamis"}, 
    "volcano": {"markers": [], "dataArr": [], "legendName": "Volcanoes"}, 
    "earthquake": {"markers": [], "dataArr": [], "legendName": "Earthquakes"}
  };
  
  // Array for keys in "disasType"
  let keyArr = Object.keys(disasType);  
  
  // Loop through "data"
  data.forEach((d) => {
    
    // Take the tens figure of d.YEAR (apart from 1900) for case selection
    let yearCal = Math.trunc((d.YEAR - 1900) / 10);
    // Determine which decade array the data should be append to
    // Note that keys of decades starts from index = 0 in "keyArr"
    disasType[keyArr[yearCal]]["dataArr"].push(d);
    
    // Disaster type of iterated data
    let dKey = d.DISASTER_TYPE;
    // Append data to corresponding key array if its type is in "iconKeyArr"
    disasType[dKey]["dataArr"].push(d);

  });
    
  // Array for keys of specific disaster types (4 keys)
  // Note that if using "keyArr" the last 3 keys will be removed from "keyArr"
  let iconKeyArr = Object.keys(disasType).splice(-4);
  
  // Loop through "iconKeyArr"
  iconKeyArr.forEach((key) => {

    // Icon attribution: https://www.onlinewebfonts.com/; https://imgbin.com/
    // Define each icon
    disasType[key]["icon"] = L.icon({
      iconUrl: `static/image/${key}.png`,
      iconSize: [20, 20]
    }); 

    // Read through each data for key from "iconKeyArr"
    disasType[key]["dataArr"].forEach((d) => {
      // Create icons on the map
      disasType[key]["markers"].push(
        L.marker(d.LOCATION, {icon: disasType[key]["icon"]})
          .bindPopup(`<p class="popup-size"><b>Year:</b> ${d.YEAR}<br>
            <b>Total Damage/MMUSD:</b> ${d.TOTAL_DAMAGE_MILLIONS_DOLLARS}<br>
            <b>Total Deaths:</b> ${d.TOTAL_DEATHS}<br>
            <b>Total Injuries:</b> ${d.TOTAL_INJURIES}<br>
            <b>Houses Affected:</b> ${d.HOUSES_AFFECTED}</p>`
      ));
    });
    // Define layer on the map
    disasType[key]["layer"] = L.layerGroup(disasType[key]["markers"]);

  });  
  
  // Array for decades keys (without "2010s") when plotting on map
  let decadeKeyArr = Object.keys(disasType).splice(0, keyArr.length - 4);
  
  // Read through each data for key from "decadeKeyArr"
  decadeKeyArr.forEach((key) => {
    
    disasType[key]["dataArr"].forEach((d) => {
      // Create new markers on the map
      disasType[key]["markers"].push(
        L.circleMarker(d.LOCATION, {fillOpacity: 0.75, color: disasType[key]["color"], stroke: true, weight: .8, radius: 5})
          .bindPopup(`<p class="popup-size"><b>Year:</b> ${d.YEAR}<br>
            <b>Total Damage/MMUSD:</b> ${d.TOTAL_DAMAGE_MILLIONS_DOLLARS}<br>
            <b>Total Deaths:</b> ${d.TOTAL_DEATHS}<br>
            <b>Total Injuries:</b> ${d.TOTAL_INJURIES}<br>
            <b>Houses Affected:</b> ${d.HOUSES_AFFECTED}</p>`        
      ));      
    });
    // Define layer on the map
    disasType[key]["layer"] = L.layerGroup(disasType[key]["markers"]);

  });

  // Object to hold disasters divided either by types or by decades from 1900 to 2017
  let basemapArr = [
    {"type": {}, "id": "mapbox.streets"}, {"type": {}, "id": "mapbox.dark"}, 
  ];

  // Define tile layers for basemap
  basemapArr.forEach((ele) => {
    ele["type"] = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: ele["id"],
      accessToken: API_KEY
      });
  });

  // Define tile layer (ESRI) for basemap
  const gebco_color = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/C8EMgrsFcRFL6LrL/arcgis/rest/services/GEBCO_2019_basemap_ncei/MapServer?f=pjson&cacheKey=b92695a3fb65e691", 
    maxZoom: 15
  });
  
  // Define a baseMaps object to hold our base layers
  const baseMaps = {
    Street: basemapArr[0]["type"],
    Dark: basemapArr[1]["type"],
    NOAAcolor: gebco_color,
  };
  
  // Object to hold overlay layers
  let overlayMaps = {};

  // Loop through "keyArr"
  keyArr.forEach((key) => {
    // Define overlay layers for each key
    overlayMaps[disasType[key]["legendName"]] = disasType[key]["layer"];
  });      
  
  // Create Leaflet map
  let myMap = L.map("map", {
    center: [10.10, -5.50],
    zoom: 2,
    layers: [gebco_color]
  });
  
  //Add basemap layers
  L.control.layers(baseMaps, overlayMaps, {collapsed: false} ).addTo(myMap);
  
}); //end map