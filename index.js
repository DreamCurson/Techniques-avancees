const express = require("express");
const app = express();
const fs = require("fs");
const request = require("request");
const config = require("./config.js");
const path = require("path");

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// API route to fetch all news
// app.get("/all", function (req, res) {
//   const categorie = req.params.id;
//   const url = `https://newsapi.org/v2/everything?q=canada&language=fr&apiKey=${config.API_KEY}`;

//   request.get({ url, json: true }, (err, response, data) => {
//     if (err || response.statusCode !== 200) {
//       return res.status(500).send("Error fetching data");
//     }

//     fs.writeFile(`data/all.json`, JSON.stringify(data), (err) => {
//       if (err) return res.status(500).send("Error saving file");
//       res.redirect(`/view?all`);
//     });
//   });
// });

// API route to fetch top news (anglais seulement)
// app.get("/top", function (req, res) {
//   const categorie = req.params.id;
//   const url = `https://newsapi.org/v2/top-headlines?language=en&pageSize=20&apiKey=${config.API_KEY}`;

//   request.get({ url, json: true }, (err, response, data) => {
//     if (err || response.statusCode !== 200) {
//       return res.status(500).send("Error fetching data");
//     }

//     fs.writeFile(`data/top.json`, JSON.stringify(data), (err) => {
//       if (err) return res.status(500).send("Error saving file");
//       res.redirect(`/view?top`);
//     });
//   });
// });

// API route to fetch data and save to JSON file
app.get("/categorie=:id", function (req, res) {
  const categorie = req.params.id;
  const url = `https://newsapi.org/v2/everything?q=${categorie}&language=fr&apiKey=${config.API_KEY}`;
  // https://newsapi.org/v2/everything?q=politique&language=fr&apiKey=
  request.get({ url, json: true }, (err, response, data) => {
    if (err || response.statusCode !== 200) {
      return res.status(500).send("Erreur lors de la récupération des données");
    }

    fs.writeFile(`data/${categorie}.json`, JSON.stringify(data), (err) => {
      if (err)
        return res
          .status(500)
          .send("Erreur lors de l'enregistrement du fichier");
      res.redirect(`/view?categorie=${categorie}`);
    });
  });
});

// Serve HTML page with stock data
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/view", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serve stock data as JSON for frontend to fetch
app.get("/data/:id", (req, res) => {
  const filePath = `${__dirname}/data/${req.params.id}.json`;
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(404).send({ error: "Data not found" });
    res.json(JSON.parse(data));
  });
});

const PORT = config.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
