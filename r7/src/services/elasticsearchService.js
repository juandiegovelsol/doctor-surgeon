// src/services/elasticsearchService.js
import { Client } from "@elastic/elasticsearch";

const elasticClient = new Client({
  node: "https://3ca0c4f60585400fb7d751dbdf2c7e1c.us-central1.gcp.cloud.es.io:443", // Replace with your Elasticsearch URL
  // ...(other configurations like auth if needed)
});

export default elasticClient;
