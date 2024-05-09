// --------------------------------------------------------
// GLOBAL VARIABLES
// --------------------------------------------------------

let tokenMap = {}; // from NLP python similarity results
let objectInfoMap = {}; // from NGA appended data

// --------------------------------------------------------
// PROCESS TOKENS
// --------------------------------------------------------

function processTokens(data) {
  let localTokenMap = {};
  if (!data) {
    console.error("Data is undefined or null");
    return localTokenMap;
  }

  data.forEach((item) => {
    if (!item.tokens) {
      // console.error("Tokens are undefined for object_id:", item.object_id);
      return; // Skip this iteration
    }

    item.tokens.forEach((token) => {
      let sectionsMap = {}; // Ensure a new map for each token

      if (item.similarity_results && item.similarity_results[token]) {
        for (let sectionName in item.similarity_results[token]) {
          sectionsMap[sectionName] = { entries: [] };
          item.similarity_results[token][sectionName].forEach((result) => {
            sectionsMap[sectionName].entries.push({
              matched_token: result.matched_token,
              similarity: result.similarity,
              section_id: result.section_id,
              section_name: result.section_name,
            });
          });
        }
      } else {
        // console.log(
        //   `No similarity results found for token: '${token}' in object_id ${item.object_id}`
        // );
        sectionsMap["default"] = {
          entries: [{ message: "(Catalog match not found)" }],
        };
      }

      localTokenMap[token] = localTokenMap[token] || [];
      localTokenMap[token].push({
        object_id: item.object_id,
        title: item.title,
        sections: sectionsMap,
      });
    });
  });
  // console.log("Processed localTokenMap:", localTokenMap);
  return localTokenMap;
}

// --------------------------------------------------------
// CREATE BUTTONS
// --------------------------------------------------------

function createButtons(tokenMap, objectInfoMap) {
  const container = document.getElementById("tokensContainer");
  let groupedTokens = {};

  Object.keys(tokenMap)
    .sort()
    .forEach((token) => {
      const firstLetter = token.charAt(0).toUpperCase();
      if (!groupedTokens[firstLetter]) {
        groupedTokens[firstLetter] = {};
      }
      groupedTokens[firstLetter][token] = tokenMap[token];
    });

  for (let letter in groupedTokens) {
    const section = document.createElement("div");
    const header = document.createElement("h3");
    // section.classList.add("alphabet-group");
    header.textContent = letter;
    section.appendChild(header);

    for (let token in groupedTokens[letter]) {
      const tokenContainer = document.createElement("div");
      section.id = `alphabet-${letter}`;
      section.classList.add(`alphabet-${letter}`);

      const button = document.createElement("button");
      button.textContent = token;
      button.classList.add("token-button");
      button.setAttribute("data-token", token); // Set token as data attribute for reference
      button.onclick = () => {
        // Setting up the event listener
        const isVisible = detailsDiv.style.display === "block";
        detailsDiv.style.display = isVisible ? "none" : "block";
        if (!isVisible) {
          displayObjects(
            token,
            groupedTokens[letter][token],
            detailsDiv,
            objectInfoMap
          );
        }
      };

      const detailsDiv = document.createElement("div");
      detailsDiv.id = `details-${token}`;
      detailsDiv.classList.add("details-container");
      detailsDiv.style.display = "none";

      tokenContainer.appendChild(button);
      tokenContainer.appendChild(detailsDiv);
      section.appendChild(tokenContainer);
    }
    container.appendChild(section);
  }
}

// --------------------------------------------------------
// DISPLAY OBJECTS
// --------------------------------------------------------

function normalizeText(text) {
  if (typeof text !== "string") {
    console.error("Expected a string but received:", text);
    return ""; // Return empty string or handle as needed
  }
  return text.toLowerCase().replace(/[^a-z0-9]/gi, "");
}

function highlightTokens(title, tokens) {
  if (!tokens || tokens.length === 0) {
    console.log("No tokens available for highlighting.");
    return title; // Return the title unmodified
  }

  const titleWords = title.split(/\s+/);
  return titleWords
    .map((word) => {
      const normalizedWord = normalizeText(word);
      const matchedToken = tokens.find((token) =>
        normalizedWord.includes(normalizeText(token))
      );
      return matchedToken
        ? `<span class="token-highlight">${word}</span>`
        : word;
    })
    .join(" ");
}

function handleButtonClick(token) {
  if (!token) {
    console.error("Token is undefined when button clicked");
    return;
  }
  const processedText = normalizeText(token);
  console.log(processedText);
}

