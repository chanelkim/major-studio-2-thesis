// ********************************************************
// Treemap
// references:
// D3 Responsive Zoomable Treemap (D3 v4+) Aleksander Lenart; source: https://codepen.io/figle/pen/qapRZQ
// ********************************************************

// --------------------------------------------------------
// VARIABLES
// --------------------------------------------------------
let index;
let allArtists = [];
let hierarchicalData;

const svgWidth = 1920;
const svgHeight = 1000;

let width = (height = 100); // % of the parent element
let x = d3.scaleLinear().domain([0, width]).range([0, width]);
let y = d3.scaleLinear().domain([0, height]).range([0, height]);

const customColors = [
  "#E63C28", // red
  "#F0D23C", // bright yellow
  "#F0B43C", // gold
  "#3282DC", // blue
  "#64281E", // brown
  "#E6B4BE", // pink
  "#3C5064", // metal
  "#C8D2DC", // grey
  "#505A32", // green
  "#C8D2DC", // grey
  "#5A50B4", // violet
  // "#14285A", // textile
  // "#1496C8", // utopian
  // "#466E5A", // architecture
  // "#3C4646", // tool
  // "#B49614", // domestic
  // "#D27832", // furniture
  // "#5A3200", // wood
  // "#828282", // ceramic
  // "#322828", // silver
  // "#8C4632", // toy
];

const tooltip = d3
  .select("#chart")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

// --------------------------------------------------------
// LOAD DATA + PERFORM FUNCTIONS
// --------------------------------------------------------
d3.json("IoAD_merged_geo_data.json").then(function (data) {
  index = data;
  analyzeData();
  drawTreemap();
});

// --------------------------------------------------------
// PREP FUNCTION - EXTRACT DATA
// --------------------------------------------------------
function analyzeData() {
  // go through the array of data
  index.forEach(function (n) {
    // match = false
    artistName = n.attribution;
    title = n.title;
    objectid = n.objectid;
    imagematch = n.imagematch;
    geostate = n.geostate;
    geodivision = n.geodivision;
    georegion = n.georegion;
    catstate = n.catstate;

    const artist = allArtists.find((p) => p.name === artistName);

    // check if it matches what we need
    if (!artist) {
      allArtists.push({
        name: artistName,
        titles: [
          {
            title: title,
            objectid: objectid,
            imagematch: imagematch || "Image not available",
            geodivision: geodivision || "Unknown regional division",
            georegion: georegion || "Unknown region",
            geostate: geostate || "Unknown state",
            catstate: catstate || "Unknown catalog state",
          },
        ],
        count: 1, // initialize count to 1
      });
    } else {
      artist.titles.push({
        title: title,
        objectid: objectid,
        imagematch: imagematch || "Image not available",
        geodivision: geodivision || "Unknown regional division",
        georegion: georegion || "Unknown region",
        geostate: geostate || "Unknown state",
        catstate: catstate || "Unknown catalog state",
      });
      artist.count++;
    }
  });

  // --------------------------------------------------------
  // PREP FUNCTION - REFORMAT DATA FOR D3 HIERARCHY
  // --------------------------------------------------------
  function formatDataForHierarchy() {
    const hierarchyData = {
      name: "Artist", // Root node
      children: [],
    };

    allArtists.forEach(function (artist) {
      if (artist && artist.titles) {
        const artistNode = {
          name: artist.name || "Unknown artist", // use a default value if artist.name is undefined
          count: artist.count || 0, // use a default value if artist.count is undefined
          children: [],
        };

        artist.titles.forEach((title) => {
          // Filter out titles with missing or undefined values
          if (title.title && title.objectid && title.imagematch) {
            artistNode.children.push({
              name: title.title,
              objectid: title.objectid,
              imagematch: title.imagematch || "Image not available",
              geodivision: title.geodivision || "Unknown regional division",
              georegion: title.georegion || "Unknown region",
              geostate: title.geostate || "Unknown state",
              value: 1,
            });
          }
        });

        hierarchyData.children.push(artistNode);
      }
    });

    return hierarchyData;
  }

  hierarchicalData = formatDataForHierarchy();
  console.log("hierarchicalData:", hierarchicalData);

  // --------------------------------------------------------
  // PRELOAD IMAGES
  // --------------------------------------------------------
  // Extract the array of artist objects from the hierarchicalData
  const artistArray = hierarchicalData.children;

  // Extract and flatten the array of imagematch URLs from each artist's children
  console.log("Artist Array:", artistArray);
  const imagematchUrls = artistArray.flatMap((artist) =>
    artist && artist.children
      ? artist.children.map((child) => child && child.imagematch)
      : []
  );

  // Call the preloadImages function when the page is initiated
  window.addEventListener("load", function () {
    preloadImages(hierarchicalData);
    preloadHigherResolutionImages(imagematchUrls);
  });
}

