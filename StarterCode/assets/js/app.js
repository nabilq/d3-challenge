// @TODO: YOUR CODE HERE!

// set the dimensions and margins of the graph
var margin = {top: 10, right: 50, bottom: 100, left: 30},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
var svg = d3.select("#scatter")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


        var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);



//read in csv file
d3.csv("./assets/data/data.csv").then(function(tvData) {

    console.log(tvData);

// //state names array
//     var names = tvData.map(data => data.abbr);
// //poverty % array
//     var poverty=tvData.map(data =>data.poverty);
// //healthcare % array
//     var healthcare=tvData.map(data =>data.healthcare)

//   console.log("States", names);
//   console.log("Poverty,", poverty)
//   console.log("Healthcare", healthcare)

//   //convert Poverty and Healthcare to Integer Array

//   var povertyInt= poverty.map(Number)
//   var healthInt= healthcare.map(Number)

//   console.log (povertyInt)
//   console.log (healthInt)


  // Cast each hours value in tvData as a number using the unary + operator
  tvData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare=+data.healthcare
    console.log("State Name:", data.abbr);
    console.log("Poverty Rates:", data.poverty);
    console.log("Healthcare:", data.healthcare )
  });

     // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([9, d3.max(tvData, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(tvData, d => d.healthcare)])
      .range([height, 0]);


      // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(tvData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "blue")
    .text(function(d) { return d.abbr; })
    .attr("opacity", ".5");
    
    //add text to circles
    var circleLabels = chartGroup.append("g")
    .selectAll("text")
    .data(tvData)
    .enter()
    .append("text");
     circleLabels.classed("stateText", true)
    .attr("x", function(d) { return xLinearScale(d.poverty); })
    .attr("y", function(d) { return yLinearScale(d.healthcare); })
    .text(function(d) { return d.abbr; })
    



        // Create axes labels
        chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left -20)
        .attr("x", 0 - (height/1.5))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Healthcare (%)");
  
      chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 40})`)
        .attr("class", "axisText")
        .text("In Poverty (%)");


             // Step 1: Initialize Tooltip
      var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([1, -10])
      .html(function(d) {
        return (`<strong>State:</strong> ${d.state}<strong><hr><strong> Poverty</strong>:${d.poverty}%
        <br><strong>Lacks Healthcare:</strong> ${d.healthcare}%`);
      });

    // Step 2: Create the tooltip in chartGroup.
    chartGroup.call(toolTip);

    // Step 3: Create "mouseover" event listener to display tooltip
    circlesGroup.on("mouseover", function(d) {
      toolTip.show(d, this);
    })
    // Step 4: Create "mouseout" event listener to hide tooltip
      .on("mouseout", function(d) {
        toolTip.hide(d);
      });



}).catch(function(error) {
    console.log(error);
  });



