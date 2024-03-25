// API Key: Approval still pending; confirmed by other applicants: https://community.etsy.com/t5/Technical-Issues/API-Key-pending-4-days-later-and-no-response-from-Etsy/td-p/137663917

async function fetchData() {
  try {
    const API_KEY = "key"; // Replace 'YOUR_API_KEY' with your actual Etsy API key

    const response = await fetch(
      "https://openapi.etsy.com/v2/listings/active",
      {
        headers: {
          "x-api-key": API_KEY,
        },
      }
    );

    const data = await response.json();
    console.log(data);

    // Accessing the results array
    const results = data.results;
    // Handle the results here
    results.forEach((listing) => {
      console.log(listing.title);
      // Access other properties as needed
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
