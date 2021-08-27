const axios = require("axios");

module.exports.getContent = async () => {
  const credentials = Buffer.from(
    "ck_457b25145fdbf44006545ab5864b6f326a7ddf2b:cs_9f38a2c9fdde038f4e1ad6a3f6e1e1a52a156618"
  ).toString("base64");
  const basicAuth = `Basic Y2tfNDU3YjI1MTQ1ZmRiZjQ0MDA2NTQ1YWI1ODY0YjZmMzI2YTdkZGYyYjpjc185ZjM4YTJjOWZkZGUwMzhmNGUxYWQ2YTNmNmUxZTFhNTJhMTU2NjE4`;
  console.log("Here", credentials);
  try {
    const rawProducts = (await axios.get(
      "https://services.etin.space/notes/wp-json/wc/v3/products",
      {
        auth: {
          username: "ck_457b25145fdbf44006545ab5864b6f326a7ddf2b",
          password: "cs_9f38a2c9fdde038f4e1ad6a3f6e1e1a52a156618",
        },
      }
    )).data;
    const products = rawProducts.map((product) => ({
      title: product.name,
      imageUrl: product.images?.[0]?.src ?? "https://via.placeholder.com/150"
    }))
    return axios
      .post("http://0.0.0.0:3030/batch", {
        content: {
          name: "ProductList",
          data: {
            title: "Products",
            items: products,
          },
        },
      })
      .then(({ data }) => {
        return data.results.content;
      });
  } catch (err) {
    console.log(err);
  }
};
