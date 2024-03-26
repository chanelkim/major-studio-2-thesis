// set the dimensions and margins of the graph
var margin = { top: 40, right: 40, bottom: 40, left: 40 };
// Get the dimensions of the user's screen
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

// Calculate the width and height of the chart area, taking into account the margins
var width = screenWidth - margin.left - margin.right;
var height = screenHeight - margin.top - margin.bottom;

// Load the JSON files
const stemmedWordsPath = "../data/textLinks-results-v2-with-objectids.json"; // Contains word stems and object IDs
const titlesDataPath = "../data/IoAD_merged_geo_data.json"; // Contains titles and other data

// Use D3.js to load the stemmed words JSON file
d3.json(stemmedWordsPath).then((stemmedWordsArray) => {
  console.log("Stemmed Words Array:", stemmedWordsArray);

  // Create a set of stemmed words for efficient matching
  const stemmedWordsSet = new Set(
    stemmedWordsArray.map((item) => item.Word.toLowerCase())
  );

  // Use D3.js to load the titles JSON file
  d3.json(titlesDataPath).then((titlesData) => {
    console.log("Titles Data:", titlesData);

    // Create a map for efficient title lookup by object ID
    const titleMap = new Map(titlesData.map((item) => [item.objectid, item])); // Store the entire object as the value

    // // Array to store matched data
    // const matchedData = [];

    // Array to store matched data (grouped by stemmedWord)
    const groupedMatchedData = {};

    // Loop through each stemmed word object
    stemmedWordsArray.forEach((stemmedWordObj) => {
      const stemmedWord = stemmedWordObj.Word.toLowerCase();

      // Check if the stemmed word is in the titles data
      if (stemmedWordsSet.has(stemmedWord)) {
        // Get the object IDs associated with the stem
        const objectIDs = stemmedWordObj.ObjectIDs;

        // Create a group for the stemmed word if it doesn't exist
        if (!groupedMatchedData[stemmedWord]) {
          groupedMatchedData[stemmedWord] = [];
        }

        // Find matching titles for each object ID and add to the group
        objectIDs.forEach((objectID) => {
          if (titleMap.has(objectID)) {
            const titleObj = titleMap.get(objectID);
            const title = titleObj.title;
            const imageUrl = titleObj.imagematch;

            groupedMatchedData[stemmedWord].push({
              word: stemmedWord,
              title: title,
              objectID: objectID,
              imageUrl: imageUrl,
              // ... other properties as needed
            });
          }
        });
      }
    });

    // Now groupedMatchedData is an object where keys are stemmed words and values are arrays of matched objects
    console.log("Grouped Matched Data:", groupedMatchedData);

    // // Loop through each stemmed word object
    // stemmedWordsArray.forEach((stemmedWordObj) => {
    //   const stemmedWord = stemmedWordObj.Word.toLowerCase();

    //   // Check if the stemmed word is in the titles data
    //   if (stemmedWordsSet.has(stemmedWord)) {
    //     // Get the object IDs associated with the stem
    //     const objectIDs = stemmedWordObj.ObjectIDs;

    //     // Find matching titles for each object ID
    //     objectIDs.forEach((objectID) => {
    //       if (titleMap.has(objectID)) {
    //         const titleObj = titleMap.get(objectID); // Retrieve the entire object from the map
    //         const title = titleObj.title;
    //         const imageUrl = titleObj.imagematch; // Access imagematch from the object

    //         // Add matched data to the array
    //         matchedData.push({
    //           word: stemmedWord,
    //           title: title,
    //           objectID: objectID,
    //           imageUrl: imageUrl,
    //           // ... other properties as needed
    //         });
    //       }
    //     });
    //   }
    // });

    // Process and display groupedMatchedData
    function displayGroupedData(groupedMatchedData) {
      // Select the container where you want to display the groups
      const container = d3.select("#container");

      // Clear any existing content
      container.text("");

      // Iterate through each stemmed word group
      for (const stemmedWord in groupedMatchedData) {
        const groupData = groupedMatchedData[stemmedWord];

        // Create a group container
        const groupContainer = container
          .append("div")
          .attr("class", "group-container");

        // Add a label for the stemmed word
        groupContainer.append("h3").text(`Stemmed Word: ${stemmedWord}`);

        // Use "let card = groupContainer" logic
        let card = groupContainer
          .selectAll("div.card")
          .data(groupData)
          .join("div")
          .attr("class", "card");

        // Display the matched images within the group
        card
          .append("div")
          .attr("class", "image")
          .append("img")
          .attr("src", (d) => d.imageUrl);

        // card
        //   .append("p")
        //   .attr("class", "meta-data")
        //   .html((d) => {
        //     return `
        //           Title: ${d.title},
        //           Object ID: ${d.objectID}
        //         `;
        //   });
      }
    }
    displayGroupedData(groupedMatchedData);
  });
});
