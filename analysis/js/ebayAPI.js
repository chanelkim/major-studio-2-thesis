// // Define your eBay API credentials
// const DEV_ID = "0c1498a0-5885-4ba1-8ba1-9dccc3453249";
// const APP_ID = "ChanelKi-Thesis-SBX-6aeae8422-a9c74bfb";
// const CERT_ID = "SBX-aeae84225e6e-3ac8-4c19-a50a-400f";

// // Define the API endpoint for fetching marketplace IDs
// const endpoint = "https://api.sandbox.ebay.com/ws/api.dll";

// // Construct the request body for fetching marketplaces
// const requestBody = `
// <?xml version="1.0" encoding="utf-8"?>
// <GeteBayDetailsRequest xmlns="urn:ebay:apis:eBLBaseComponents">
//   <RequesterCredentials>
//     <eBayAuthToken>${DEV_ID}</eBayAuthToken>
//   </RequesterCredentials>
//   <DetailName>Taxonomy</DetailName>
// </GeteBayDetailsRequest>`;

// // Make the API request to fetch marketplace IDs
// fetch(endpoint, {
//   method: "POST",
//   headers: {
//     "Content-Type": "text/xml",
//     "X-EBAY-API-COMPATIBILITY-LEVEL": "1155", // Update compatibility level if needed
//   },
//   body: requestBody,
// })
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return response.text();
//   })
//   .then((data) => {
//     // Process the response data
//     console.log("Marketplace IDs:", data);
//   })
//   .catch((error) => {
//     console.error("Error fetching marketplace IDs:", error);
//   });

