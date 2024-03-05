// const ebayAppID = "ChanelKi-Thesis-SBX-6aeae8422-a9c74bfb";
// const endpoint =
//   "https://svcs.sandbox.ebay.com/services/search/FindingService/v1"; // SANDBOX

// // Function to perform API request
// async function searchEbay(keyword) {
//   const url =
//     `${endpoint}?OPERATION-NAME=findItemsByKeywords` +
//     // `${endpoint}?OPERATION-NAME=findItemsByCategories` +
//     `&SERVICE-VERSION=1.0.0` +
//     `&SECURITY-APPNAME=${ebayAppID}` +
//     `&RESPONSE-DATA-FORMAT=JSON` +
//     `&keywords=${encodeURIComponent(keyword)}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching data from eBay:", error);
//     return null;
//   }
// }

// // Example usage
// const keyword = "ceramic";
// searchEbay(keyword)
//   .then((data) => {
//     console.log(data); // Process the data here
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

// // Define your eBay API credentials
// const CLIENT_ID = "ChanelKi-Thesis-SBX-6aeae8422-a9c74bfb";
// const CLIENT_SECRET = "SBX-aeae84225e6e-3ac8-4c19-a50a-400f";

// // Define the API endpoint and parameters for fetching categories
// const endpoint =
//   "https://api.ebay.com/commerce/taxonomy/v1_beta/category_tree/0";
// const queryParams = new URLSearchParams({
//   marketplace_id: "EBAY-US", // Example marketplace ID
// });

// // Construct the request headers with authentication
// const headers = {
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${CLIENT_ID}:${CLIENT_SECRET}`,
// };

// // Make the API request to fetch categories
// fetch(`${endpoint}?${queryParams}`, {
//   method: "GET",
//   headers: headers,
// })
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then((data) => {
//     // Process the response data
//     console.log("Categories from eBay Taxonomy API:", data);
//   })
//   .catch((error) => {
//     console.error("Error fetching categories from eBay Taxonomy API:", error);
//   });

// Define your eBay API credentials
const DEV_ID = "0c1498a0-5885-4ba1-8ba1-9dccc3453249";
const APP_ID = "ChanelKi-Thesis-SBX-6aeae8422-a9c74bfb";
const CERT_ID = "SBX-aeae84225e6e-3ac8-4c19-a50a-400f";

// Define the API endpoint for fetching marketplace IDs
const endpoint = "https://api.sandbox.ebay.com/ws/api.dll";

// Construct the request body for fetching marketplaces
const requestBody = `
<?xml version="1.0" encoding="utf-8"?>
<GeteBayDetailsRequest xmlns="urn:ebay:apis:eBLBaseComponents">
  <RequesterCredentials>
    <eBayAuthToken>${DEV_ID}</eBayAuthToken>
  </RequesterCredentials>
  <DetailName>Taxonomy</DetailName>
</GeteBayDetailsRequest>`;

// Make the API request to fetch marketplace IDs
fetch(endpoint, {
  method: "POST",
  headers: {
    "Content-Type": "text/xml",
    "X-EBAY-API-COMPATIBILITY-LEVEL": "1155", // Update compatibility level if needed
  },
  body: requestBody,
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
  })
  .then((data) => {
    // Process the response data
    console.log("Marketplace IDs:", data);
  })
  .catch((error) => {
    console.error("Error fetching marketplace IDs:", error);
  });
