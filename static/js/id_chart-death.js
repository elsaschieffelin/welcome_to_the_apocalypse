// Read death by disasters data         <-- the data .csv file has to be inside the static folder as flask is used
d3.csv("static/data/death_by_disasters.csv").then((data) => {

    // PLot the death chart
    plotChart();

    // // Event listener to update and re-plot the chart in "col-12" when clicking on the chart
    // d3.select("#chart-death").on("click", function() {

    //     // If not clicking on either scrollbox or buttons of the chart ...
    //     // https://stackoverflow.com/questions/152975/how-do-i-detect-a-click-outside-an-element
    //     if (!$(event.target).closest(".scrollbox").length && !$(event.target).closest(".updatemenu-button").length) {

    //         // Check whether current chart occupies 6 or 12 cols
    //         // If it occupies 6 cols, set it to 12, vice versa
    //         if (d3.select(this).attr("class").slice(4,5) === "6") {

    //             // Change "col-6" to "col-12" in "class" when activated
    //             d3.select(this)
    //                 .attr("class", "col-12 mt-5")
    //                 .attr("id", "chart-death")
    //                 .html("");
            
    //         } else {

    //             // Change "col-12" to "col-6" in "class" when activated
    //             d3.select(this)
    //                 .attr("class", "col-6 mt-5")
    //                 .attr("id", "chart-death")
    //                 .html("");

    //         }

    //     }

    //     // Re-plot the chart
    //     plotChart();

    // });

    /**
     * Retrieve data of deaths caused by each disaster as stacked y values, assign year of disaster as x-axis, and plot the chart at "div" element with an id of "chart-death"
     */
    function plotChart() {
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
                        label: "Select All",
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
            // hovermode: "closest",
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
    
    // End of function
    }

});