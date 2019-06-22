// Reading and filtering data
d3.json("/data").then((data) => {
    eq_filt = data.filter(function (a) { return a.DISASTER_TYPE === 'earthquake'; });
    vol_filt = data.filter(function (a) { return a.DISASTER_TYPE === 'volcano'; });
    tsu_filt = data.filter(function (a) { return a.DISASTER_TYPE === 'tsunami'; });
    all_dis_1900_filt = data.filter(function (a) { return a.YEAR >= 1900 && a.YEAR <1910; });
    all_dis_1910_filt = data.filter(function (a) { return a.YEAR >= 1910 && a.YEAR <1920; });
    all_dis_1920_filt = data.filter(function (a) { return a.YEAR >= 1920 && a.YEAR <1930; });
    all_dis_1930_filt = data.filter(function (a) { return a.YEAR >= 1930 && a.YEAR <1940; });
    all_dis_1940_filt = data.filter(function (a) { return a.YEAR >= 1940 && a.YEAR <1950; });
    all_dis_1950_filt = data.filter(function (a) { return a.YEAR >= 1950 && a.YEAR <1960; });
    all_dis_1960_filt = data.filter(function (a) { return a.YEAR >= 1960 && a.YEAR <1970; });
    all_dis_1970_filt = data.filter(function (a) { return a.YEAR >= 1970 && a.YEAR <1980; });
    all_dis_1980_filt = data.filter(function (a) { return a.YEAR >= 1980 && a.YEAR <1990; });
    all_dis_1990_filt = data.filter(function (a) { return a.YEAR >= 1990 && a.YEAR <2000; });
    all_dis_2000_filt = data.filter(function (a) { return a.YEAR >= 2000 && a.YEAR <2010; });
    all_dis_2010_filt = data.filter(function (a) { return a.YEAR >= 2010 && a.YEAR <=2019; });

    // console.log(all_dis_1900_filt, all_dis_2000_filt);
    //console.log(tens_filt);
    //Define icons
    // Icon attribution: https://www.onlinewebfonts.com/; https://imgbin.com/


    var anarchyIcon = L.icon({
        iconUrl: 'static/image/anarchy.png',
        iconSize: [20,20]

    });
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

    //Years
    // console.log(typeof(eq_filt));
    // Object.entries(eq_filt).forEach((entry) => {
    // ot_filt = eq_filt.filter(function(a) {return a.YEAR >= 1900 && a.YEAR <1910});
    // tens_filt = eq_filt.filter(function(a) {return a.YEAR >= 1910 && a.YEAR <1920});
    // twenties_filt = eq_filt.filter(function(a) {return a.YEAR >= 1920 && a.YEAR <1930});
    // thirties_filt = eq_filt.filter(function(a) {return a.YEAR >= 1930 && a.YEAR <1940});
    // forties_filt = eq_filt.filter(function(a) {return a.YEAR >= 1940 && a.YEAR <1950});
    // fifties_filt = eq_filt.filter(function(a) {return a.YEAR >= 1950 && a.YEAR <1960});
    // sixties_filt = eq_filt.filter(function(a) {return a.YEAR >= 1960 && a.YEAR <1970});
    // seventies_filt = eq_filt.filter(function(a) {return a.YEAR >= 1970 && a.YEAR <1980});
    // eighties_filt = eq_filt.filter(function(a) {return a.YEAR >= 1980 && a.YEAR <1990});
    // nineties_filt = eq_filt.filter(function(a) {return a.YEAR >= 1990 && a.YEAR <2000});
    // millennia_filt = eq_filt.filter(function(a) {return a.YEAR >= 2000 && a.YEAR <2010});
    // twoTens_filt= eq_filt.filter(function(a) {return a.YEAR >= 2010 && a.YEAR <=2019});
    // console.log(ot_filt, tens_filt, twenties_filt, thirties_filt, forties_filt, fifties_filt, sixties_filt, seventies_filt, eighties_filt, nineties_filt, millennia_filt, twoTens_filt);
    // });
    //
    // //create decade layer
    // var decMark0 = [];
    // for (var i = 0; i <ot_filt.length; i++) {
    //   decMark0.push(
    //     L.marker(ot_filt[i].LOCATION, {icon:earthquakeIcon}).bindPopup("<p>" + "Year: "+ eq_filt[i].YEAR + "</p>"+ "<p>" + "Total Damage $MMUSD" + ot_filt[i].TOTAL_DAMAGE_MILLIONS_DOLLARS + "</p>" + "<p>" + "Total Deaths: " + ot_filt[i].TOTAL_DEATHS + "</p>" + "<p>" + "Total Injuries: " + ot_filt[i].TOTAL_INJURIES + "</p>" +  "<p>" + "Houses Affected: " + ot_filt[i].HOUSES_AFFECTED + "</p>"));
    // }
    // const decLayer0 = L.layerGroup(decMark0);
    //
    // var decMark1 = [];
    // for (var i = 0; i <tens_filt.length; i++) {
    //   decMark1.push(
    //     L.marker(tens_filt[i].LOCATION, {icon:earthquakeIcon}).bindPopup("<p>" + "Year: "+ tens_filt[i].YEAR + "</p>"+ "<p>" + "Total Damage $MMUSD" + tens_filt[i].TOTAL_DAMAGE_MILLIONS_DOLLARS + "</p>" + "<p>" + "Total Deaths: " + tens_filt[i].TOTAL_DEATHS + "</p>" + "<p>" + "Total Injuries: " + tens_filt[i].TOTAL_INJURIES + "</p>" +  "<p>" + "Houses Affected: " + tens_filt[i].HOUSES_AFFECTED + "</p>"));
    // }
    // const decLayer1 = L.layerGroup(decMark1);
    //
    // var decMark2 = [];
    // for (var i = 0; i <twenties_filt.length; i++) {
    //   decMark2.push(
    //     L.marker(twenties_filt[i].LOCATION, {icon:earthquakeIcon}).bindPopup("<p>" + "Year: "+ twenties_filt[i].YEAR + "</p>"+ "<p>" + "Total Damage $MMUSD" + twenties_filt[i].TOTAL_DAMAGE_MILLIONS_DOLLARS + "</p>" + "<p>" + "Total Deaths: " + twenties_filt[i].TOTAL_DEATHS + "</p>" + "<p>" + "Total Injuries: " + twenties_filt[i].TOTAL_INJURIES + "</p>" +  "<p>" + "Houses Affected: " + twenties_filt[i].HOUSES_AFFECTED + "</p>"));
    // }
    // const decLayer2 = L.layerGroup(decMark2);
    //
    // var decMark3 = [];
    // for (var i = 0; i <thirties_filt.length; i++) {
    //   decMark3.push(
    //     L.marker(thirties_filt[i].LOCATION, {icon:earthquakeIcon}).bindPopup("<p>" + "Year: "+ thirties_filt[i].YEAR + "</p>"+ "<p>" + "Total Damage $MMUSD" + thirties_filt[i].TOTAL_DAMAGE_MILLIONS_DOLLARS + "</p>" + "<p>" + "Total Deaths: " + thirties_filt[i].TOTAL_DEATHS + "</p>" + "<p>" + "Total Injuries: " + thirties_filt[i].TOTAL_INJURIES + "</p>" +  "<p>" + "Houses Affected: " + thirties_filt[i].HOUSES_AFFECTED + "</p>"));
    // }
    // const decLayer3 = L.layerGroup(decMark3);
    //
    // var decMark4 = [];
    // for (var i = 0; i <forties_filt.length; i++) {
    //   decMark4.push(
    //     L.marker(forties_filt[i].LOCATION, {icon:earthquakeIcon}).bindPopup("<p>" + "Year: "+ forties_filt[i].YEAR + "</p>"+ "<p>" + "Total Damage $MMUSD" + forties_filt[i].TOTAL_DAMAGE_MILLIONS_DOLLARS + "</p>" + "<p>" + "Total Deaths: " + forties_filt[i].TOTAL_DEATHS + "</p>" + "<p>" + "Total Injuries: " + forties_filt[i].TOTAL_INJURIES + "</p>" +  "<p>" + "Houses Affected: " + forties_filt[i].HOUSES_AFFECTED + "</p>"));
    // }
    // const decLayer4 = L.layerGroup(decMark4);
    //
    // var decMark5 = [];
    // for (var i = 0; i <fifties_filt.length; i++) {
    //   decMark5.push(
    //     L.marker(fifties_filt[i].LOCATION, {icon:earthquakeIcon}).bindPopup("<p>" + "Year: "+ fifties_filt[i].YEAR + "</p>"+ "<p>" + "Total Damage $MMUSD" + fifties_filt[i].TOTAL_DAMAGE_MILLIONS_DOLLARS + "</p>" + "<p>" + "Total Deaths: " + fifties_filt[i].TOTAL_DEATHS + "</p>" + "<p>" + "Total Injuries: " + fifties_filt[i].TOTAL_INJURIES + "</p>" +  "<p>" + "Houses Affected: " + fifties_filt[i].HOUSES_AFFECTED + "</p>"));
    // }
    // const decLayer5 = L.layerGroup(decMark5);
    //
    // var decMark6 = [];
    // for (var i = 0; i <sixties_filt.length; i++) {
    //   decMark6.push(
    //     L.marker(sixties_filt[i].LOCATION, {icon:earthquakeIcon}).bindPopup("<p>" + "Year: "+ sixties_filt[i].YEAR + "</p>"+ "<p>" + "Total Damage $MMUSD" + sixties_filt[i].TOTAL_DAMAGE_MILLIONS_DOLLARS + "</p>" + "<p>" + "Total Deaths: " + sixties_filt[i].TOTAL_DEATHS + "</p>" + "<p>" + "Total Injuries: " + sixties_filt[i].TOTAL_INJURIES + "</p>" +  "<p>" + "Houses Affected: " + sixties_filt[i].HOUSES_AFFECTED + "</p>"));
    // }
    // const decLayer6 = L.layerGroup(decMark6);
    //
    // var decMark7 = [];
    // for (var i = 0; i <seventies_filt.length; i++) {
    //   decMark7.push(
    //     L.marker(seventies_filt[i].LOCATION, {icon:earthquakeIcon}).bindPopup("<p>" + "Year: "+ seventies_filt[i].YEAR + "</p>"+ "<p>" + "Total Damage $MMUSD" + seventies_filt[i].TOTAL_DAMAGE_MILLIONS_DOLLARS + "</p>" + "<p>" + "Total Deaths: " + seventies_filt[i].TOTAL_DEATHS + "</p>" + "<p>" + "Total Injuries: " + seventies_filt[i].TOTAL_INJURIES + "</p>" +  "<p>" + "Houses Affected: " + seventies_filt[i].HOUSES_AFFECTED + "</p>"));
    // }
    // const decLayer7 = L.layerGroup(decMark7);
    //
    // var decMark8 = [];
    // for (var i = 0; i <eighties_filt.length; i++) {
    //   decMark8.push(
    //     L.marker(eighties_filt[i].LOCATION, {icon:earthquakeIcon}).bindPopup("<p>" + "Year: "+ eighties_filt[i].YEAR + "</p>"+ "<p>" + "Total Damage $MMUSD" + eighties_filt[i].TOTAL_DAMAGE_MILLIONS_DOLLARS + "</p>" + "<p>" + "Total Deaths: " + eighties_filt[i].TOTAL_DEATHS + "</p>" + "<p>" + "Total Injuries: " + eighties_filt[i].TOTAL_INJURIES + "</p>" +  "<p>" + "Houses Affected: " + eighties_filt[i].HOUSES_AFFECTED + "</p>"));
    // }
    // const decLayer8 = L.layerGroup(decMark8);
    //
    // var decMark9 = [];
    // for (var i = 0; i <nineties_filt.length; i++) {
    //   decMark9.push(
    //     L.marker(nineties_filt[i].LOCATION, {icon:earthquakeIcon}).bindPopup("<p>" + "Year: "+ nineties_filt[i].YEAR + "</p>"+ "<p>" + "Total Damage $MMUSD" + nineties_filt[i].TOTAL_DAMAGE_MILLIONS_DOLLARS + "</p>" + "<p>" + "Total Deaths: " + nineties_filt[i].TOTAL_DEATHS + "</p>" + "<p>" + "Total Injuries: " + nineties_filt[i].TOTAL_INJURIES + "</p>" +  "<p>" + "Houses Affected: " + nineties_filt[i].HOUSES_AFFECTED + "</p>"));
    // }
    // const decLayer9 = L.layerGroup(decMark9);
    //
    // var decMark00 = [];
    // for (var i = 0; i <millennia_filt.length; i++) {
    //   decMark00.push(
    //     L.marker(millennia_filt[i].LOCATION, {icon:earthquakeIcon}).bindPopup("<p>" + "Year: "+ millennia_filt[i].YEAR + "</p>"+ "<p>" + "Total Damage $MMUSD" + millennia_filt[i].TOTAL_DAMAGE_MILLIONS_DOLLARS + "</p>" + "<p>" + "Total Deaths: " + millennia_filt[i].TOTAL_DEATHS + "</p>" + "<p>" + "Total Injuries: " + millennia_filt[i].TOTAL_INJURIES + "</p>" +  "<p>" + "Houses Affected: " + millennia_filt[i].HOUSES_AFFECTED + "</p>"));
    // }
    // const decLayer00 = L.layerGroup(decMark00);
    //
    // var decMark10 = [];
    // for (var i = 0; i <twoTens_filt.length; i++) {
    //   decMark10.push(
    //     L.marker(twoTens_filt[i].LOCATION, {icon:earthquakeIcon}).bindPopup("<p>" + "Year: "+ twoTens_filt[i].YEAR + "</p>"+ "<p>" + "Total Damage $MMUSD" + twoTens_filt[i].TOTAL_DAMAGE_MILLIONS_DOLLARS + "</p>" + "<p>" + "Total Deaths: " + twoTens_filt[i].TOTAL_DEATHS + "</p>" + "<p>" + "Total Injuries: " + twoTens_filt[i].TOTAL_INJURIES + "</p>" +  "<p>" + "Houses Affected: " + twoTens_filt[i].HOUSES_AFFECTED + "</p>"));
    // }
    // const decLayer10 = L.layerGroup(decMark10);

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

    //Define 1900 layer
    var nineteenhunMarkers = [];

    for (var i = 0; i < all_dis_1900_filt.length; i++) {
      // loop through the earthquakes array and create new marker
      nineteenhunMarkers.push(
      L.circleMarker(all_dis_1900_filt[i].LOCATION, {fillOpacity: 0.75,color: "#FFB6C1", stroke: true, weight: .8, radius: 5}).bindPopup("<p>" + "Year: "+ all_dis_1900_filt[i].YEAR + "</p>"+ "<p>" + "Total Damage $MMUSD" + all_dis_1900_filt[i].TOTAL_DAMAGE_MILLIONS_DOLLARS + "</p>" + "<p>" + "Total Deaths: " + all_dis_1900_filt[i].TOTAL_DEATHS + "</p>" + "<p>" + "Total Injuries: " + all_dis_1900_filt[i].TOTAL_INJURIES + "</p>" +  "<p>" + "Houses Affected: " + all_dis_1900_filt[i].HOUSES_AFFECTED + "</p>"));
      }
    const nineteenhunLayer = L.layerGroup(nineteenhunMarkers);

    //Define 1910 layer
    var nineteentenMarkers = [];

    for (var i = 0; i < all_dis_1910_filt.length; i++) {
      // loop through the earthquakes array and create new marker
      nineteentenMarkers.push(
      L.circleMarker(all_dis_1910_filt[i].LOCATION, {fillOpacity: 0.75,color: "#00FA9A", stroke: true, weight: .8, radius: 5}).bindPopup("<p>" + "Year: "+ all_dis_1910_filt[i].YEAR + "</p>"+ "<p>" + "Total Damage $MMUSD" + all_dis_1910_filt[i].TOTAL_DAMAGE_MILLIONS_DOLLARS + "</p>" + "<p>" + "Total Deaths: " + all_dis_1910_filt[i].TOTAL_DEATHS + "</p>" + "<p>" + "Total Injuries: " + all_dis_1910_filt[i].TOTAL_INJURIES + "</p>" +  "<p>" + "Houses Affected: " + all_dis_1910_filt[i].HOUSES_AFFECTED + "</p>"));
      }
    const nineteentenLayer = L.layerGroup(nineteentenMarkers);

    //Define 1920 layer
    var nineteentwentyMarkers = [];

    for (var i = 0; i < all_dis_1920_filt.length; i++) {
      // loop through the earthquakes array and create new marker
      nineteentwentyMarkers.push(
      L.circleMarker(all_dis_1920_filt[i].LOCATION, {fillOpacity: 0.75,color: "#90EE90", stroke: true, weight: .8, radius: 5}).bindPopup("<p>" + "Year: "+ all_dis_1920_filt[i].YEAR + "</p>"+ "<p>" + "Total Damage $MMUSD" + all_dis_1920_filt[i].TOTAL_DAMAGE_MILLIONS_DOLLARS + "</p>" + "<p>" + "Total Deaths: " + all_dis_1920_filt[i].TOTAL_DEATHS + "</p>" + "<p>" + "Total Injuries: " + all_dis_1920_filt[i].TOTAL_INJURIES + "</p>" +  "<p>" + "Houses Affected: " + all_dis_1920_filt[i].HOUSES_AFFECTED + "</p>"));
      }
    const nineteentwentyLayer = L.layerGroup(nineteentwentyMarkers);

    //Define 1930 layer
    var nineteenthirtyMarkers = [];

    for (var i = 0; i < all_dis_1930_filt.length; i++) {
      // loop through the earthquakes array and create new marker
      nineteenthirtyMarkers.push(
      L.circleMarker(all_dis_1930_filt[i].LOCATION, {fillOpacity: 0.75,color: "#FFA07A", stroke: true, weight: .8, radius: 5}).bindPopup("<p>" + "Year: "+ all_dis_1930_filt[i].YEAR + "</p>"+ "<p>" + "Total Damage $MMUSD" + all_dis_1930_filt[i].TOTAL_DAMAGE_MILLIONS_DOLLARS + "</p>" + "<p>" + "Total Deaths: " + all_dis_1930_filt[i].TOTAL_DEATHS + "</p>" + "<p>" + "Total Injuries: " + all_dis_1930_filt[i].TOTAL_INJURIES + "</p>" +  "<p>" + "Houses Affected: " + all_dis_1930_filt[i].HOUSES_AFFECTED + "</p>"));
      }
    const nineteenthirtyLayer = L.layerGroup(nineteenthirtyMarkers);

    //Define 1940 layer
    var nineteenfortyMarkers = [];

    for (var i = 0; i < all_dis_1940_filt.length; i++) {
      // loop through the earthquakes array and create new marker
      nineteenfortyMarkers.push(
      L.circleMarker(all_dis_1940_filt[i].LOCATION, {fillOpacity: 0.75,color: "#FF00FF", stroke: true, weight: .8, radius: 5}).bindPopup("<p>" + "Year: "+ all_dis_1940_filt[i].YEAR + "</p>"+ "<p>" + "Total Damage $MMUSD" + all_dis_1940_filt[i].TOTAL_DAMAGE_MILLIONS_DOLLARS + "</p>" + "<p>" + "Total Deaths: " + all_dis_1940_filt[i].TOTAL_DEATHS + "</p>" + "<p>" + "Total Injuries: " + all_dis_1940_filt[i].TOTAL_INJURIES + "</p>" +  "<p>" + "Houses Affected: " + all_dis_1940_filt[i].HOUSES_AFFECTED + "</p>"));
      }
    const nineteenfortyLayer = L.layerGroup(nineteenfortyMarkers);

    //Define 1950 layer
    var nineteenfiftyMarkers = [];

    for (var i = 0; i < all_dis_1950_filt.length; i++) {
      // loop through the earthquakes array and create new marker
      nineteenfiftyMarkers.push(
      L.circleMarker(all_dis_1950_filt[i].LOCATION, {fillOpacity: 0.75,color: "#DDA0DD", stroke: true, weight: .8, radius: 5}).bindPopup("<p>" + "Year: "+ all_dis_1950_filt[i].YEAR + "</p>"+ "<p>" + "Total Damage $MMUSD" + all_dis_1950_filt[i].TOTAL_DAMAGE_MILLIONS_DOLLARS + "</p>" + "<p>" + "Total Deaths: " + all_dis_1950_filt[i].TOTAL_DEATHS + "</p>" + "<p>" + "Total Injuries: " + all_dis_1950_filt[i].TOTAL_INJURIES + "</p>" +  "<p>" + "Houses Affected: " + all_dis_1950_filt[i].HOUSES_AFFECTED + "</p>"));
      }
    const nineteenfiftyLayer = L.layerGroup(nineteenfiftyMarkers);

    //Define 1960 layer
    var nineteensixtyMarkers = [];

    for (var i = 0; i < all_dis_1960_filt.length; i++) {
      // loop through the earthquakes array and create new marker
      nineteensixtyMarkers.push(
      L.circleMarker(all_dis_1960_filt[i].LOCATION, {fillOpacity: 0.75,color: "#D2691E", stroke: true, weight: .8, radius: 5}).bindPopup("<p>" + "Year: "+ all_dis_1960_filt[i].YEAR + "</p>"+ "<p>" + "Total Damage $MMUSD" + all_dis_1960_filt[i].TOTAL_DAMAGE_MILLIONS_DOLLARS + "</p>" + "<p>" + "Total Deaths: " + all_dis_1960_filt[i].TOTAL_DEATHS + "</p>" + "<p>" + "Total Injuries: " + all_dis_1960_filt[i].TOTAL_INJURIES + "</p>" +  "<p>" + "Houses Affected: " + all_dis_1960_filt[i].HOUSES_AFFECTED + "</p>"));
      }
    const nineteensixtyLayer = L.layerGroup(nineteensixtyMarkers);

    //Define 1970 layer
    var nineteenseventyMarkers = [];

    for (var i = 0; i < all_dis_1970_filt.length; i++) {
      // loop through the earthquakes array and create new marker
      nineteenseventyMarkers.push(
      L.circleMarker(all_dis_1970_filt[i].LOCATION, {fillOpacity: 0.75,color: "#7FFF00", stroke: true, weight: .8, radius: 5}).bindPopup("<p>" + "Year: "+ all_dis_1970_filt[i].YEAR + "</p>"+ "<p>" + "Total Damage $MMUSD" + all_dis_1970_filt[i].TOTAL_DAMAGE_MILLIONS_DOLLARS + "</p>" + "<p>" + "Total Deaths: " + all_dis_1970_filt[i].TOTAL_DEATHS + "</p>" + "<p>" + "Total Injuries: " + all_dis_1970_filt[i].TOTAL_INJURIES + "</p>" +  "<p>" + "Houses Affected: " + all_dis_1970_filt[i].HOUSES_AFFECTED + "</p>"));
      }
    const nineteenseventyLayer = L.layerGroup(nineteenseventyMarkers);

    //Define 1980 layer
    var nineteeneightyMarkers = [];

    for (var i = 0; i < all_dis_1980_filt.length; i++) {
      // loop through the earthquakes array and create new marker
      nineteeneightyMarkers.push(
      L.circleMarker(all_dis_1980_filt[i].LOCATION, {fillOpacity: 0.75,color: "#4169E1", stroke: true, weight: .8, radius: 5}).bindPopup("<p>" + "Year: "+ all_dis_1980_filt[i].YEAR + "</p>"+ "<p>" + "Total Damage $MMUSD" + all_dis_1980_filt[i].TOTAL_DAMAGE_MILLIONS_DOLLARS + "</p>" + "<p>" + "Total Deaths: " + all_dis_1980_filt[i].TOTAL_DEATHS + "</p>" + "<p>" + "Total Injuries: " + all_dis_1980_filt[i].TOTAL_INJURIES + "</p>" +  "<p>" + "Houses Affected: " + all_dis_1980_filt[i].HOUSES_AFFECTED + "</p>"));
      }
    const nineteeneightyLayer = L.layerGroup(nineteeneightyMarkers);

    //Define 1990 layer
    var nineteenninetyMarkers = [];

    for (var i = 0; i < all_dis_1990_filt.length; i++) {
      // loop through the earthquakes array and create new marker
      nineteenninetyMarkers.push(
      L.circleMarker(all_dis_1990_filt[i].LOCATION, {fillOpacity: 0.75,color: "#FF4500", stroke: true, weight: .8, radius: 5}).bindPopup("<p>" + "Year: "+ all_dis_1990_filt[i].YEAR + "</p>"+ "<p>" + "Total Damage $MMUSD" + all_dis_1990_filt[i].TOTAL_DAMAGE_MILLIONS_DOLLARS + "</p>" + "<p>" + "Total Deaths: " + all_dis_1990_filt[i].TOTAL_DEATHS + "</p>" + "<p>" + "Total Injuries: " + all_dis_1990_filt[i].TOTAL_INJURIES + "</p>" +  "<p>" + "Houses Affected: " + all_dis_1990_filt[i].HOUSES_AFFECTED + "</p>"));
      }
    const nineteenninetyLayer = L.layerGroup(nineteenninetyMarkers);

    //Define 2000 layer
    var twothouMarkers = [];

    for (var i = 0; i < all_dis_2000_filt.length; i++) {
      // loop through the earthquakes array and create new marker
      twothouMarkers.push(
      L.circleMarker(all_dis_2000_filt[i].LOCATION, {fillOpacity: 0.75,color: "#FFFF00", stroke: true, weight: .8, radius: 5}).bindPopup("<p>" + "Year: "+ all_dis_2000_filt[i].YEAR + "</p>"+ "<p>" + "Total Damage $MMUSD" + all_dis_2000_filt[i].TOTAL_DAMAGE_MILLIONS_DOLLARS + "</p>" + "<p>" + "Total Deaths: " + all_dis_2000_filt[i].TOTAL_DEATHS + "</p>" + "<p>" + "Total Injuries: " + all_dis_2000_filt[i].TOTAL_INJURIES + "</p>" +  "<p>" + "Houses Affected: " + all_dis_2000_filt[i].HOUSES_AFFECTED + "</p>"));
      }
    const twothouLayer = L.layerGroup(twothouMarkers);

    //Define 2010 layer
    var twothoutenMarkers = [];

    for (var i = 0; i < all_dis_2010_filt.length; i++) {
      // loop through the earthquakes array and create new marker
      twothoutenMarkers.push(
      L.marker(all_dis_2010_filt[i].LOCATION, {icon: anarchyIcon}).bindPopup("<p>" + "Year: "+ all_dis_2010_filt[i].YEAR + "</p>"+ "<p>" + "Total Damage $MMUSD" + all_dis_2010_filt[i].TOTAL_DAMAGE_MILLIONS_DOLLARS + "</p>" + "<p>" + "Total Deaths: " + all_dis_2010_filt[i].TOTAL_DEATHS + "</p>" + "<p>" + "Total Injuries: " + all_dis_2010_filt[i].TOTAL_INJURIES + "</p>" +  "<p>" + "Houses Affected: " + all_dis_2010_filt[i].HOUSES_AFFECTED + "</p>"));
      }
    const twothoutenLayer = L.layerGroup(twothoutenMarkers);

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
      // NOAAgrey: gebco_greyscale
    };

    // Create overlay object to hold our overlay layer
    const overlayMaps = {
      Earthquakes: earthquakeLayer,
      Volcanoes: volcanoLayer,
      Tsunamis: tsunamiLayer,
      the1900s: nineteenhunLayer,
      the1910s: nineteentenLayer,
      the1920s: nineteentwentyLayer,
      the1930s: nineteenthirtyLayer,
      the1940s: nineteenfortyLayer,
      the1950s: nineteenfiftyLayer,
      the1960s: nineteensixtyLayer,
      the1970s: nineteenseventyLayer,
      the1980s: nineteeneightyLayer,
      the1990s: nineteenninetyLayer,
      the2000s: twothouLayer,
      the2010s: twothoutenLayer,

    };

    // Create Leaflet map
    let myMap = L.map("map", {
      center: [10.10, -5.50],
      zoom: 2,
      layers: [gebco_color]
    });

    //Add basemap layers
    L.control.layers(baseMaps, overlayMaps, {collapsed: false} ).addTo(myMap);

  }); //end map
