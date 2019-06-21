d3.csv("static/data/homeless_disasters.csv").then((data)=>{
    
    // Change displaced persons to a number
    data.forEach((row)=>{ row.Displacedpersons = +row.Displacedpersons });
    console.log(data);

    // create a lookup table to sort and regroup the columns of data,
    // first by year, then by type of disaster
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
            allDam.push(d.Displacedpersons)
        });
        // Drought
        drought.forEach((d) => {
            droughYear.push(d.Year)
            droughtDam.push(d.Displacedpersons)
        });
        // Earthquake
        quake.forEach((d) => {
            quakeYear.push(d.Year)
            quakeDam.push(d.Displacedpersons)
        });
        // Extreme Temperature
        temp.forEach((d) => {
            tempYear.push(d.Year)
            tempDam.push(d.Displacedpersons)
        });
        // Extreme Weather
        weather.forEach((d) => {
            weatherYear.push(d.Year)
            weatherDam.push(d.Displacedpersons)
        });
        // Flood
        flood.forEach((d) => {
            floodYear.push(d.Year)
            floodDam.push(d.Displacedpersons)
        });
        // Landslide
        landSlide.forEach((d) => {
            slideYear.push(d.Year)
            slideDam.push(d.Displacedpersons)
        });
        // Volcanic
        volcanic.forEach((d) => {
            volcYear.push(d.Year)
            volcDam.push(d.Displacedpersons)
        });
        // Wildfire
        wildfire.forEach((d) => {
            wildYear.push(d.Year)
            wildDam.push(d.Displacedpersons)
        });
        // Mass movement (dry)
        mass.forEach((d) => {
            massYear.push(d.Year)
            massDam.push(d.Displacedpersons)
        });

        // console.log(allYear, allDam);

        // Create traces and plot

        var trace1 = {
            x: allYear,
            y: allDam,
            name: "All Disasters",
            type: "line+scatter"
        };

        var trace2 = {
            x: droughYear,
            y: droughtDam,
            name: "Drought",
            type: "line+scatter"

        };

        var trace3 = {
            x: quakeYear,
            y: quakeDam,
            name: "Earthquake",
            type: "line+scatter"
        };

        var trace4 = {
            x: tempYear,
            y: tempDam,
            name: "Extreme Temperature",
            type: "line+scatter"
        };

        var trace5 = {
            x: weatherYear,
            y: weatherDam,
            name: "Extreme Weather",
            type: "line+scatter"
        };

        var trace6 = {
            x: floodYear,
            y: floodDam,
            name: "Flood",
            type: "line+scatter"
        };

        var trace7 = {
            x: slideYear,
            y: slideDam,
            name: "Landslide",
            type: "line+scatter"
        };

        var trace8 = {
            x: volcYear,
            y: volcDam,
            name: "Volcanic Activity",
            type: "line+scatter"
        };

        var trace9 = {
            x: wildYear,
            y: wildDam,
            name: "Wildfire",
            type: "line+scatter"
        };

        var trace10 = {
            x: massYear,
            y: massDam,
            name: "Earthquake",
            type: "line+scatter"
        };

        var plotData = [trace2,trace3,trace4,trace5,trace6,trace7,trace8, trace9,trace10, trace1] 

        // Animate

        console.log(plotData);

        // Modify the layout
        
        var layout = {

            legend: {
                y: .5,
                font: {
                    color: "#ffffff"
                }
            },

            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0", 

            title: {
                text: "People Displaced Due to Reported Natural Disasters<br>(2000 to 2007)",
                font: {family: "Cabin Sketch, monospace", size: 25, color: "#ffffff"}
            },

            xaxis:{
                title: {
                    text: "<b>Year</b>",
                    font: {family: "Courier New, monospace", size: 18, color: "#ffffff"}                    
                },
                tickcolor: "#ffffff",
                gridcolor: "rgba(0,0,0,0)",
                tickfont: {
                    color: "#ffffff"
                }
            },
            yaxis: {
                title: {
                    text: "<b>People Displaced (in millions)<br> <b>", 
                    font: {family: "Courier New, monospace", size: 18, color: "#ffffff"}
                },
                tickcolor: "#ffffff",
                gridcolor: "#ffffff",
                tickfont: {
                    color: "#ffffff"
                } 
            },
           
            hovermode: "closest"

        };


        Plotly.plot("chart-displaced", plotData, layout, {responsive: true}, {paper_bgcolor: "rgba(0,0,0,0)", plot_bgcolor: "rgba(0,0,0,0)"});
    });


