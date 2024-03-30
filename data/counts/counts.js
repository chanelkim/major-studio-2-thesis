// import { wrap } from "d3-textwrap";

function countObjectIdsWithTotals(data) {
  const counts = {};
  const totals = {};
  const topLevelTotals = {};

  function _traverse(data, level, keyPath = []) {
    if (typeof data === "object" && data !== null) {
      let nestTotal = 0;
      for (const key in data) {
        const currentKeyPath = keyPath.concat(key); // Track key path
        if (key !== null && key === "ObjectIDs") {
          // Check for "ObjectIds" key
          const levelKey = currentKeyPath.join(".");
          counts[levelKey] = data[key].length; // Count the array length
          nestTotal += data[key].length;
        } else if (data[key] !== null) {
          const childTotal = _traverse(data[key], level + 1, currentKeyPath);
          nestTotal += childTotal;
        }
      }
      totals[level] = nestTotal;
      return nestTotal;
    } else if (Array.isArray(data)) {
      let nestTotal = 0;
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (item !== null) {
          const currentKeyPath = keyPath.concat(i); // Track index in array
          nestTotal += _traverse(item, level, currentKeyPath);
        }
      }
      totals[level] = nestTotal;
      return nestTotal;
    } else {
      return 0; // Base case: no ObjectIds in non-object/array values
    }
  }

  // Calculate totals for top-level objects
  for (const key in data) {
    if (typeof data[key] === "object" && data[key] !== null) {
      const total = _traverse(data[key], 0, [key]); // Start at level 0 for top-level
      topLevelTotals[key] = total;
    }
  }

  _traverse(data, 0);
  return { counts, totals, topLevelTotals };
}

// RUN FUNCTION
d3.json("/data/updated_categories.json")
  .then(function (nestedJson) {
    console.log("Source Data:", nestedJson);
    // Call the function with the loaded data
    const { counts, totals, topLevelTotals } =
      countObjectIdsWithTotals(nestedJson);

    // Print the results
    console.log("Counts at each level:", counts);
    console.log("Totals within each nest:", totals);
    console.log("Totals for top-level objects:", topLevelTotals);

    // Print topLevelTotals to HTML
    const totalsElement = document.getElementById("top-level-totals");
    // totalsElement.innerHTML = JSON.stringify(topLevelTotals, null, 2); // Pretty-print JSON

    const formattedTotals = JSON.stringify(topLevelTotals, null, 2)
      .replace(/\{|\}/g, "") // Remove curly braces
      .replace(/"/g, "") // Remove quotes
      .replace(/,/g, "<br>"); // Add line breaks after commas

    totalsElement.innerHTML = `<pre>${formattedTotals}</pre>`;

    // Convert topLevelTotals to an array of objects for d3
    const topLevelTotalsArray = Object.entries(topLevelTotals).map(
      ([key, total]) => ({
        // Use "total" instead of "value"
        key: key,
        value: total, // Assuming the numerical value is in the "total" property
      })
    );
    console.log(topLevelTotalsArray);

    // Function to wrap text using tspans (modified to return number of lines)
    function wrapText(text, width) {
      let maxLines = 0; // Track the maximum number of lines

      text.each(function () {
        let text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text
            .text(null)
            .append("tspan")
            .attr("x", 0)
            .attr("y", y)
            .attr("dy", dy + "em");

        while (words.length > 0) {
          let word = words.pop(); // Define word inside the loop
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text
              .append("tspan")
              .attr("x", 0)
              .attr("y", y)
              .attr("dy", ++lineNumber * lineHeight + dy + "em")
              .text(word);

            let newTspan = text // Use let to declare newTspan
              .append("tspan")
              .attr("x", 0)
              .attr("y", y)
              .attr("dy", ++lineNumber * lineHeight + dy + "em")
              .text(word);
            tspan = newTspan; // Assign the new tspan to the original variable
          }
        }
        maxLines = Math.max(maxLines, lineNumber + 1); // Update maxLines
      });

      return maxLines; // Return the maximum number of lines
    }

    // D3
    // Declare the chart dimensions and margins.
    const width = 928;
    const height = 500;
    const marginTop = 30;
    const marginRight = 40;
    const marginBottom = 30;
    const marginLeft = 40;

    // Update the x and y scales to accommodate topLevelTotals data
    const x = d3
      .scaleBand()
      .domain(topLevelTotalsArray.map((d) => d.key)) // Use keys from topLevelTotals
      .range([marginLeft, width - marginRight])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(topLevelTotalsArray, (d) => d.value)])
      .range([height - marginBottom, marginTop]);

    // Create the SVG container.
    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Add a rect for each bar.
    // Update the data binding to use topLevelTotalsArray
    svg
      .append("g")
      .attr("fill", "steelblue")
      .selectAll()
      .data(topLevelTotalsArray) // Use topLevelTotalsArray here
      .join("rect")
      .attr("x", (d) => x(d.key))
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => y(0) - y(d.value))
      .attr("width", x.bandwidth());

    // Add the x-axis and label.
    const textElements = svg // Store the selection of text elements
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll(".tick text") // Select the text elements
      .attr("class", "key-label") // Add the CSS class
      .call(wrapText, x.bandwidth()); // Wrap the text within the bar width

    // After creating the text elements for key labels:
    svg
      .append("g")
      // ... (rest of the axis code)
      .selectAll(".tick text")
      .attr("class", "key-label")
      .attr("text-anchor", "start")
      .call(wrapText, x.bandwidth()); // Wrap the text and get maxLines

    // const maxLines = textElements.call(wrapText, x.bandwidth()); // Wrap the text and get maxLines

    // // Calculate the required SVG height
    // const requiredHeight =
    //   marginTop + marginBottom + maxLines * lineHeight * fontSize; // Adjust fontSize if needed

    // // Set the SVG height
    // svg.attr("height", requiredHeight);

    // Add the y-axis and label, and remove the domain line.
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).tickFormat((y) => (y * 100).toFixed()))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("total object counts per section")
      );

    // DEBUGGING: inspect the scale domains
    console.log(x.domain());
    console.log(y.domain());

    // Return the SVG element.
    return svg.node();
  })
  .catch(function (error) {
    console.error("Error loading first dataset:", error);
  });
