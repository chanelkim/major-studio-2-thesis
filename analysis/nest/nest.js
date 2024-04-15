async function displayImages() {
  const metadataResponse = await fetch("IoAD_merged_geo_data.json");
  const hierarchyResponse = await fetch("updated_categories.json");

  const metadata = await metadataResponse.json();
  const hierarchy = await hierarchyResponse.json();

  // Object to easily look up image URLs by objectid
  const imageIndex = {};
  metadata.forEach((item) => {
    imageIndex[item.objectid] = item.imagematch;
  });

  let currentLevel = 0;
  const levelNames = ["Section", "Category", "Subcategory", "Type"];

  function processHierarchyLevel(object, parentElement) {
    for (const key in object) {
      // Create a container element for the current level
      const levelDiv = document.createElement("div");
      levelDiv.textContent = key;
      //   levelDiv.classList.add("collapsible");

      // Create a nested container for content
      const contentDiv = document.createElement("div");
      contentDiv.classList.add("collapsible-content");
      levelDiv.appendChild(contentDiv);

      // Check if ObjectIDs exist
      if (object[key].ObjectIDs) {
        // Nested element creation
        const levelName = levelNames[currentLevel];
        const nestedElement = document.createElement("div"); // Adjust tag as needed
        nestedElement.classList.add(levelName.toLowerCase()); // Add class for styling
        nestedElement.textContent = `${levelName}: ${key}`;

        contentDiv.appendChild(nestedElement);

        const objectIds = object[key].ObjectIDs;

        objectIds.forEach((objectid) => {
          if (imageIndex[objectid]) {
            const img = document.createElement("img");
            img.src = imageIndex[objectid];
            contentDiv.appendChild(img);
          }
        });
      }

      // Only append if it's not metadata or specific categories
      if (
        key !== "part" &&
        key !== "microfiche-num" &&
        key !== "catalogid" &&
        key !== "ObjectIDs" &&
        key !== "Oversize Renderings" &&
        key !== "Giant Renderings"
      ) {
        parentElement.appendChild(levelDiv);
      }

      // Event Listener for Collapsing
      levelDiv.addEventListener("click", function () {
        this.classList.toggle("active"); // Toggle for styling (optional)
        const content = this.querySelector(".collapsible-content");
        content.classList.toggle("show");
      });

      // Go to the next level
      currentLevel++;
      processHierarchyLevel(object[key], levelDiv);
      currentLevel--;
    }
  }

  // Create initial container for the section
  const sectionContainer = document.createElement("div");
  document.body.appendChild(sectionContainer);

  // Start processing, specify the section to load
  let sectionToLoad = "Textiles Costume and Jewelry";
  processHierarchyLevel(hierarchy[sectionToLoad], sectionContainer); // Pass the container
}

displayImages();