/* NOTES 
API Explorer (Taxonomy API): 

------------ getDefaultCategoryTreeId ------------
https://api.ebay.com/commerce/taxonomy/v1/get_default_category_tree_id?marketplace_id=EBAY_US
Response Body:
{
  "categoryTreeId": "0",
  "categoryTreeVersion": "130"
}

------------ getCategoryTree ------------
https://api.ebay.com/commerce/taxonomy/v1/category_tree/0
SEE "data" folder

------------ getCategorySubtree ------------
https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=1
SEE "data" folder

------------ getCategorySuggestions ------------
https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_suggestions?q="earthenware"
Response Body: 
{
  "categorySuggestions": [
    {
      "category": {
        "categoryId": "262408",
        "categoryName": "Vases"
      },
      "categoryTreeNodeLevel": 3,
      "categoryTreeNodeAncestors": [
        {
          "categoryId": "262384",
          "categoryName": "Decorative Pottery & Glassware",
          "categoryTreeNodeLevel": 2,
          "categorySubtreeNodeHref": "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=262384"
        },
        {
          "categoryId": "870",
          "categoryName": "Pottery & Glass",
          "categoryTreeNodeLevel": 1,
          "categorySubtreeNodeHref": "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=870"
        }
      ]
    },
    {
      "category": {
        "categoryId": "262379",
        "categoryName": "Plates"
      },
      "categoryTreeNodeLevel": 3,
      "categoryTreeNodeAncestors": [
        {
          "categoryId": "262364",
          "categoryName": "Decorative Cookware, Dinnerware & Serveware",
          "categoryTreeNodeLevel": 2,
          "categorySubtreeNodeHref": "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=262364"
        },
        {
          "categoryId": "870",
          "categoryName": "Pottery & Glass",
          "categoryTreeNodeLevel": 1,
          "categorySubtreeNodeHref": "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=870"
        }
      ]
    },
    {
      "category": {
        "categoryId": "262372",
        "categoryName": "Cup & Saucers"
      },
      "categoryTreeNodeLevel": 3,
      "categoryTreeNodeAncestors": [
        {
          "categoryId": "262364",
          "categoryName": "Decorative Cookware, Dinnerware & Serveware",
          "categoryTreeNodeLevel": 2,
          "categorySubtreeNodeHref": "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=262364"
        },
        {
          "categoryId": "870",
          "categoryName": "Pottery & Glass",
          "categoryTreeNodeLevel": 1,
          "categorySubtreeNodeHref": "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=870"
        }
      ]
    },
    {
      "category": {
        "categoryId": "262376",
        "categoryName": "Jugs & Pitchers"
      },
      "categoryTreeNodeLevel": 3,
      "categoryTreeNodeAncestors": [
        {
          "categoryId": "262364",
          "categoryName": "Decorative Cookware, Dinnerware & Serveware",
          "categoryTreeNodeLevel": 2,
          "categorySubtreeNodeHref": "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=262364"
        },
        {
          "categoryId": "870",
          "categoryName": "Pottery & Glass",
          "categoryTreeNodeLevel": 1,
          "categorySubtreeNodeHref": "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=870"
        }
      ]
    },
    {
      "category": {
        "categoryId": "262366",
        "categoryName": "Bowls"
      },
      "categoryTreeNodeLevel": 3,
      "categoryTreeNodeAncestors": [
        {
          "categoryId": "262364",
          "categoryName": "Decorative Cookware, Dinnerware & Serveware",
          "categoryTreeNodeLevel": 2,
          "categorySubtreeNodeHref": "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=262364"
        },
        {
          "categoryId": "870",
          "categoryName": "Pottery & Glass",
          "categoryTreeNodeLevel": 1,
          "categorySubtreeNodeHref": "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=870"
        }
      ]
    },
    {
      "category": {
        "categoryId": "261628",
        "categoryName": "Sculptures & Figurines"
      },
      "categoryTreeNodeLevel": 3,
      "categoryTreeNodeAncestors": [
        {
          "categoryId": "13777",
          "categoryName": "Decorative Collectibles",
          "categoryTreeNodeLevel": 2,
          "categorySubtreeNodeHref": "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=13777"
        },
        {
          "categoryId": "1",
          "categoryName": "Collectibles",
          "categoryTreeNodeLevel": 1,
          "categorySubtreeNodeHref": "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=1"
        }
      ]
    },
    {
      "category": {
        "categoryId": "262380",
        "categoryName": "Platters"
      },
      "categoryTreeNodeLevel": 3,
      "categoryTreeNodeAncestors": [
        {
          "categoryId": "262364",
          "categoryName": "Decorative Cookware, Dinnerware & Serveware",
          "categoryTreeNodeLevel": 2,
          "categorySubtreeNodeHref": "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=262364"
        },
        {
          "categoryId": "870",
          "categoryName": "Pottery & Glass",
          "categoryTreeNodeLevel": 1,
          "categorySubtreeNodeHref": "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=870"
        }
      ]
    },
    {
      "category": {
        "categoryId": "261671",
        "categoryName": "Jugs & Pitchers"
      },
      "categoryTreeNodeLevel": 4,
      "categoryTreeNodeAncestors": [
        {
          "categoryId": "261667",
          "categoryName": "Dinnerware & Serveware",
          "categoryTreeNodeLevel": 3,
          "categorySubtreeNodeHref": "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=261667"
        },
        {
          "categoryId": "13905",
          "categoryName": "Kitchen & Home",
          "categoryTreeNodeLevel": 2,
          "categorySubtreeNodeHref": "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=13905"
        },
        {
          "categoryId": "1",
          "categoryName": "Collectibles",
          "categoryTreeNodeLevel": 1,
          "categorySubtreeNodeHref": "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=1"
        }
      ]
    },
    {
      "category": {
        "categoryId": "262365",
        "categoryName": "Other Pottery & Glass"
      },
      "categoryTreeNodeLevel": 2,
      "categoryTreeNodeAncestors": [
        {
          "categoryId": "870",
          "categoryName": "Pottery & Glass",
          "categoryTreeNodeLevel": 1,
          "categorySubtreeNodeHref": "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=870"
        }
      ]
    }
  ],
  "categoryTreeId": "0",
  "categoryTreeVersion": "130"
}

*/
