d3.csv("static/data/homelessDisasters.csv").then((data)=>{

    // PLot the displaced chart
    plotChart();

    // Event listener to update and re-plot the chart in "col-12" when mouse is moved over the chart
    d3.select("#chart-displaced").on("click", function() {

        // Check whether current chart occupies 6 or 12 cols
        // If it occupies 6 cols, set it to 12, vice versa
        if (d3.select(this).attr("class").slice(4,5) === "6") {

            // Change "col-6" to "col-12" in "class" when activated
            d3.select(this)
                .attr("class", "col-12 mt-5")
                .attr("id", "chart-displaced")
                .html("");
        
        } else {

            // Change "col-12" to "col-6" in "class" when activated
            d3.select(this)
                .attr("class", "col-6 mt-5")
                .attr("id", "chart-displaced")
                .html("");

        }
        
        // Re-plot the chart
        plotChart();        //NOT WORKING???

    });    

    /**
     * Retrieve data of displaced caused by each disaster as y values of bubble, assign year of disaster as x value of bubble, and plot the chart at "div" element with an id of "chart-displaced"
     */
    function plotChart() {
        // Change displaced persons to a number
        data.forEach((row)=>{ row.Displacedpersons = +row.Displacedpersons });
        console.log(data);

        // create a lookup table to sort and regroup the columns of data,
        // first by year, then by type of disaster
        var lookup = {};

        function getData(year, disaster) {
            var byYear, trace; 

            if(!(byYear = lookup[year])) {
                byYear = lookup[year] = {};
            };

            // If a container for this year and type of disaster doesn't exit, create one
            if(!(trace = byYear[disaster])) {
                trace = byYear[disaster] = {
                    x: [],
                    y: [],
                    id: [],
                    text: [],
                    marker: {size: []}

                };
            };
            
            return trace;
        };

        // Go through each row, get the right trace, and append the data
        data.forEach((d)=>{
            var trace = getData(d.Year, d.Entity);
            trace.text.push(d.Entity);
            trace.id.push(d.Displacedpersons);
            trace.x.push(d.Year);
            trace.y.push(d.Displacedpersons);
            trace.marker.size.push(d.Displacedpersons/100);
        });

        // Get group names
        var years = Object.keys(lookup);

        // IN our case, ever year doesn't include every disaster so we have to
        // infer disasters for each year
        console.log(years);

        var firstYear, disasterTypes;
        
        firstYear = lookup[years[10]];
        disasterTypes = Object.keys(firstYear);

        // create the main traces, one for each continent:
        var traces = [];

        disasterTypes.forEach((disaster)=> {
            var data = firstYear[disaster];
            // NOTE: we're creating a single trace per disaster per year
            // the frames will pass data for the different years.
            traces.push({
                name: disaster,
                x: data.x.slice(),
                y: data.y.slice(),
                id: data.id.slice(),
                text: data.text.slice(),
                mode: 'markers',
                hoverinfo: "text",
                marker: {
                    size: data.marker.size.slice(),
                    sizemode: 'area',
                    sizeref: 2
                }
            });
        });

        // Create a frame for each year. Frames are just traces, except they don't need to contain the "full" trace
        // Frames just need the parts of the traces that change (here, the data)
        var frames = [];

        years.forEach((year) => {
            frames.push({
                name: year,
                data: disasterTypes.map((disaster)=> { return getData(year, disaster); })
                
            });
        });

        // Now we have to create slider steps, one for each frame. The slider executes a plotly.js API command (Plotly.animate)
        
        var sliderSteps = [];
        years.forEach((year)=> {
            sliderSteps.push({
                method: "animate",
                label: year,
                args: [[year],
                    {
                        mode: "immediate",
                        transition: {duration: 300},
                        frame: {duration: 300, redraw: false},
                    }]
            });
        });

        var layout = {
            legend: {
                itemsizing: "constant"
            },
            title: {
                text: "Persons Displaced by Natural Disasters (by Type)",
                font: {
                    family: "Cabin Sketch",
                    size: 25
                }
            },
            
            xaxis: {

                title: "Years",
                range: [1997, 2020]

            },
            yaxis: {
                title: "Number of Displaced Persons",
                type: 'log',
                // range: [-100,10000000]
                
            },
            hovermode: "closest",
            updatemenus: [{
                x: 0,
                y: 0,
                yanchor: 'top',
                xanchor: 'left',
                showactive: false,
                direction: 'left',
                type: 'buttons',
                pad: {t: 87, r: 10},
                buttons: [{
                    method: 'animate',
                    args: [null, {
                    mode: 'immediate',
                    fromcurrent: true,
                    transition: {duration: 300},
                    frame: {duration: 500, redraw: false}
                }],
                label: 'Play'
                }, {
                    method: 'animate',
                    args: [[null], {
                    mode: 'immediate',
                    transition: {duration: 0},
                    frame: {duration: 0, redraw: false}
                }],
                label: 'Pause'
                }]
            }],

            //Add the slider and use 'pad' to position it nice next to the buttons.
            sliders: [{
                pad: {l: 130, t: 55},
                currentvalue: {
                visible: true,
                prefix: 'Year:',
                xanchor: 'right',
                font: {size: 20, color: '#666'}
                },
                steps: sliderSteps
            }]
        };

        // Create the plot
        Plotly.plot("chart-displaced",{
            data: traces,
            layout: layout,
            frames: frames
        });
    
    // End of function
    }

});
