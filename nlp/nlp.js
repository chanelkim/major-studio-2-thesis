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
      console.error("Tokens are undefined for object_id:", item.object_id);
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
        console.log(
          `No similarity results found for token: '${token}' in object_id ${item.object_id}`
        );
        // Optionally, you can handle this situation, e.g., set a default message or indicator
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
  console.log("Processed localTokenMap:", localTokenMap);
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
    header.textContent = letter;
    section.appendChild(header);

    for (let token in groupedTokens[letter]) {
      const tokenContainer = document.createElement("div");

      const button = document.createElement("button");
      button.textContent = token;
      button.classList.add("token-button");

      const detailsDiv = document.createElement("div");
      detailsDiv.id = `details-${token}`;
      detailsDiv.classList.add("details-container");
      detailsDiv.style.display = "none";

      button.onclick = () => {
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
    const objElement = document.createElement("div");
    objElement.id = `object-${obj.object_id}`;
    objElement.classList.add("object-container", "card");

    const idDiv = document.createElement("div");
    idDiv.classList.add("object-id");
    idDiv.innerHTML = `<strong>Object ID:</strong> ${obj.object_id}`;
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
          allTokens.push(entry.matched_token); // Collect all tokens from entries
        });
      });
    }

    // Highlight tokens in the title that contain any token in the sections
    const titleWords = obj.title.split(" ");
    titleDiv.innerHTML = titleWords
      .map((word) => {
        let wordLower = word.toLowerCase();
        const matchedToken = allTokens.find((token) =>
          wordLower.includes(token)
        );
        if (matchedToken) {
          return `<span class="token-highlight">${word}</span>`;
        }
        return word;
      })
      .join(" ");

    if (obj.sections && Object.keys(obj.sections).length > 0) {
      Object.keys(obj.sections).forEach((sectionName) => {
        const section = obj.sections[sectionName];
        const sectionDetails = document.createElement("div");
        sectionDetails.classList.add("section-details");
        sectionDetails.classList.add(getSectionClass(sectionName)); // Apply class for background color
        sectionDetails.innerHTML = `${sectionName}`;
        objElement.appendChild(sectionDetails);
      });
    } else {
      const noResultsDiv = document.createElement("div");
      noResultsDiv.textContent = "No similarity results available.";
      objElement.appendChild(noResultsDiv);
    }

    cardsContainer.appendChild(objElement);
  });
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
      console.log("Final Token Map after fetch:", tokenMap); // Additional log for final check
      console.log("Final Object Info Map:", objectInfoMap); // Confirm object info map
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
      console.log("Fetched TOKEN data:", data); // Log raw data
      return processTokens(data); // Process and return tokenMap
    })
    .then((processedTokenMap) => {
      console.log("Processed Token Map after processing:", processedTokenMap); // Log processed data
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
      console.log("Fetched NGA OBJECT data:", data); // Log the raw data received
      data.forEach((item) => {
        objectInfoMap[item.objectid] = {
          // Update the global objectInfoMap directly
          attribution: item.attribution,
          imagematch: item.imagematch,
        };
      });
      console.log("Processed objectInfoMap:", objectInfoMap); // Log the processed map
      return objectInfoMap; // Return the updated map
    })
    .catch((error) => {
      console.error("Failed to load artist info:", error);
      return {}; // Return an empty object to handle errors gracefully
    });
}

// INITIALIZE APP
initializeApp();
