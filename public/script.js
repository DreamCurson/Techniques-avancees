const urlParams = new URLSearchParams(window.location.search);
const categorie = urlParams.get("categorie");
// console.log(categorie);

fetch(`/data/${categorie}`)
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("data-container");
    const status = data["status"];

    if (status !== "ok") {
      container.innerHTML = "Aucune données trouvé à cette catégorie.";
      return;
    }

    // author, content, description, publishedAt, source title, url, urlToImage

    const entries = Object.entries(status).slice(0, 10);
    container.innerHTML = `
      <h2>${categorie.toUpperCase()}</h2>
      <ul class="news-list">
        ${data.articles
          .map(
            (article) => `
            <li class="news-item">
              <img src="${article.urlToImage || ""}" alt="Image" class="news-image"/>
              <h3 class="news-title">
                <a href="${article.url}" target="_blank">${article.title}</a>
              </h3>
              <p class="news-description">${article.description || ""}</p>
              <p class="news-source"><em>Source: ${article.source.name}</em></p>
            </li>
          `,
          )
          .join("")}
      </ul>
    `;
  })
  .catch((err) => {
    document.getElementById("data-container").innerText =
      "Erreur lors de la récupération des données";
  });
