// Add your JavaScript code here
// Add your JavaScript code here
const MAX_WIDTH = Math.max(1080, window.innerWidth);
const MAX_HEIGHT = 720;
const margin = {top: 40, right: 100, bottom: 40, left: 175};
const G3_NUM_EXAMPLES = 10;

// Assumes the same graph width, height dimensions as the example dashboard. Feel free to change these if you'd like
let graph_1_width = (MAX_WIDTH / 2) - 10, graph_1_height = 250;
let graph_2_width = (MAX_WIDTH / 2) - 10, graph_2_height = 275;
let graph_3_width = MAX_WIDTH / 2, graph_3_height = 575;

let svg1 = d3.select("#graph1")
	// .attr("id", "barplot1")
    .append("svg")
    .attr("width", graph_1_width)     // HINT: width
    .attr("height", graph_1_height)     // HINT: height
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);    // HINT: transform

// TODO: Create a linear scale for the x axis (number of occurrences)
let x = d3.scaleLinear()
    .range([0, graph_1_width - margin.left - margin.right]);

// TODO: Create a scale band for the y axis (artist)
let y = d3.scaleBand()
    .range([0, graph_1_height - margin.top - margin.bottom])
    .padding(0.1);  // Improves readability

// Set up reference to count SVG group
let countRef = svg1.append("g");
// Set up reference to y axis label to update text in setData
let y_axis_label = svg1.append("g");

// TODO: Add x-axis label
svg1.append("text")
    .attr("transform", `translate(${(graph_1_width - margin.left - margin.right) / 2},
                                        ${(graph_1_height - margin.top - margin.bottom) + 15})`)       // HINT: Place this at the bottom middle edge of the graph
    .style("text-anchor", "middle")
    .text("Count");
// Since this text will not update, we can declare it outside of the setData function


// TODO: Add y-axis label
let y_axis_text = svg1.append("text")
    .attr("transform", `translate(-120, ${(graph_1_height - margin.top - margin.bottom) / 2})`)       // HINT: Place this at the center left edge of the graph
    .style("text-anchor", "middle");

// TODO: Add chart title
let title = svg1.append("text")
    .attr("transform", `translate(${(graph_1_width - margin.left - margin.right) / 2}, ${-10})`)       // HINT: Place this at the top middle edge of the graph
    .style("text-anchor", "middle")
    .style("font-size", 15);

function setG1Data(attr) {
    d3.csv("data/team_goals.csv").then(function(data) {
        if (attr == "Given Up") { 
			data = cleanData(data, function(a, b) { return parseFloat(a[attr]) - parseFloat(b[attr]) }, G3_NUM_EXAMPLES);
		} else {
			data = cleanData(data, function(a, b) { return parseFloat(b[attr]) - parseFloat(a[attr]) }, G3_NUM_EXAMPLES);
		}
		x.domain([0, d3.max(data, function(d) { return parseFloat(d[attr]); })]);

        y.domain(data.map(function(d) { return d["team"] }));

        y_axis_label.call(d3.axisLeft(y).tickSize(0).tickPadding(10));

        let bars = svg1.selectAll("rect").data(data);
		
       
		color_dict = {
			"Asia":"orange",
			"Europe" : "cornflowerblue",
			"Africa" : "orange",
			"South America" : "limegreen",
			"North America" : "yellow",
			"Australia" : "purple"
		};
		
		tooltip = d3
			.select('body')
			.append('div')
			.attr('class', 'd3-tooltip')
			.style('position', 'absolute')
			.style('z-index', '10')
			.style('visibility', 'hidden')
			.style('padding', '10px')
			.style('background', 'black')
			.style('border-radius', '4px')
			.style('color', 'white')
		
		let mouseover = function (d, i) {
			  tooltip
				.html(
				  `<div>Continent: ${d.Continent}</div>`
				)
				.style('visibility', 'visible');
	    }
		  
		let mousemove = function () {
		    tooltip
			  .style('top', d3.event.pageY - 40 + 'px')
		  	  .style('left', d3.event.pageX + 40 + 'px');
	    }
		
		let mouseout = function () {
			tooltip.html(``).style('visibility', 'hidden');
		}
        bars.enter()
            .append("rect")
            .merge(bars)
			.on('mouseover', mouseover)
			  .on('mousemove', mousemove)
			  .on('mouseout', mouseout)
            .transition()
            .duration(1000)
            .attr("x", x(0))
            .attr("y", function(d) { return y(d["team"]); }) 
		    .attr("fill", function(d) {return color_dict[d.Continent] })		// HINT: Use function(d) { return ...; } to apply styles based on the data point
            .attr("width", function(d) { return x(parseFloat(d[attr])); })
            .attr("height",  y.bandwidth())
		
        let counts = countRef.selectAll("text").data(data);

        counts.enter()
            .append("text")
            .merge(counts)
            .transition()
            .duration(1000)
            .attr("x", function(d) { return x(parseFloat(d[attr])) + 10; })       // HINT: Add a small offset to the right edge of the bar, found by x(d.count)
            .attr("y", function(d) { return y(d["team"]) + 10})       // HINT: Add a small offset to the top edge of the bar, found by y(d.artist)
            .style("text-anchor", "start")
            .text(function(d) { return parseFloat(d[attr])});           // HINT: Get the count of the artist

        y_axis_text.text(attr);
        title.text("Goal Metric: " + attr);

        bars.exit().remove();
        counts.exit().remove();
		
    });
}

