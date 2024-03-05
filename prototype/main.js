//---------------LOAD DATA---------------
// Load the first JSON dataset
d3.json("/data/combined_data.json")
  .then(function (json1) {
    // Load the second JSON dataset
    d3.json("/data/IoAD_merged_geo_data.json")
      .then(function (json2) {
        // Once both datasets are loaded, you can work with them here
        console.log("First dataset:", json1);
        console.log("Second dataset:", json2);

        // Now you can proceed with your comparison logic or any other processing
        const matchingItems = findMatchingItems(
          json1,
          json2,
          "renderer",
          "attribution"
        );
        console.log("Matching items:", matchingItems);

        // Display matching images
        displayMatchingImages(matchingItems);
      })
      .catch(function (error) {
        // Handle errors loading the second dataset
        console.error("Error loading second dataset:", error);
      });
  })
  .catch(function (error) {
    // Handle errors loading the first dataset
    console.error("Error loading first dataset:", error);
  });

// ----------- FUNCTIONS -----------
// Function to find matching items based on specific properties
function findMatchingItems(json1, json2, prop1, prop2) {
  const matches = [];
  for (let item1 of json1) {
    for (let item2 of json2) {
      // Comparing values of specified properties
      if (item1.metadata[prop1] === item2[prop2]) {
        matches.push({ item1, item2 });
      }
    }
  }
  return matches;
}

// CARDS
//---------------APP FUNCTION---------------
// this function creates all of our DOM elements
function displayMatchingImages(matchingItems) {
  // select a <div> with an id of "app"
  // this is where we want all of our images to be added
  let app = d3.select("#app").text("");

  //---------------CARDS---------------
  // define "cards" for each matching item
  let card = app
    .selectAll("div.card")
    .data(matchingItems)
    .join("div")
    .attr("class", "card");

  card
    .append("p")
    .attr("class", "renderer")
    .text((d) => d.item1.metadata.renderer);

  card
    .append("h3")
    .attr("class", "attribution")
    .text((d) => d.item2.attribution);

  // create a div with a class of "image" and populate it with an <img/> tag that contains our filepath
  card
    .append("div")
    .attr("class", "image")
    .append("img")
    .attr("src", (d) => {
      return d.item2.imagematch;
    });
}
