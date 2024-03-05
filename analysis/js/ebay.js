// Use D3 to fetch and parse the JSON data
d3.json("EbaySample.json")
  .then((jsonData) => {
    // Extract items array from JSON
    const items = jsonData.findItemsByKeywordsResponse[0].searchResult[0].item;
    console.log(items);

    // Iterate over each item and display the image
    items.forEach((item) => {
      const galleryURL = item.galleryURL[0];
      //   const viewItemURL = item.viewItemURL[0];
      const img = document.createElement("img");
      img.src = galleryURL;
      document.body.appendChild(img); // Append image to the body, you can change this to the desired container
    });
  })
  .catch((error) => {
    console.error("Error fetching JSON:", error);
  });
