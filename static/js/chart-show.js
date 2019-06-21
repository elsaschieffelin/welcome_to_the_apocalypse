// Event listener to show selected chart
d3.select('select').on("change", function() {

    // Retrieve "value" of 'option' to be used for searching chart id
    let value = this.value;

    // console.log(value);
    
    // Hide all disaster charts
    d3.selectAll(".disaster")
        .attr("class", "col-11 mt-5 disaster hide load-hidden js-plotly-plot");

    // Show selected disaster chart
    d3.select(`#${value}`)
        .attr("class", "col-11 mt-5 disaster show load-show js-plotly-plot");

});