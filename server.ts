import Fastify from "fastify";
import HanziController from "./controllers/HanziController.js";

const app = Fastify({ logger: true });
app.get("/", async (req, res) => {
  res.type("text/html");
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Hanzi API Documentation</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: system-ui, sans-serif;
    background: #0e0e0e;
    color: #fff;
    padding: 2rem;
  }

  h1 {
    font-size: 2.8rem;
    text-align: center;
    margin-bottom: 1rem;
  }

  p {
    text-align: center;
    color: #ccc;
    margin-bottom: 2rem;
  }

  .container {
    max-width: 900px;
    margin: 0 auto;
  }

  .endpoint {
    background: #1a1a1a;
    border: 1px solid #333;
    padding: 1.5rem;
    border-radius: 10px;
    margin-bottom: 1.5rem;
  }

  .method {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 6px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .get { background: #0583f2; }
  .url {
    font-family: monospace;
    background: #111;
    padding: 4px 6px;
    border-radius: 4px;
    display: block;
    margin-bottom: 10px;
    color: #8cd2ff;
  }

  .desc {
    color: #ccc;
    margin-bottom: 10px;
  }

  pre {
    background: #111;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin-top: 10px;
    border: 1px solid #333;
  }
</style>
</head>
<body>

<div class="container">
  <h1>📘 Hanzi API Documentation</h1>
  <p>Simple REST API for Hanzi learning system</p>

  <!-- ====================== -->
  <!-- GET /hanzi -->
  <!-- ====================== -->
  <div class="endpoint">
    <span class="method get">GET</span>
    <span class="url">/hanzi</span>
    <div class="desc">Fetch all Hanzi data</div>

    <pre>{
  "data": [...],
  "message": "Data Success Retrieved"
}</pre>
  </div>

  <!-- ====================== -->
  <!-- GET /hanzi/details/:id -->
  <!-- ====================== -->
  <div class="endpoint">
    <span class="method get">GET</span>
    <span class="url">/hanzi/details/:id</span>
    <div class="desc">Fetch detailed info of a specific Hanzi by ID</div>

    <pre>{
  "message": "Data Success Retrieved",
  "data": {
    "id": 1,
    "hanzi": "木",
    "pinyin": "mù",
    "arti": "pohon"
  }
}</pre>
  </div>

  <!-- ====================== -->
  <!-- GET /hanzi/level/:id_level -->
  <!-- ====================== -->
  <div class="endpoint">
    <span class="method get">GET</span>
    <span class="url">/hanzi/level/:id_level</span>
    <div class="desc">Fetch Hanzi based on learning level</div>

    <pre>{
  "message": "Data Success Retrieved",
  "data": [...]
}</pre>
  </div>

  <!-- ====================== -->
  <!-- GET /hanzi/random -->
  <!-- ====================== -->
  <div class="endpoint">
    <span class="method get">GET</span>
    <span class="url">/hanzi/random</span>
    <div class="desc">Fetch a random Hanzi</div>

    <pre>{
  "message": "Random Hanzi Retrieved",
  "data": {
    "id": 4,
    "hanzi": "心",
    "pinyin": "xīn"
  }
}</pre>
  </div>

  <!-- ====================== -->
  <!-- GET /hanzi/search?q=木 -->
  <!-- ====================== -->
  <div class="endpoint">
    <span class="method get">GET</span>
    <span class="url">/hanzi/search?q=木</span>
    <div class="desc">Search Hanzi by keyword (hanzi character)</div>

    <pre>{
  "message": "Search Result",
  "data": [...]
}</pre>
  </div>

</div>

</body>
</html>
  `;
});

HanziController(app);

app.listen({ port: 3000 });