let svg2 = d3.select("#graph2")
	// .attr("id", "barplot1")
    .append("svg")
    .attr("width", graph_2_width)     // HINT: width
    .attr("height", graph_2_height)     // HINT: height
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);    // HINT: transform

// TODO: Create a linear scale for the x axis (number of occurrences)
let x2 = d3.scaleLinear()
    .range([0, graph_2_width - margin.left - margin.right]);

// TODO: Create a scale band for the y axis (artist)
let y2 = d3.scaleBand()
    .range([0, graph_2_height - margin.top - margin.bottom])
    .padding(0.1);  // Improves readability

// Set up reference to count SVG group
let countRef2 = svg2.append("g");
// Set up reference to y axis label to update text in setData
let y_axis_label2 = svg2.append("g");

// TODO: Add x-axis label
svg2.append("text")
    .attr("transform", `translate(${(graph_2_width - margin.left - margin.right) / 2},
                                        ${(graph_2_height - margin.top - margin.bottom) + 15})`)       // HINT: Place this at the bottom middle edge of the graph
    .style("text-anchor", "middle")
    .text("Pecentage");
// Since this text will not update, we can declare it outside of the setData function


// TODO: Add y-axis label
let y_axis_text2 = svg2.append("text")
    .attr("transform", `translate(-120, ${(graph_2_height - margin.top - margin.bottom) / 2})`)       // HINT: Place this at the center left edge of the graph
    .style("text-anchor", "middle");

// TODO: Add chart title
let title2 = svg2.append("text")
    .attr("transform", `translate(${(graph_2_width - margin.left - margin.right) / 2}, ${-10})`)       // HINT: Place this at the top middle edge of the graph
    .style("text-anchor", "middle")
    .style("font-size", 15);

function setG2Data() {
    d3.csv("data/win_pct.csv").then(function(data) {
		attr = "win_percentage";
		data = cleanData(data, function(a, b) { return parseFloat(b[attr]) - parseFloat(a[attr]) }, 10);
		x2.domain([0, d3.max(data, function(d) { return parseFloat(d[attr]); })]);

        y2.domain(data.map(function(d) { return d["team"] }));

        y_axis_label2.call(d3.axisLeft(y).tickSize(0).tickPadding(10));

        let bars = svg2.selectAll("rect").data(data);
		
		tooltip = d3
			.select('body')
			.append('div')
			.attr('class', 'd3-tooltip')
			.style('position', 'absolute')
			.style('z-index', '10')
			.style('visibility', 'hidden')
			.style('padding', '10px')
			.style('background', 'black')
			.style('border-radius', '4px')
			.style('color', 'white')
		
		let mouseover = function (d, i) {
			  tooltip
				.html(
				  `<div>Wins: ${d.wins}</div><br><div>Games Played: ${d.gp}</div>`
				)
				.style('visibility', 'visible');
	    }
		  
		let mousemove = function () {
		    tooltip
			  .style('top', d3.event.pageY - 40 + 'px')
		  	  .style('left', d3.event.pageX + 40 + 'px');
	    }
		
		let mouseout = function () {
			tooltip.html(``).style('visibility', 'hidden');
		}
        bars.enter()
            .append("rect")
            .merge(bars)
			.on('mouseover', mouseover)
			  .on('mousemove', mousemove)
			  .on('mouseout', mouseout)
            .transition()
            .duration(1000)
            .attr("x", x2(0))
            .attr("y", function(d) { return y2(d["team"]); }) 
		    .attr("fill", function(d) {
				if (d.wins > 500) {
					return "lightpink";
				}
				return "cornflowerblue";
			})		// HINT: Use function(d) { return ...; } to apply styles based on the data point
            .attr("width", function(d) { return x2(parseFloat(d[attr])); })
            .attr("height",  y2.bandwidth())
		
        let counts = countRef2.selectAll("text").data(data);

        counts.enter()
            .append("text")
            .merge(counts)
            .transition()
            .duration(1000)
            .attr("x", function(d) { return x2(parseFloat(d[attr])) + 10; })       // HINT: Add a small offset to the right edge of the bar, found by x(d.count)
            .attr("y", function(d) { return y2(d["team"]) + 10})       // HINT: Add a small offset to the top edge of the bar, found by y(d.artist)
            .style("text-anchor", "start")
            .text(function(d) { return parseFloat(d[attr])});           // HINT: Get the count of the artist

        y_axis_text2.text(attr);
        title2.text(attr);

        bars.exit().remove();
        counts.exit().remove();
		
    });
}