// Adjust the main displayObjects function
function displayObjects(token, objects, detailsDiv, objectInfoMap) {
  detailsDiv.innerHTML = "";
  detailsDiv.classList.add("details-container");

  const header = document.createElement("h3");
  header.textContent = `Objects with Shared Word "${token}"`;
  detailsDiv.appendChild(header);

  const cardsContainer = document.createElement("div");
  cardsContainer.classList.add("cards-container");
  detailsDiv.appendChild(cardsContainer);

  objects.forEach((obj) => {
    if (!obj || !obj.title) {
      console.error("Object or title missing:", obj);
      return; // Skip this iteration
    }
    const objElement = document.createElement("div");
    objElement.id = `object-${obj.object_id}`;
    objElement.classList.add("object-container", "card");

    const idDiv = document.createElement("div");
    idDiv.classList.add("object-id");
    idDiv.innerHTML = `Object ID: ${obj.object_id}`;
    objElement.appendChild(idDiv);

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("object-title");
    objElement.appendChild(titleDiv);

    const artistInfo = objectInfoMap[obj.object_id];
    if (artistInfo) {
      const artistDiv = document.createElement("div");
      artistDiv.classList.add("artist-div");
      artistDiv.innerHTML = `by ${artistInfo.attribution}<br><br><img src="${artistInfo.imagematch}" alt="Image of ${obj.title}" class="image">`;
      objElement.appendChild(artistDiv);
    } else {
      const noArtistDiv = document.createElement("div");
      noArtistDiv.textContent = "Artist Info: Not available";
      objElement.appendChild(noArtistDiv);
    }

    let allTokens = [];
    if (obj.sections && Object.keys(obj.sections).length > 0) {
      Object.keys(obj.sections).forEach((sectionName) => {
        const section = obj.sections[sectionName];
        section.entries.forEach((entry) => {
          if (!allTokens.includes(entry.matched_token)) {
            allTokens.push(entry.matched_token); // Ensure unique tokens
          }
        });
      });
    } else {
      console.log(`No sections or tokens found for object: ${obj.object_id}`);
      // Optionally handle this case
    }

    // Apply token highlighting in the title
    titleDiv.innerHTML = highlightTokens(obj.title, allTokens);

    if (obj.sections && Object.keys(obj.sections).length > 0) {
      Object.keys(obj.sections).forEach((sectionName) => {
        const section = obj.sections[sectionName];
        const sectionDetails = document.createElement("div");
        sectionDetails.classList.add(
          "section-details",
          getSectionClass(sectionName)
        ); // Apply class for background color
        sectionDetails.innerHTML = sectionName;
        objElement.appendChild(sectionDetails);
      });
    } else {
      const noResultsDiv = document.createElement("div");
      noResultsDiv.textContent = "No similarity results available.";
      objElement.appendChild(noResultsDiv);
    }
    console.log("Processing title:", obj.title);

    cardsContainer.appendChild(objElement);
  });
}

function extractUniqueTokens(data) {
  let uniqueTokens = new Set(); // Use a Set to automatically handle uniqueness

  data.forEach((item) => {
    item.tokens.forEach((token) => {
      uniqueTokens.add(token); // Add each token to the Set
    });
  });

  return Array.from(uniqueTokens); // Convert Set back to Array for easier processing later
}

function getSectionClass(sectionName) {
  // ADD SECTION CSS STYLES
  const sectionClassMap = {
    "Textiles Costume and Jewelry": "textile",
    "The Art and Design of Utopian and Religious Communities": "utopian",
    "Architecture and Naive Art": "architecture",
    "Tools Hardware Firearms and Vehicles": "tool",
    "Domestic Utensils": "domestic",
    "Furniture and Decorative Accessories": "furniture",
    "Wood Carvings and Weathervanes": "wood",
    "Ceramics and Glass": "ceramic",
    "Silver Copper Pewter and Toleware": "silver",
    "Toys and Musical Instruments": "toy",
  };

  return sectionClassMap[sectionName] || null; // Return null if no specific class is found
}

// --------------------------------------------------------
// INITIALIZE APP - fetchTokenMap(), fetchObjectInfo()
// --------------------------------------------------------

function initializeApp() {
  Promise.all([fetchTokenMap(), fetchObjectInfo()])
    .then((results) => {
      const [tokenMap, objectInfoMap] = results;
      // console.log("Final Token Map after fetch:", tokenMap); // Additional log for final check
      // console.log("Final Object Info Map:", objectInfoMap); // Confirm object info map
      if (tokenMap && objectInfoMap) {
        createButtons(tokenMap, objectInfoMap);
      } else {
        console.error("Failed to initialize maps:", {
          tokenMap,
          objectInfoMap,
        });
      }
    })
    .catch((error) => {
      console.error("Error initializing the application:", error);
    });
}

// --------------------------------------------------------
// FETCH TOKEN DATA (for buttons)
// --------------------------------------------------------

function fetchTokenMap() {
  return fetch("token_section_similarity_match.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // console.log("Fetched TOKEN data:", data); // Log raw data
      return processTokens(data); // Process and return tokenMap
    })
    .then((processedTokenMap) => {
      // console.log("Processed Token Map after processing:", processedTokenMap); // Log processed data
      return processedTokenMap; // Pass processed data to the next promise chain
    })
    .catch((error) => {
      console.error("Error fetching or processing the token data:", error);
      return {}; // Return an empty object to handle errors gracefully
    });
}

// --------------------------------------------------------
// FETCH NGA DATA (attribution, url, etc.)
// --------------------------------------------------------
function fetchObjectInfo() {
  return fetch("IoAD_merged_geo_data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // console.log("Fetched NGA OBJECT data:", data); // Log the raw data received
      data.forEach((item) => {
        const modifiedImageUrl = item.imagematch.replace("200,200", "500,500");
        objectInfoMap[item.objectid] = {
          // Update the global objectInfoMap directly
          attribution: item.attribution,
          imagematch: item.imagematch,
          imagematch: modifiedImageUrl,
        };
      });
      // console.log("Processed objectInfoMap:", objectInfoMap); // Log the processed map
      return objectInfoMap; // Return the updated map
    })
    .catch((error) => {
      console.error("Failed to load artist info:", error);
      return {}; // Return an empty object to handle errors gracefully
    });
}

// INITIALIZE APP
initializeApp();
