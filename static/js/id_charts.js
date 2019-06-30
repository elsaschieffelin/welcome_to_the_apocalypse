// Read data from Flask
Promise.all([
    d3.json("/data_reportedcase"),
    d3.json("/data_death"),
    d3.json("/data-displaced"),
    d3.json("/data_lost")
]).then((data) => {  

    // Array to store parameters in plotting four charts
    let chartParam = [
        {"htmlId": "chart-reportedcase",
        "traceType": "line+scatter",
        "titleText": "Number of Reported Natural Disasters<br>(1900 - 2017)",
        "xAxisTitleText": "<b> <br>Years</b>",
        "yAxisTitleText": "<b>Reported Disasters<br> </b>"   
        },
        {"htmlId": "chart-death",
        "traceType": "bar",
        "titleText": "Annual Global Number of Deaths per Decade",
        "xAxisTitleText": "<b> <br>Decades</b>",
        "yAxisTitleText": "<b>Number of Victims<br> </b>"   
        },
        {"htmlId": "chart-displaced",
        "traceType": "line+scatter",
        "titleText": "People Displaced Due to Reported Natural Disasters<br>(1900 - 2017)",
        "xAxisTitleText": "<b> <br>Years</b>",
        "yAxisTitleText": "<b>People Displaced (in Millions)<br> </b>"   
        },
        {"htmlId": "chart-ecolost",
        "traceType": "bar",
        "titleText": "Economic Damage Due to Reported Natural Disasters",
        "xAxisTitleText": "<b> <br>Years</b>",
        "yAxisTitleText": "<b>US Dollars (in Millions)<br> </b>"   
        }
    ];

    // Plot chart one by one
    for (let i = 0; i < chartParam.length; i++) {

        // Retrieve names for all columns from any record out of the data (using the first row of data here)
        let colNames = Object.keys(data[i][0]);
        // Variable for the name of x axis of the chart
        let xVar = "";
        // Array for the names of y axis of the chart
        let yVarArr = [];
        // Arrays for the parameters of the chart
        let xTrace = [],
            yTrace = [],
            dataArr = [];

        // Determine "xVar" and "yVarArr"
        // If plotting chart using scraped data
        if (i === 1) {
            // Pop out name of the first column as "xVar"
            xVar = colNames.shift();
            // "colNames" with the remaining names of the columns are considered as "yVarArr"
            yVarArr = colNames;
        // Not plotting scraped chart 
        } else {
            // Pop out name of the last column as "xVar"
            xVar = colNames.pop();        
            // Unique values from the first column of iterated data are considered as "yVarArr"
            data[i].forEach((d) => {                                
                if (!yVarArr.includes(d[colNames[0]])) yVarArr.push(d[colNames[0]]);
            });            
        }      

        // Determine parameters for each "trace" of the data array to plot
        yVarArr.forEach((nameTrace) => {
            // If plotting chart using scraped data
            if (i === 1) {                
                // Determine "xTrace" and "yTrace"
                xTrace = data[i].map((d) => d[xVar]);                
                yTrace = data[i].map((d) => d[nameTrace]);
            // Not plotting scraped chart 
            } else {
                // Save array of data for each y axis name 
                let nameTraceDataArr = data[i].filter((d) => d[colNames[0]] === nameTrace);
                // Determine "xTrace" and "yTrace"
                xTrace = nameTraceDataArr.map((d) => d[xVar]);                
                yTrace = nameTraceDataArr.map((d) => d[colNames[1]]);         
            }
               
            // Setting "trace" for each name on y axis
            trace = {
                x: xTrace,
                y: yTrace,
                name: nameTrace,
                type: chartParam[i]["traceType"]
            };
            // Append trace to "dataArr"
            dataArr.push(trace);            
        });

        // Setup layout of chart
        let layout = {

            legend: {
                y: .5,
                font: {
                    color: "#ffffff"
                }
            },

            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",

            title: {
                text: chartParam[i]["titleText"],
                font: {
                    family: "Cabin Sketch, monospace",
                    size: 25,
                    color: "#ffffff"
                }
            },

            xaxis: {
                title: {
                    text: chartParam[i]["xAxisTitleText"],
                    font: {
                        family: "Courier New, monospace",
                        size: 18, 
                        color: "#ffffff"
                    }
                },
                tickcolor: "#ffffff",
                gridcolor: "rgba(0,0,0,0)",
                tickfont: {
                    color: "#ffffff"
                },
                tickangle: -45
            },

            yaxis: {
                title: {
                    text: chartParam[i]["yAxisTitleText"],
                    font: {
                        family: "Courier New, monospace",
                        size: 18,
                        color: "#ffffff"
                    }
                },
                tickcolor: "#ffffff",
                gridcolor: "#ffffff",
                tickfont: {
                    color: "#ffffff"
                }
            },

            hovermode: "closest"

        };

        // Set mode to "stack" if plotting barchart
        if (i ===1 || i === 3) {
            layout.barmode = "stack";
        }

        // Add buttons for scraped chart
        if (i === 1) {

            // Object for button with button text as key and visible array as value
            let buttObj = {};
            // "Reset" button
            buttObj["Reset"] = [true, true, true, true, true, true, true, true, true];
            // Other buttons
            buttObj["Less harmful"] = [],
                buttObj["Increasing"] = [],
                buttObj["Decreasing"] = [];
            
            // Note that "yVarArr" and button visible array have the same length 
            for (let i = 0; i < yVarArr.length; i++) {
              
                // Append boolean values for button visible arrays based on "yVarArr"
                if (yVarArr[i] === "Wildfire" || yVarArr[i] ==="Volcanic activity") {
                    buttObj["Less harmful"].push(true);
                    buttObj["Increasing"].push(false);
                    buttObj["Decreasing"].push(false);
                } else if (yVarArr[i] === "Landslide" || yVarArr[i] ==="Extreme temperature" || yVarArr[i] === "Earthquake") {
                    buttObj["Less harmful"].push(false);
                    buttObj["Increasing"].push(true);
                    buttObj["Decreasing"].push(false);
                } else {
                    buttObj["Less harmful"].push(false);
                    buttObj["Increasing"].push(false);
                    buttObj["Decreasing"].push(true);
                }
                
            }

            // Array for "buttons" under "updatemenus"
            let buttArr = [];

            // Append objects to "buttArr"
            Object.keys(buttObj).forEach((key) => {

                let imObj = {};

                imObj.args = [{"visible": buttObj[key]}];
                imObj.label = key;
                imObj.method = "update";

                buttArr.push(imObj);

            });
            
            // Define "updatemenus"
            let updatemenus = [
                {
                    buttons: buttArr,
                    direction: "right",
                    pad: {
                        "r": 10,
                        "t": 10
                    },
                    type: "button",
                    x: 0.33,
                    xanchor: "right",
                    y: 1.15,
                    yanchor: "top",
                    font: {
                        color: "red",
                        bordercolor: "#ffffff"
                    }
                },
            ];

            layout.updatemenus = updatemenus;
        
        }
        
        Plotly.newPlot(chartParam[i]["htmlId"], dataArr, layout, {responsive: true});

    }

});