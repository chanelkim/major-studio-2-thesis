// D3
// Declare the chart dimensions and margins.
const width = 1920;
const height = 900;
const marginTop = 0;
const marginRight = 0;
const marginBottom = 0;
const marginLeft = 0;

// Create the SVG container.
const svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [0, 0, width, height])
  .attr("style", "max-width: 100%; height: auto;");

// Load and transform the data
d3.json("catalog_categories.json").then((data) => {
  const transformedData = [];

  // Iterate through each key-value pair in the object
  for (let key in data) {
    const total = data[key].reduce((sum, item) => sum + item.count, 0);
    transformedData.push({ name: key, value: total });
  }

  // X-axis scale (linear scale for values)
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(transformedData, (d) => d.value)])
    .range([marginLeft, width - marginRight]);

  // Y-axis scale (band scale for categories)
  const yScale = d3
    .scaleBand()
    .domain(d3.map(transformedData, (d) => d.name))
    .range([marginTop, height - marginBottom])
    .padding(0.1);

  // Bars
  svg
    .selectAll(".bar")
    .data(transformedData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", marginLeft) // Start bars at the left margin
    .attr("y", (d) => yScale(d.name))
    .attr("width", (d) => xScale(d.value) - marginLeft) // Width based on value
    .attr("height", yScale.bandwidth());

  // X-axis
  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

  // Y-axis
  svg.append("g").call(d3.axisLeft(yScale));
});
