// const API_URL = "https://api.collection.cooperhewitt.org/rest/";
// // console.log(API_URL);
// const API_KEY = "657c180a00b71ad5bf34d5f64f282a99"; // Replace 'YOUR_API_KEY' with your actual API key

// // Make GET request to API endpoint
// fetch(
//   `${API_URL}?method=cooperhewitt.objects.getObjects&access_token=${API_KEY}&format=json`
// )
//   .then(function (response) {
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//     // Process the API response data here
//   })
//   .catch(function (error) {
//     console.error("There was a problem with the fetch operation:", error);
//   });

// Source: https://observablehq.com/@hepplerj/cooper-hewitt-api
async function fetchDataAndProcess() {
  try {
    query = "Decorative";
    token = "657c180a00b71ad5bf34d5f64f282a99";
    url =
      "https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.exhibitions.getObjects&access_token=" +
      `${token}` +
      "&query=" +
      `${query}`;
    // Fetch data from the API endpoint
    let response = await fetch(url);
    // Parse the JSON response
    let data = await response.json();
    // Access the 'objects' property
    objects = data.objects;
    console.log(objects);
  } catch (error) {
    console.error("Error fetching and processing data:", error);
  }
}
// Call the async function to fetch data and process it
fetchDataAndProcess();
