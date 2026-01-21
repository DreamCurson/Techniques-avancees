// Récupération de la valeur du paramètre "categorie" dans l'URL
const urlParams = new URLSearchParams(window.location.search);
const categorie = urlParams.get("categorie");

// Sélection du loader et du conteneur de données
const loader = document.getElementById("loader");
const container = document.getElementById("data-container");

// Récupération des données depuis le JSON correspondant à la catégorie
fetch(`/data/${categorie}`)
  .then((res) => res.json())
  .then((data) => {
    // Vérifier si le statut de la réponse est OK
    if (data.status !== "ok") {
      container.innerHTML = "Aucune donnée trouvée.";
      loader.style.display = "none"; // Masquer le loader
      return;
    }

    let articlesHTML = "";

    // Vérifier si des articles existent
    if (data.articles && data.articles.length > 0) {
      articlesHTML = `
        <ul class="news-list">
          ${data.articles
            .map(
              (article) => `
                <li class="news-item">
                  <img src="${article.urlToImage || "blank.png"}" class="news-image"/>
                  <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                  <p>${article.description || ""}</p>
                  <em>${article.source.name}</em>
                </li>
              `,
            )
            .join("")}
        </ul>
      `;
    } else {
      // Aucun article pour cette catégorie
      articlesHTML = `<p>Aucun article pour cette catégorie à ce jour</p>`;
    }

    // Injection du HTML des articles dans le conteneur
    container.innerHTML = `
      <h1>${categorie.toUpperCase()}</h1>
      ${articlesHTML}
    `;

    // Attendre que toutes les images soient complètement chargées
    const images = container.querySelectorAll("img");
    const imagePromises = [...images].map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) resolve();
          else img.onload = img.onerror = resolve;
        }),
    );

    return Promise.all(imagePromises);
  })
  // Masquer le loader après le chargement des images
  .then(() => {
    loader.style.display = "none";
  })
  // Gérer les erreurs lors de la récupération des données
  .catch(() => {
    container.innerText = "Erreur lors de la récupération des données";
    loader.style.display = "none";
  });
