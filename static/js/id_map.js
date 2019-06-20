// Reading and filtering data
d3.json("/data").then((data) => {
    eq_filt = data.filter(function (a) { return a.DISASTER_TYPE === 'earthquake'; });
    vol_filt = data.filter(function (a) { return a.DISASTER_TYPE === 'volcano'; });
    tsu_filt = data.filter(function (a) { return a.DISASTER_TYPE === 'tsunami'; });
    console.log(eq_filt, vol_filt, tsu_filt);
    //Define icons

    var tsunamiIcon = L.icon({
        iconUrl: 'static/image/tsunami.png',
        iconSize: [20,20]

    });

    var volcanoIcon = L.icon({
        iconUrl: 'static/image/volcano.png',
        iconSize: [20,20]

    });

    var earthquakeIcon = L.icon({
        iconUrl: 'static/image/earthquake.png',
        iconSize: [20,20]

    });

    // Define earthquake layer
    // An array which will be used to store created eqmarkers
    var eqMarkers = [];

    for (var i = 0; i < eq_filt.length; i++) {
      // loop through the earthquakes array and create new marker
      eqMarkers.push(
      L.marker(eq_filt[i].LOCATION, {icon: earthquakeIcon}).bindPopup("<p>" + "Year: "+ eq_filt[i].YEAR + "</p>"+ "<p>" + "Total Damage $MMUSD" + eq_filt[i].TOTAL_DAMAGE_MILLIONS_DOLLARS + "</p>" + "<p>" + "Total Deaths: " + eq_filt[i].TOTAL_DEATHS + "</p>" + "<p>" + "Total Injuries: " + eq_filt[i].TOTAL_INJURIES + "</p>" +  "<p>" + "Houses Affected: " + eq_filt[i].HOUSES_AFFECTED + "</p>"));
      }
    const earthquakeLayer = L.layerGroup(eqMarkers);

    //Define volcano layer
    var volMarkers = [];

    for (var i = 0; i < vol_filt.length; i++) {
      // loop through the earthquakes array and create new marker
      volMarkers.push
      (L.marker(vol_filt[i].LOCATION, {icon: volcanoIcon}).bindPopup("<p>" + "Year: "+ vol_filt[i].YEAR + "</p>"+ "<p>" + "Total Damage $MMUSD" + vol_filt[i].TOTAL_DAMAGE_MILLIONS_DOLLARS + "</p>" + "<p>" + "Total Deaths: " + vol_filt[i].TOTAL_DEATHS + "</p>" + "<p>" + "Total Injuries: " + vol_filt[i].TOTAL_INJURIES + "</p>" +  "<p>" + "Houses Affected: " + vol_filt[i].HOUSES_AFFECTED + "</p>"));
      }
    const volcanoLayer = L.layerGroup(volMarkers);


    //Define tsunami layer
    var tsuMarkers = [];

    for (var i = 0; i < tsu_filt.length; i++) {
      // loop through the earthquakes array and create new marker
      tsuMarkers.push(
      L.marker(tsu_filt[i].LOCATION, {icon: tsunamiIcon}).bindPopup("<p>" + "Year: "+ tsu_filt[i].YEAR + "</p>"+ "<p>" + "Total Damage $MMUSD" + tsu_filt[i].TOTAL_DAMAGE_MILLIONS_DOLLARS + "</p>" + "<p>" + "Total Deaths: " + tsu_filt[i].TOTAL_DEATHS + "</p>" + "<p>" + "Total Injuries: " + tsu_filt[i].TOTAL_INJURIES + "</p>" +  "<p>" + "Houses Affected: " + tsu_filt[i].HOUSES_AFFECTED + "</p>"));
      }
    const tsunamiLayer = L.layerGroup(tsuMarkers);

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

    // Create overlay object to hold our overlay layer
    const overlayMaps = {
      Earthquakes: earthquakeLayer,
      Volcanoes: volcanoLayer,
      Tsunamis: tsunamiLayer
    };

    // Create Leaflet map
    let myMap = L.map("map", {
      center: [48.10, -100.10],
      zoom: 2,
      layers: [gebco_color]
    });

    //Add basemap layers
    L.control.layers(baseMaps, overlayMaps, {collapsed:false} ).addTo(myMap);

  }); //end map