// --------------------------------------------------------
// DRAW FUNCTION
// --------------------------------------------------------
function drawTreemap() {
  data = hierarchicalData;

  let currentDepth;

  const color = d3.scaleOrdinal(
    data.children.map((d) => d.name),
    customColors
  );

  svg = d3
    .select(".treemap-container")
    .append("svg")
    .attr("viewBox", "0 0 " + svgWidth + " " + svgHeight)
    .attr("preserveAspectRatio", "xMidYMid meet");

  const treemap = d3
    .treemap()
    .tile(d3.treemapBinary)
    .size([width, height])
    .paddingInner(0)
    .round(true);

  const nodes = d3
    .hierarchy(data)
    .sum((d) => (d.value ? 1 : 0))
    .sort((a, b) => b.height - a.height || b.value - a.value);
  // console.log("nodes:", nodes);

  treemap(nodes);

  chart = d3.select("#chart");

  const cells = chart
    .selectAll(".node")
    .data(nodes.descendants())
    .enter()
    .append("div")
    .attr("class", function (d) {
      return "node level-" + d.depth;
    })
    .attr("title", function (d) {
      return d.data.name ? d.data.name : "null";
    });
  // console.log("cells:", cells);

  cells
    .style("left", function (d) {
      return x(d.x0) + "%";
    })
    .style("top", function (d) {
      return y(d.y0) + "%";
    })
    .style("width", function (d) {
      return x(d.x1) - x(d.x0) + "%";
    })
    .style("height", function (d) {
      return y(d.y1) - y(d.y0) + "%";
    })
    .style("background-color", function (d) {
      while (d.depth > 2) d = d.parent;
      return color(d.data.name);
    })
    .on("click", zoom);

  // Event listeners to handle different depths
  cells
    .on("mouseover", function (event, d) {
      const currentDepth = d.depth;
      if (currentDepth === 0) {
        // Handle depth 0
      } else if (currentDepth === 1) {
        // Handle depth 1
      } else if (currentDepth === 2) {
        // Handle depth 2
      }
    })
    .on("click", function (event, d) {
      const currentDepth = d.depth;
      if (currentDepth === 0) {
        // Handle depth 0 click
      } else if (currentDepth === 1) {
        // Handle depth 1 click
      } else if (currentDepth === 2) {
        // Handle depth 2 click
      }
    })
    .on("click", zoom);

  // --------------------------------------------------------
  // TOOL TIP
  // --------------------------------------------------------
  const borderStyle = {
    highlighted: "highlighted-cell",
  };
  chart
    .selectAll(".node")
    .on("mouseover", function (event, d) {
      const currentTooltip = tooltip;
      const tooltipContainer = d3.select("#tooltipContainer");
      const cell = d3.select(this); // Select the current cell;

      // Apply highlighted border style to the cell
      cell.classed(borderStyle.highlighted, true);

      // Hide tooltip for depths greater than 0
      if (d.depth > 0) {
        currentTooltip.style("opacity", 0);
        const tooltipContent = `
                <h2 style="display: inline;">${d.data.name}</h2><br>
                <h3 style="display: inline;">${d.parent.data.name}</h3>
                <span? style="display: inline;">&nbsp&nbsp&nbsp</span?
                <span style="display: inline;">(${
                  d.data.geostate || "Unknown state"
                })</span>
                <span? style="display: inline;">&nbsp•&nbsp&nbsp</span?
                <span style="display: inline;">${
                  d.data.count || d.parent.data.count
                } contributions</span>
                <h4 style="display: block;">object id ${
                  d.data.objectid ||
                  d.parent.data.objectid ||
                  "to be discovered"
                }</h4>
                
            `;
        // Populate the tooltipContainer
        tooltipContainer.html(tooltipContent);
        return;
      }

      if (d.depth === 0) {
        tooltip.transition().duration(200).style("opacity", 0.9);

        // Customize the tooltip content for depth 0
        let tooltipContent = `
                <h4>${d.data.name || "Unknown contributor"}</h4>
                <h3>${d.data.count} contributions</h3>
                ${d.data.children[0].georegion || "Unknown region"} (${
          d.data.children[0].geostate || "Unknown state"
        })
            `;

        // Set the content of the tooltip
        currentTooltip.html(tooltipContent);
      }
    })
    .on("mouseout", function () {
      const currentTooltip = tooltip;
      // Reset the overflow property when the mouse leaves the treemap
      d3.select("#chart").style("overflow", "hidden");
      currentTooltip.transition().duration(500).style("opacity", 0);
      // Clear the tooltip container
      d3.select("#tooltipContainer").html("");
      const cell = d3.select(this); // Select the current cell
      // Remove highlighted border style from the cell
      cell.classed(borderStyle.highlighted, false);
    });

  // --------------------------------------------------------
  // UP - EVENT LISTENER
  // --------------------------------------------------------
  const parent = d3
    .select(".up")
    .datum(nodes)
    //   .on("click", zoom);
    .on("click", (event, d) => zoom(d));
  console.log("parent:", parent);

  if (nodes) {
    parent.datum(nodes).on("click", (event, d) => zoom(event, d));
    // Clear the tooltip container when transitioning to depth 0
    d3.select("#tooltipContainer").html("");
  } else {
    console.error("Nodes data is not available.");
  }

  // --------------------------------------------------------
  // ZOOM FUNCTION
  // --------------------------------------------------------
  function zoom(event, d) {
    if (!d) {
      // Handle the case when 'd' is undefined
      console.error("Invalid data for zoom:", d);
      return;
    }
    console.log("zoom:", d);
    // http://jsfiddle.net/ramnathv/amszcymq/
    data = hierarchicalData;

    console.log("clicked: " + d.data.name + ", depth: " + d.depth);

    currentDepth = d.depth;
    console.log("currentDepth:", currentDepth);
    parent.datum(d.parent || nodes);

    x.domain([d.x0, d.x1]);
    y.domain([d.y0, d.y1]);

    var t = d3.transition().duration(800).ease(d3.easeCubicOut);

    cells
      .transition(t)
      .style("left", function (d) {
        return x(d.x0) + "%";
      })
      .style("top", function (d) {
        return y(d.y0) + "%";
      })
      .style("width", function (d) {
        return x(d.x1) - x(d.x0) + "%";
      })
      .style("height", function (d) {
        return y(d.y1) - y(d.y0) + "%";
      })
      .style("background-image", function (d) {
        // Check if the currentDepth is 2 and the node has imagematch data
        if (currentDepth === 2 && d.data.imagematch) {
          // Modify the image URL here for currentDepth === 2
          const modifiedImageUrl = d.data.imagematch.replace(
            "200,200",
            "999,999"
          );
          return `url(${modifiedImageUrl})`;
        } else if (currentDepth === 1 && d.data.imagematch) {
          // Show the original image URL for currentDepth === 1
          return `url(${d.data.imagematch})`;
        }
        // Default to no background image
        return "none";
      })
      .style("background-size", function (d) {
        // "cover" at currentDepth:1 (frame within the cell), "contain" at currentDepth:2 (show the full image dimensions)
        return currentDepth === 2 ? "contain" : "cover";
      })
      .style("background-color", function (d) {
        if (currentDepth === 2) {
          // return "black";
          return "#f5f0e6";
          // return transparent;
        }
        // For depths other than 2, use the existing color logic
        while (d.depth > 2) d = d.parent;
        return color(d.data.name);
      });

    cells // hide this depth and above
      .filter(function (d) {
        return d.ancestors();
      })
      .classed("hide", function (d) {
        return d.children ? true : false;
      });

    cells // show this depth + 1 and below
      .filter(function (d) {
        return d.depth > currentDepth;
      })
      .classed("hide", false);
  }
}

