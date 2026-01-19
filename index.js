const express = require("express");
const app = express();
const port = 8081;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(port, () => {
  console.log(`News app listening at http://localhost:${port}`);
});
