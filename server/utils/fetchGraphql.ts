import fetch from "node-fetch";

function fetchGraphql(url: string) {
	return fetch(url, {
		method: "POST",
		headers: {
			accept: "application/json",
			"content-type": "application/json"
		},
		body: JSON.stringify({
			query: `
      query getAllProducts {
        allProducts {
          id
          productModel
        }
        allShops {
          id
          shopName
        }
        allCategories {
          id
          categoryDescription {
            categoryName
          }
        }
      }
      `
		})
	}).then((res) => {
		return res.json();
	});
}

export default fetchGraphql;
