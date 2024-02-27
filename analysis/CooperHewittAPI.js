// Source: https://observablehq.com/@hepplerj/cooper-hewitt-api
async function fetchDataAndProcess() {
  try {
    query = "Product Design and Decorative Arts";
    // query = "decorative art";
    token = "657c180a00b71ad5bf34d5f64f282a99";
    url =
      "https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.exhibitions.getObjects&access_token=" +
      `${token}` +
      "&query=" +
      `${query}`;
    // Fetch data from the API endpoint
    let response = await fetch(url);
    // Parse the JSON response
    let api = await response.json();
    // Access the 'objects' property
    objects = api.objects;
    console.log(objects);
    displayImages(objects);
  } catch (error) {
    console.error("Error fetching and processing data:", error);
  }
}
// Call the async function to fetch data and process it
fetchDataAndProcess();

//---------------APP FUNCTION---------------
// this function creates all of our DOM elements
function displayImages(json) {
  // select a <div> with an id of "app"
  // this is where we want all of our images to be added
  let app = d3.select("#app").text("");

  // take our JSON and sort it
  // descending
  let data = json.sort((a, b) => (b.date > a.date ? 1 : -1));

  //---------------CARDS---------------
  // define "cards" for each item
  let card = app
    .selectAll("div.card")
    .data(data)
    .join("div")
    .attr("class", "card");

  card
    .append("p")
    .attr("class", "date")
    .text((d) => d.date);

  card
    .append("h3")
    .attr("class", "title")
    .text((d) => d.title);

  card
    .append("p")
    .attr("class", "medium")
    .text((d) => d.medium);

  // create a div with a class of "image" and populate it with an <img/> tag that contains our filepath
  card
    .append("div")
    .attr("class", "image")
    .append("img")
    .attr("src", (d) => {
      return d.images[0].n.url;
      // return d.images[0].b.url;
    });
}

/* From Cooper Hewitt Github:
https://github.com/cooperhewitt/collection/blob/4272b8fa73697845507ff40cafeb19310218c896/departments/353/474/97/35347497.json#L1
{
  "id": "35347497",
  "name": "Product Design and Decorative Arts",
  "count_objects": "33064",
  "short_name": "PDDA",
  "supersedes": "35347475",
  "superseded_by": "0"
}
*/
