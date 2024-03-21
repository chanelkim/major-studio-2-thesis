// original Smithsonian API example code provided by Daniel Sauter
// check API documentation for search here: https://edan.si.edu/openaccess/apidocs/#api-search-search

// DEFINITIONS: https://edan.si.edu/openaccess/docs/more.html

// put your API key here;
const apiKey = "cR993Jr3eLTyxizxqZ6zaLCjGq0JAKe7s84Cbcjw";

// search base URL
const searchBaseURL = "https://api.si.edu/openaccess/api/v1.0/search";

const dates = [
  "0-00s",
  "0?00s",
  "1000s",
  "100s",
  "1100s",
  "1200s",
  "1300s",
  "1400s",
  "1500s",
  "1510s",
  "1520s",
  "1530s",
  "1540s",
  "1550s",
  "1560s",
  "1570s",
  "1580s",
  "1590s",
  "1600s",
  "1610s",
  "1620s",
  "1630s",
  "1640s",
  "1650s",
  "1660s",
  "1670s",
  "1680s",
  "1690s",
  "1700s",
  "1710s",
  "1720s",
  "1730s",
  "1740s",
  "1750s",
  "1760s",
  "1770s",
  "1780s",
  "1790s",
  "1800s",
  "1810s",
  "1820s",
  "1830s",
  "1840s",
  "1850s",
  "1860s",
  "1870s",
  "1880s",
  "1890s",
  "1900s",
];

// Constructing the search query
// const search = `Flowers AND unit_code:"CHNDM" AND object_type:"Embroidery (visual works)" AND online_media_type:"Images"`;
const search = `object_type:"Clay" `;

// https://collections.si.edu/search/results.htm?q=Flowers&view=grid&fq=data_source%3A%22Cooper+Hewitt%2C+Smithsonian+Design+Museum%22&fq=online_media_type%3A%22Images%22&media.CC0=true&fq=object_type:%22Embroidery+%28visual+works%29%22

// search: fetches an array of terms based on term category
function fetchSearchData(searchTerm, date) {
  const mediaType = `AND online_media_type:"Images" `;
  const timeRange = `AND date:${date}`;
  let url =
    searchBaseURL +
    "?api_key=" +
    apiKey +
    "&q=" +
    searchTerm +
    mediaType +
    timeRange;
  console.log(url);
  window
    .fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

for (const date of dates) {
  fetchSearchData(search, date);
}

// // search: fetches an array of terms based on term category
// function fetchSearchData(searchTerm) {
//   let url = searchBaseURL + "?api_key=" + apiKey + "&q=" + searchTerm;
//   console.log(url);
//   window
//     .fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

// fetchSearchData(search);
// console.log(search);

// CARDS
//---------------APP FUNCTION---------------
// this function creates all of our DOM elements
function displayResults(results) {
  // select a <div> with an id of "app"
  // this is where we want all of our images to be added
  let app = d3.select("#app").text("");

  //---------------CARDS---------------
  // define "cards" for each matching item
  let card = app
    .selectAll("div.card")
    .data(results)
    .join("div")
    .attr("class", "card");

  // card
  //   .append("p")
  //   .attr("class", "date")
  //   // .text((d) => d.);
  //   .text((d) => {
  //     return `date: ${d.}`;
  //   });

  // // create a div with a class of "image" and populate it with an <img/> tag that contains our filepath
  // card
  //   .append("div")
  //   .attr("class", "image")
  //   .append("img")
  //   .attr("src", (d) => {
  //     return d.;
  //   });
}