let svg3 = d3.select("#graph3")
    .append("svg")
    .attr("width", graph_3_width)     // HINT: width
    .attr("height", graph_3_height)     // HINT: height
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);    // HINT: transform


let y3 = d3.scaleLinear()
    .range([graph_3_height - margin.top - margin.bottom, 0]);  // Improves readability

let countRef3 = svg3.append("g");
let x_axis_label3 = svg3.append("g")
					    .attr("transform", `translate(0,
                                         ${(graph_3_height - margin.top - margin.bottom)})`);
let y_axis_label3 = svg3.append("g");

svg3.append("text")
    .attr("transform", `translate(${(graph_3_width - margin.left - margin.right) / 2},
                                        ${(graph_3_height - margin.top - margin.bottom) + 30})`)       // HINT: Place this at the bottom middle edge of the graph
    .style("text-anchor", "middle")
    .text("Year");


let y_axis_text3 = svg3.append("text")
    .attr("transform", `translate(-120, ${(graph_3_height - margin.top - margin.bottom) / 2})`)       // HINT: Place this at the center left edge of the graph
    .style("text-anchor", "middle")
	.text("Number of Games");

let title3 = svg3.append("text")
    .attr("transform", `translate(${(graph_3_width - margin.left - margin.right) / 2}, ${-10})`)       // HINT: Place this at the top middle edge of the graph
    .style("text-anchor", "middle")
    .style("font-size", 15)
	.text("Games Played by Year");

function setG3Data() {
    d3.csv("data/game_count.csv").then(function(data) {
		console.log(data)
		x3 = d3.scaleTime()
		   .domain(d3.extent(data, function(d) { return Date.parse(d.year); }))
		   .range([0, graph_3_width - margin.left - margin.right])
		data = cleanData(data, function(a, b) { return parseFloat(b["year"]) - parseFloat(a["year"]) }, 10);
		
		
		y3.domain(data.map(function(d) { return d["games"] }));
		
		x_axis_label3.call(d3.axisBottom(x3).tickSize(1).tickPadding(10));
        y_axis_label3.call(d3.axisLeft(y3).tickSize(1).tickPadding(10));

        let dots = svg3.selectAll("dot").data(data);
		
		tooltip = d3
			.select('body')
			.append('div')
			.attr('class', 'd3-tooltip')
			.style('position', 'absolute')
			.style('z-index', '10')
			.style('visibility', 'hidden')
			.style('padding', '10px')
			.style('background', 'black')
			.style('border-radius', '4px')
			.style('color', 'white')
		
		let mouseover = function (d, i) {
			  tooltip
				.html(
				  `<div>Games Played: ${d.games}</div><br>
				   <div>Year: ${d.year.substring(0,4)}</div>`
				)
				.style('visibility', 'visible');
	    }
		  
		let mousemove = function () {
		    tooltip
			  .style('top', d3.event.pageY - 40 + 'px')
		  	  .style('left', d3.event.pageX + 40 + 'px');
	    }
		
		let mouseout = function () {
			tooltip.html(``).style('visibility', 'hidden');
		}
        dots.enter()
            .append("circle")
			.attr("cx", function (d) { return x3(Date.parse(d.year)); } )
		    .attr("cy", function (d) {return y3(d["games"]); } )
		    .attr("r", 10)
			.attr("fill", "purple")
			.on('mouseover', mouseover)
			.on('mousemove', mousemove)
			.on('mouseout', mouseout)
            .transition()
            .duration(1000);
        
        dots.exit().remove();
        
    });
}
/**
 * Cleans the provided data using the given comparator then strips to first numExamples
 * instances
 */
function cleanData(data, comparator, numExamples) {
    return data.sort(comparator).slice(0, numExamples);
}

// On page load, render the barplot with the artist data
setG1Data("Given Up");
setG2Data();
setG3Data();

