// Read death by disasters data         <-- the data .csv file has to be inside the static folder as flask is used
d3.csv("static/death_by_disasters.csv").then((data) => {

    // PLot the death chart
    deathByDisastersPlot();

    // Event listener to update and re-plot the chart in "col-12" when mouse is moved over the chart
    d3.select("#chart-death").on("mouseover", function() {

        // Change "col-6" to "col-12" in "class" when activated
        d3.select(this)
            .attr("class", "col-12 mt-5")
            .attr("id", "chart-death");

        // Re-plot the chart
        deathByDisastersPlot();

    }),

    // Event listener to reset the chart in "col-6" when mouse is moved out of the chart
    d3.select("#chart-death").on("mouseout", function() {

        // Change "col-12" to "col-6" in "class" when activated        
        d3.select(this)
            .attr("class", "col-6 mt-5")
            .attr("id", "chart-death");
        
        // Re-plot the chart
        deathByDisastersPlot();

    });

    /**
     * Retrieve data of deaths caused by each disaster as stacked y values, assign year of disaster as x-axis, and plot the chart at "div" element with an id of "chart-death"
     */
    function deathByDisastersPlot() {
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
        let layout = {
            barmode: "stack",
            xaxis: {
                tickangle: -45
            },
            title: {
                text: "Death Chart Title???",
                font: {
                    family: "Cabin Sketch",
                    size: 30
                }
            }
        };

        // Plot the chart
        Plotly.newPlot("chart-death", dataArr, layout, {responsive: true});
    
    // End of function
    }

});