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
  
  // Loop through array of keys that will add icon on map
  // Note that if using "keyArr" rather than "Object.keys(disasType)" the last 3 keys will be removed from "keyArr"
  Object.keys(disasType).splice(-4).forEach((key) => {
    // Icon attribution: https://www.onlinewebfonts.com/; https://imgbin.com/
    // Define each icon
    disasType[key]["icon"] = L.icon({
      iconUrl: `static/image/${key}.png`,
      iconSize: [20, 20]
    });
  });

  // Start reading data
  data.forEach((d) => {
    
    // .......... DATA USED FOR DECADES .......... //
    // Take the tens figure of d.YEAR (apart from 1900) for case selection
    let yearCal = Math.trunc((d.YEAR - 1900) / 10);
    // Determine which decade array the data should be append to
    // Note that keys of decades starts from index = 0 in "keyArr"
    disasType[keyArr[yearCal]]["dataArr"].push(d);

    // Check if "d" is not in "2010s"
    if (yearCal !== 11) {
      // Create new circle marker on the map
      disasType[keyArr[yearCal]]["markers"].push(
        L.circleMarker(d.LOCATION, {fillOpacity: 0.75, color: disasType[keyArr[yearCal]]["color"], stroke: true, weight: .8, radius: 5})
          .bindPopup(`<p class="popup-size"><b>Year:</b> ${d.YEAR}<br>
            <b>Total Damage/MMUSD:</b> ${d.TOTAL_DAMAGE_MILLIONS_DOLLARS}<br>
            <b>Total Deaths:</b> ${d.TOTAL_DEATHS}<br>
            <b>Total Injuries:</b> ${d.TOTAL_INJURIES}<br>
            <b>Houses Affected:</b> ${d.HOUSES_AFFECTED}</p>`        
      ));
      // "d" is in "2010s" 
    } else {
      // Create new icon on the map
      disasType["2010s"]["markers"].push(
        L.marker(d.LOCATION, {icon: disasType["2010s"]["icon"]})
          .bindPopup(`<p class="popup-size"><b>Year:</b> ${d.YEAR}<br>
            <b>Total Damage/MMUSD:</b> ${d.TOTAL_DAMAGE_MILLIONS_DOLLARS}<br>
            <b>Total Deaths:</b> ${d.TOTAL_DEATHS}<br>
            <b>Total Injuries:</b> ${d.TOTAL_INJURIES}<br>
            <b>Houses Affected:</b> ${d.HOUSES_AFFECTED}</p>`
      ));      
    }

    // .......... DATA USED FOR DISASTER TYPES .......... //
    // Disaster type of iterated data
    let dKey = d.DISASTER_TYPE;
    // Append data to corresponding key array for disaster type
    disasType[dKey]["dataArr"].push(d);

    // Create new icon on the map
    disasType[dKey]["markers"].push(
      L.marker(d.LOCATION, {icon: disasType[dKey]["icon"]})
        .bindPopup(`<p class="popup-size"><b>Year:</b> ${d.YEAR}<br>
          <b>Total Damage/MMUSD:</b> ${d.TOTAL_DAMAGE_MILLIONS_DOLLARS}<br>
          <b>Total Deaths:</b> ${d.TOTAL_DEATHS}<br>
          <b>Total Injuries:</b> ${d.TOTAL_INJURIES}<br>
          <b>Houses Affected:</b> ${d.HOUSES_AFFECTED}</p>`
    ));

  }); // End reading data

  // Loop through "keyArr"
  keyArr.forEach((key) => {
    // Define layer on the map
    disasType[key]["layer"] = L.layerGroup(disasType[key]["markers"]);
  });
 
  // Array for basemaps
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