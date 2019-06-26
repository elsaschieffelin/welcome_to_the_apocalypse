// Read death by disasters data         <-- the data .csv file has to be inside the static folder as flask is used
d3.json("/data_deaths").then((data) => {
    // console.log(data);
    

    // Grap all column names from any data record (the first data record is used here)
    let colNames = Object.keys(data[0]);
    // Pop out the first column as x axis of the chart, the remaining columns are considered as y axes
    let xAxisVar = colNames.shift();

    // Set height of button
    let button_layer_2_height = 1.15;
    
    // Data array for the Plotly bar chart
    let dataArr = [];

    // Array for "x" in trace for the Plotly bar chart
    let xArr = data.map((d) => d[xAxisVar]); 

    // Update data array with each column setting as y axis
    colNames.forEach((col) => {
        
        let yArr = [];

        data.forEach((d) => {
            yArr.push(d[col]);
        });

        trace = {
            x: xArr,
            y: yArr,
            name: col,
            type: "bar"
        };

        dataArr.push(trace);

    });         


    let updatemenus = [
        {
            buttons: [
                {
                    args: [{"visible": [true, true, true, true, true, true, true, true, true]}],
                    label: "Reset",
                    method: "update"
                },  
                {
                    args: [{"visible": [false, false, false, false, false, false, false, true, true]}],
                    label: "Less harmful",
                    method: "update"
                },
                {
                    args: [{"visible": [true, false, false, true, false, true, true, false, false]}],
                    label: "Decreasing",
                    method: "update"
                },
                {
                    args: [{"visible": [false, true, true, false, true, false, false, false, false]}],
                    label: "Increasing",
                    method: "update"
                },
            ],
            direction: "left",
            pad: {"r": 10, "t": 10},
            type: "buttons",
            x: 0.33,
            xanchor: "left",
            y: button_layer_2_height,
            yanchor: "top",
            font: {
                color: "red",
                bordercolor: "#ffffff",
            }
        },
    ];
    
    // Set the layout of Plotly bar chart as "stack"
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
            text: "Annual Global Number of Deaths per Decade",
            font: {family: "Cabin Sketch, monospace", size: 25, color: "#ffffff"}
        },

        xaxis: {
            title: {
                text: "<b> <br>Decades</b>",
                font: {family: "Courier New, monospace", size: 18, color: "#ffffff"}
            },
            tickcolor: "#ffffff",
            tickfont: {
                color: "#ffffff"
            },                          
            tickangle: -45
        },
        
        yaxis: {
            title: {
                text: "<b>Number of Victims<br> </b>",
                font: {family: "Courier New, monospace", size: 18, color: "#ffffff"}
            },
            tickcolor: "#ffffff",
            gridcolor: "#ffffff",
            tickfont: {
                color: "#ffffff"
            }            
        },

        hovermode: "closest",
        barmode: "stack",
        updatemenus: updatemenus
    };

    // Plot the chart
    Plotly.newPlot("chart-death", dataArr, layout, {responsive: true});

});