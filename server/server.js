// backend/server.js
const express = require("express");
const { Client } = require("@elastic/elasticsearch");
const cors = require("cors");
const app = express();
app.use(cors());
const port = 5000;

const elasticClient = new Client({
  node: "https://3ca0c4f60585400fb7d751dbdf2c7e1c.us-central1.gcp.cloud.es.io:443",
  // ...
});

app.get("/api/search", async (req, res) => {
  const searchTerm = req.query.q;
  console.log(searchTerm);
  if (!searchTerm) {
    return res.status(400).send({ error: "Search term is required" });
  }

  try {
    const response = await elasticClient.search({
      index: "library_catalog",
      query: {
        multi_match: {
          query: searchTerm,
          fields: ["title^3", "author", "isbn"],
        },
      },
    });
    res.json(response.hits.hits);
  } catch (error) {
    console.error("Error in /api/search:", error);
    res.status(500).send({ error: "Failed to fetch search results" });
  }
});

app.get("/api/autocomplete", async (req, res) => {
  const searchTerm = req.query.q;
  if (!searchTerm) {
    return res.status(400).send({ error: "Search term is required" });
  }

  try {
    const response = await elasticClient.search({
      index: "library_catalog",
      suggest: {
        text: searchTerm,
        title_suggest: {
          prefix: searchTerm,
          completion: {
            field: "title.suggest",
          },
        },
      },
    });
    const extractedSuggestions = response.suggest.title_suggest[0].options.map(
      (option) => option.text
    );
    res.json(extractedSuggestions);
  } catch (error) {
    console.error("Error in /api/autocomplete:", error);
    res.status(500).send({ error: "Failed to fetch autocomplete suggestions" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
