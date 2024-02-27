const ebayAppID = "ChanelKi-Thesis-SBX-6aeae8422-a9c74bfb";
const endpoint =
  "https://svcs.sandbox.ebay.com/services/search/FindingService/v1"; // SANDBOX

// Function to perform API request
async function searchEbay(keyword) {
  const url =
    `${endpoint}?OPERATION-NAME=findItemsByKeywords` +
    // `${endpoint}?OPERATION-NAME=findItemsByCategories` +
    `&SERVICE-VERSION=1.0.0` +
    `&SECURITY-APPNAME=${ebayAppID}` +
    `&RESPONSE-DATA-FORMAT=JSON` +
    `&keywords=${encodeURIComponent(keyword)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from eBay:", error);
    return null;
  }
}

// Example usage
const keyword = "antique";
searchEbay(keyword)
  .then((data) => {
    console.log(data); // Process the data here
  })
  .catch((error) => {
    console.error("Error:", error);
  });
