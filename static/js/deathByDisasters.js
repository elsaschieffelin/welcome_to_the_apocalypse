d3.csv("static/death_by_disasters.csv").then((data) => {

    // console.log(data);
    

    let colNames = Object.keys(data[0]);
    // console.log(colNames);
    
    let xAxisVar = colNames.shift();
    // console.log(xAxisVar);
    // console.log(colNames);
        

    let dataArr = [];

    let xArr = data.map((d) => d[xAxisVar]); 

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
    console.log(dataArr);
    
    let layout = {barmode: "stack"};

    Plotly.newPlot("chart-death", dataArr, layout);

});