// --------------------------------------------------------
// PRELOAD IMAGE FUNCTION
// --------------------------------------------------------
function preloadImages(data, depth) {
  const preloadContainer = document.createElement("div");
  preloadContainer.style.display = "none";

  // Flatten the hierarchicalData to get all imagematch URLs at the specified depth
  const imageUrls = flattenDataAtDepth(data, depth)
    .map((item) => item.imagematch)
    .filter(Boolean);

  imageUrls.forEach((url) => {
    const img = document.createElement("img");
    img.src = url;
    preloadContainer.appendChild(img);
  });

  document.body.appendChild(preloadContainer);
}

// Function to flatten hierarchical data at a specific depth
function flattenDataAtDepth(node, targetDepth, currentDepth = 0) {
  const result = [];

  function flatten(node) {
    if (node && node.data) {
      if (currentDepth === targetDepth) {
        result.push(node.data);
      }

      if (node.children) {
        node.children.forEach((childNode) => {
          flatten(childNode, targetDepth, currentDepth + 1);
        });
      }
    }
  }

  flatten(node);

  return result;
}

// Function to preload higher-resolution images
function preloadHigherResolutionImages(data) {
  console.log("Input data:", data);
  if (!data || !Array.isArray(data)) {
    console.error("Invalid data for preloading images:", data);
    return;
  }

  const higherResolutionImageUrls = data
    .filter((item) => item && item.imagematch)
    .map((item) => item.imagematch.replace("200,200", "999,999"));

  higherResolutionImageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
    console.log("Higher resolution image URLs:", higherResolutionImageUrls);
  });
}

// --------------------------------------------------------
// TREEMAP NAV
// --------------------------------------------------------
// Adjust treemap-nav position based on scroll offset
document.getElementById("chart").addEventListener("scroll", function () {
  const treemapNav = document.getElementById("treemap-nav");
  // const tooltip = document.getElementByClass("tooltip");
  const scrollTop = this.scrollTop;
  const scrollLeft = this.scrollLeft;
  treemapNav.style.top = `${scrollTop}px`;
  treemapNav.style.left = `${scrollLeft}px`;
  // tooltip.style.top = `${scrollTop}px`;
  // tooltip.style.left = `${scrollLeft}px`;
});
