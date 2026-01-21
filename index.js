const express = require("express");
const app = express();
const fs = require("fs");
const request = require("request");
const config = require("./config.js");
const path = require("path");
// NewsAPI client
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(config.API_KEY);

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

app.get("/all", function (req, res) {
  newsapi.v2
    .everything({
      q: "canada",
      sortBy: "publishedAt",
    })
    .then((response) => {
      if (response.status !== "ok") {
        return res
          .status(500)
          .send("Erreur lors de la récupération des données");
      }

      fs.writeFile(
        `data/canada.json`,
        JSON.stringify(response, null, 2),
        (err) => {
          if (err) {
            return res
              .status(500)
              .send("Erreur lors de l'enregistrement du fichier");
          }

          res.redirect(`/view?categorie=canada`);
        },
      );
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erreur lors de la récupération des données");
    });
});

app.get("/categorie=:id", function (req, res) {
  const categorie = req.params.id;

  newsapi.v2
    .everything({
      q: categorie,
      language: "fr",
      sortBy: "publishedAt",
    })
    .then((response) => {
      if (response.status !== "ok") {
        return res
          .status(500)
          .send("Erreur lors de la récupération des données");
      }

      fs.writeFile(
        `data/${categorie}.json`,
        JSON.stringify(response, null, 2),
        (err) => {
          if (err) {
            return res
              .status(500)
              .send("Erreur lors de l'enregistrement du fichier");
          }

          res.redirect(`/view?categorie=${categorie}`);
        },
      );
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erreur lors de la récupération des données");
    });
});

// Formulaire de recherche
app.get("/search", (req, res) => {
  const categorie = req.query.q;

  if (!categorie) {
    return res.status(400).send("Mot-clé manquant");
  }

  res.redirect(`/categorie=${encodeURIComponent(categorie)}`);
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
    if (err) return res.status(404).send({ error: "Data non trouvée" });
    res.json(JSON.parse(data));
  });
});

const PORT = config.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
