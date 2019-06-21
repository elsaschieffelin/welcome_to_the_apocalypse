d3.selectAll(".chart-plot").on("click", function() {

    // 'svg' element to be appended to 'div' area with a class of "charts"
    let svg = d3.select(".charts")
        .append("svg")
        .attr("class", "temp-svg");

    // console.log(event.pageX);
    // console.log(event.pageY);

    // Variables to store x- and y-coord relative to appended 'svg' element
    let mouseX = event.pageX - $(".temp-svg").offset().left,
        mouseY = event.pageY - $(".temp-svg").offset().top;

    // Array for color ID of circles to be appended to 'svg'
    let colorIdArr = ["red", "blue", "green", "yellow"];

    // Append circles to 'svg' with individual color from "colorIdArr"
    colorIdArr.forEach((color) => {

        svg.append("circle")
            .attr("id", color)
            .attr("cx", mouseX)
            .attr("cy", mouseY)
            .attr("r", 25)
            .attr("fill", "none")
            .attr("stroke-width", 3);

    });

    // remove 'svg' element with the class of "temp-svg"
    d3.select(".temp-svg")
        .transition()
        .duration(100)
        .remove();

});