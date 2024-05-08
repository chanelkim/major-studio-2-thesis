// function processTokens(data) {
//   let tokenMap = {};
//   data.forEach((item) => {
//     item.tokens.forEach((token) => {
//       if (!tokenMap[token]) {
//         tokenMap[token] = [];
//       }
//       tokenMap[token].push({
//         object_id: item.object_id,
//         title: item.title,
//       });
//     });
//   });
//   return tokenMap;
// }

function processTokens(data) {
  let tokenMap = {};
  if (!data) {
    // Check if data is undefined or null
    console.error("Data is undefined or null");
    return tokenMap; // Return empty map to prevent further errors
  }

  data.forEach((item) => {
    if (!item.tokens) {
      // Check if tokens array is undefined or null
      console.error("Tokens are undefined for object_id:", item.object_id);
      return; // Skip this iteration
    }

    item.tokens.forEach((token) => {
      if (!tokenMap[token]) {
        tokenMap[token] = [];
      }
      tokenMap[token].push({
        object_id: item.object_id,
        title: item.title,
        sections: item.similarity_results && item.similarity_results[token], // Check for undefined similarity_results
      });
    });
  });
  return tokenMap;
}

function createButtons(tokenMap) {
  const container = document.getElementById("tokensContainer");
  let groupedTokens = {};

  // Group tokens by the first letter
  Object.keys(tokenMap)
    .sort()
    .forEach((token) => {
      const firstLetter = token.charAt(0).toUpperCase();
      if (!groupedTokens[firstLetter]) {
        groupedTokens[firstLetter] = {};
      }
      groupedTokens[firstLetter][token] = tokenMap[token];
    });

  // Create sections and buttons
  for (let letter in groupedTokens) {
    const section = document.createElement("div");
    const header = document.createElement("h3");
    header.textContent = letter;
    section.appendChild(header);

    for (let token in groupedTokens[letter]) {
      const button = document.createElement("button");
      button.textContent = token;
      button.onclick = () =>
        displayObjects(token, groupedTokens[letter][token]);
      section.appendChild(button);
    }
    container.appendChild(section);
  }
}

function displayObjects(token, objects) {
  fetchObjectInfo().then((objectInfoMap) => {
    const detailsContainer = document.getElementById("detailsContainer");
    detailsContainer.innerHTML = "";
    const header = document.createElement("h3");
    header.textContent = `Objects with token "${token}":`;
    detailsContainer.appendChild(header);

    objects.forEach((obj) => {
      const objDetails = objectInfoMap[obj.object_id];
      if (objDetails) {
        // Check if details exist for this object ID
        const objElement = document.createElement("div");
        const artist = objDetails.attribution || "Unknown Artist";
        const imageUrl = objDetails.imagematch || "#";
        objElement.innerHTML = `ID: ${obj.object_id}, Title: ${obj.title}, Artist: ${artist} <br> <img src="${imageUrl}" alt="Image of ${obj.title}" style="width:100px;">`;
        detailsContainer.appendChild(objElement);
      } else {
        console.error(`No details found for object ID: ${obj.object_id}`);
      }
    });
  });
}

// LOAD NGA DATA (attribution, url, etc.)
let objectInfoMap = {};
// function fetchObjectInfo() {
//   return fetch("IoAD_merged_geo_data.json")
//     .then((response) => response.json())
//     .then((data) => {
//       let objectInfoMap = {};
//       data.forEach((item) => {
//         objectInfoMap[item.objectid] = {
//           // Ensure this key matches your object reference in `displayObjects`
//           attribution: item.attribution,
//           imagematch: item.imagematch,
//         };
//       });
//       return objectInfoMap;
//     })
//     .catch((error) => console.error("Failed to load artist info:", error));
// }
function fetchObjectInfo() {
  return fetch("IoAD_merged_geo_data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      let objectInfoMap = {};
      console.log("Received data:", data); // Log the raw data received
      data.forEach((item) => {
        objectInfoMap[item.objectid] = {
          attribution: item.attribution,
          imagematch: item.imagematch,
        };
      });
      console.log("Processed objectInfoMap:", objectInfoMap); // Log the processed map
      return objectInfoMap;
    })
    .catch((error) => {
      console.error("Failed to load artist info:", error);
    });
}

// LOAD TOKEN DATA (for buttons)
fetch("token_section_similarity_match.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Fetched data:", data); // Log the data to inspect it
    if (!data) {
      console.error("No data received");
      return; // Exit if no data
    }
    const tokenMap = processTokens(data);
    createButtons(tokenMap);
  })
  .catch((error) => {
    console.error("Error fetching or processing the JSON data:", error);
  });
