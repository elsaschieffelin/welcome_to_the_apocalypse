// function damageChart(){

    var parseYear = d3.timeParse("%Y");
    
    // Import data
    d3.csv("static/data/economicdamage.csv")
        .then((data)=> { 
            data.forEach((row)=>{ 
                // Parse Year and convert dollars to numbers
                // row.Year = formatYear(row.Year)
                row.TotalDollars = +row.TotalDollars
             });
        // Filter Disasters by type
        let allDisasters = data.filter(d => d.Entity === "All natural disasters");
        let drought = data.filter(d => d.Entity === "Drought");
        let quake = data.filter(d => d.Entity === "Earthquake");
        let temp = data.filter(d => d.Entity === "Extreme temperature");
        let weather = data.filter(d => d.Entity === "Extreme weather");
        let flood = data.filter(d => d.Entity === "Flood");
        let landSlide = data.filter(d => d.Entity === "Landslide");
        let volcanic = data.filter(d => d.Entity === "Volcanic activity");
        let wildfire = data.filter(d => d.Entity === "Wildfire");
        let mass = data.filter(d => d.Entity === "Mass movement (dry)")

        // store years for each Disaster type and the corresponding Economic damage for that year in an array
        let allYear = [];
        let droughYear = [];
        let quakeYear = [];
        let tempYear = [];
        let weatherYear = [];
        let floodYear = [];
        let slideYear = [];
        let volcYear = [];
        let wildYear = [];
        let massYear = [];

        let allDam = [];
        let droughtDam =[];
        let quakeDam = [];
        let tempDam = [];
        let weatherDam = [];
        let floodDam = [];
        let slideDam = [];
        let volcDam = [];
        let wildDam = [];
        let massDam = [];
        
        // Create loops to loop over filtered datasets and push to desired year and economic damage arrays
        
        // All Disasters
        allDisasters.forEach((d) =>{ 
            allYear.push(d.Year)
            allDam.push(d.TotalDollars)
        });
        // Drought
        drought.forEach((d) => {
            droughYear.push(d.Year)
            droughtDam.push(d.TotalDollars)
        });
        // Earthquake
        quake.forEach((d) => {
            quakeYear.push(d.Year)
            quakeDam.push(d.TotalDollars)
        });
        // Extreme Temperature
        temp.forEach((d) => {
            tempYear.push(d.Year)
            tempDam.push(d.TotalDollars)
        });
        // Extreme Weather
        weather.forEach((d) => {
            weatherYear.push(d.Year)
            weatherDam.push(d.TotalDollars)
        });
        // Flood
        flood.forEach((d) => {
            floodYear.push(d.Year)
            floodDam.push(d.TotalDollars)
        });
        // Landslide
        landSlide.forEach((d) => {
            slideYear.push(d.Year)
            slideDam.push(d.TotalDollars)
        });
        // Volcanic
        volcanic.forEach((d) => {
            volcYear.push(d.Year)
            volcDam.push(d.TotalDollars)
        });
        // Wildfire
        wildfire.forEach((d) => {
            wildYear.push(d.Year)
            wildDam.push(d.TotalDollars)
        });
        // Mass movement (dry)
        mass.forEach((d) => {
            massYear.push(d.Year)
            massDam.push(d.TotalDollars)
        });

        console.log(allYear, allDam);

        // Create traces and plot

        var trace1 = {
            x: allYear,
            y: allDam,
            name: "All Disasters",
            type: "bar"
        };

        var trace2 = {
            x: droughYear,
            y: droughtDam,
            name: "Drought",
            type: "bar"

        };

        var trace3 = {
            x: quakeYear,
            y: quakeDam,
            name: "Earthquake",
            type: "bar"
        };

        var trace4 = {
            x: tempYear,
            y: tempDam,
            name: "Extreme Temperature",
            type: "bar"
        };

        var trace5 = {
            x: weatherYear,
            y: weatherDam,
            name: "Extreme Weather",
            type: "bar"
        };

        var trace6 = {
            x: floodYear,
            y: floodDam,
            name: "Flood",
            type: "bar"
        };

        var trace7 = {
            x: slideYear,
            y: slideDam,
            name: "Landslide",
            type: "bar"
        };

        var trace8 = {
            x: volcYear,
            y: volcDam,
            name: "Volcanic Activity",
            type: "bar"
        };

        var trace9 = {
            x: wildYear,
            y: wildDam,
            name: "Wildfire",
            type: "bar"
        };

        var trace10 = {
            x: massYear,
            y: massDam,
            name: "Earthquake",
            type: "bar"
        };

        var plotData = [trace2,trace3,trace4,trace5,trace6,trace7,trace8, trace9,trace10, trace1] 
        
        var layout = {
            title: {
                text: "Economic Damage Due to Reported Natural Disasters",
                font: {family: "Cabin Sketch", size: 25, color: "#7f7f7f"}
            },
            xaxis:{
                title: {
                    text: "Year",
                    font: {family: "Courier New, monospace", size: 18, color: "#7f7f7f"}                    
                }
            },
            yaxis: {
                title: {
                    text: "US Dollars (in billions)", 
                    font: {family: "Courier New, monospace", size: 18, color: "#7f7f7f" }
                }
            },
            barmode: "stack",

        };


        Plotly.newPlot("chart-cost", plotData, layout, {showSendToCloud: true});
        });


        

   
// };
