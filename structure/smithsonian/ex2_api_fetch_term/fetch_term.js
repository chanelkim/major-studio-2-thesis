// original Smithsonian API example code provided by Daniel Sauter
// check API documentation for terms here: http://edan.si.edu/openaccess/apidocs/#api-search-terms

// DEFINITIONS: https://edan.si.edu/openaccess/docs/more.html

// put your API key here;
const apiKey = "cR993Jr3eLTyxizxqZ6zaLCjGq0JAKe7s84Cbcjw";

// Access to terms by term category (I.e. online_media_type > Images)
const termBaseURL = "https://api.si.edu/openaccess/api/v1.0/terms/";

// Other terms:
const termsArray = [
  "culture",
  "data_source",
  "date",
  "object_type",
  "online_media_type",
  "place",
  "topic",
  "unit_code",
];

// // search: fetches an array of terms based on term category
// function fetchTermsData(termCategory) {
//   let url = termBaseURL + termCategory + "?api_key=" + apiKey;
//   window
//     .fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data.response.terms);
//       console.log(
//         `There are ${data.response.terms.length} terms in the term category: ${termCategory}`
//       );
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

// fetchTermsData("unit_code");

// Gather all term results to pinpoint search terms for fetch_search.js
async function getAllTermsData() {
  const allTermsResults = [];

  for (const termCategory of termsArray) {
    try {
      const url = termBaseURL + termCategory + "?api_key=" + apiKey;
      const response = await fetch(url);
      const data = await response.json();

      // Gather and process the results for this term
      allTermsResults.push({
        terms: data.response.terms,
        termCategory,
      });

      // console.log(
      //   `There are ${data.response.terms.length} terms in the term category: ${termCategory}`
      // );
    } catch (error) {
      console.error(`Error fetching terms for ${termCategory}:`, error);
      // You might want to handle errors differently, e.g., store them for later analysis
    }
  }

  // After the loop, you have all the results in the allTermsResults array
  console.log(allTermsResults); // Do something with the aggregated results
}

getAllTermsData();

/* EXAMPLES

1 - culture:  8502 terms; i.e., 
"!Kung (African people)","'Uvean", "10th Naval District Steel Band","11th, 12th Centuries"

2 - data_source: 41 terms; i.e., "Anacostia Community Museum", "Anacostia Community Museum Archives", "Archives Center, National Museum of American History"

3 - date: 90 terms; i.e., "0-00s", "0?00s", "1000s", "100s"

4 - object_type: 166920 terms; i.e., "\"1000 Prescription\" Bottle", "\"Abadie\" rolling papers", "\"Blackhawk Films\" Box & 16mm Reel"

5 - online_media_type: 10 terms; i.e., "3D Models", "Catalog cards", "Electronic resource"

6 - place: 106888 terms; i.e., 
" Middle Awash, Ethiopia", "!Khuiset Delta (Namibia)", "\"Breezes\" Pergola Garden (Northeast Harbor, Maine)"

7 - topic: 114526 terms; i.e., "!Kung (African people)", "!Xõ language", "\"Daytime Dial\"", "\"Huskanaw\""

8 - unit_code (used for management of content): 47 terms; i.e.,  
"AAA", "AAG", "ACAH"
*/

/*
Task: Play around with the different categories listed here:
http://edan.si.edu/openaccess/apidocs/#api-search-terms
Questions: 
- What other media types are available? 
- How many cultures are represented?
- What acronyms for museums are there?

*/
