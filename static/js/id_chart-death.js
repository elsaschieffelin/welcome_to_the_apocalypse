// Read death by disasters data         <-- the data .csv file has to be inside the static folder as flask is used
d3.csv("static/data/death_by_disasters.csv").then((data) => {

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
                    args: [{"visible": [false, false, false, false, false, false, false, false, true, true]}],
                    label: "Nonlethal",
                    method: "update"
                },
                {
                    args: [{"visible": [true, false, false, false, false, false, true, true, false, false]}],
                    label: "Decreasing",
                    method: "update"
                },
                {
                    args: [{"visible": [false, true, true, false, false, true, false, false, false, false]}],
                    label: "Increasing",
                    method: "update"
                },
                {
                    args: [{"visible": [false, false, false, true, true, false, false, false, false, false]}],
                    label: "Stable",
                    method: "update"
                },                                                            
                {
                    args: [{"visible": [true, true, true, true, true, true, true, true, true, true]}],
                    label: "Reset",
                    method: "update"
                },                    
            ],
            direction: "left",
            pad: {"r": 10, "t": 10},
            type: "buttons",
            x: 0.1,
            xanchor: "left",
            y: button_layer_2_height,
            yanchor: "top"
        },
    ];
    
    // Set the layout of Plotly bar chart as "stack"
    let layout = {
        hovermode: "closest",
        barmode: "stack",
        xaxis: {
            title: "<b> <br>Decades</b>",
            tickangle: -45
        },
        yaxis: {
            title: "<b>Number of Victims<br> </b>"           
        },            
        title: {
            text: "Annual Global Number of Deaths per Decade",
            font: {
                family: "Cabin Sketch",
                size: 25
            }
        },
        updatemenus: updatemenus
    };

    // Plot the chart
    Plotly.newPlot("chart-death", dataArr, layout, {responsive: true});

});