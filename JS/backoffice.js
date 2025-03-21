const API_URL = 'https://striveschool-api.herokuapp.com/api/product/';
const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMzM4YjM4MzRiZjAwMTUwMDA3MGUiLCJpYXQiOjE3NDI1NDk5MDAsImV4cCI6MTc0Mzc1OTUwMH0.IEiScsPMsuveJXXY24ae6YV4mUpaBEPZZ2JC5oncFn8';

const container = document.getElementById('home-product-list');

fetch(API_URL, {
  headers: { Authorization: TOKEN }
})
  .then(res => res.json())
  .then(products => {
    if (!Array.isArray(products)) throw new Error("Dati non validi dalle API.");
    renderProducts(products);
    setupSearch(products);
  })
  .catch(err => {
    console.error("Errore nel caricamento prodotti:", err);
    container.innerHTML = "<p class='text-danger'>Errore nel caricamento dei prodotti.</p>";
  });

function renderProducts(products) {
  container.innerHTML = "";
  container.className = "row";

  products.forEach(p => {
    const col = document.createElement('div');
    col.className = "col-md-4 mb-4";
    col.innerHTML = `
      <div class="card h-100 bg-dark text-white border-danger">
        <img src="${p.imageUrl}" class="card-img-top" alt="${p.name}">
        <div class="card-body">
          <h5 class="card-title">${p.name}</h5>
          <h6 class="card-subtitle mb-2 text-danger">${p.brand}</h6>
          <p class="card-text">${p.description}</p>
          <p class="card-text"><strong>€${p.price}</strong></p>
          <a href="details.html?id=${p._id}" class="btn btn-outline-light btn-sm">Vedi Dettagli</a>
          <a href="backoffice.html?id=${p._id}" class="btn btn-outline-danger btn-sm ms-2">Modifica</a>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

function setupSearch(products) {
  const searchInput = document.querySelector('input[type="search"]');
  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.brand.toLowerCase().includes(searchTerm)
    );
    renderProducts(filtered);
  });
}