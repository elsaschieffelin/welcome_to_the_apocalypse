// Read death by disasters data
d3.csv("static/death_by_disasters.csv").then((data) => {
   
    // Grap all column names from data
    let colNames = Object.keys(data[0]);
    // Pop out the first column as x axis of the chart, the remaining columns are considered as y axes
    let xAxisVar = colNames.shift();
       
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

    // Set the layout of Plotly bar chart as "stack"
    let layout = {barmode: "stack"};

    // Plot the chart
    Plotly.newPlot("chart-death", dataArr, layout);

});

