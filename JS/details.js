const API_URL = 'https://striveschool-api.herokuapp.com/api/product/';
const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMzM4YjM4MzRiZjAwMTUwMDA3MGUiLCJpYXQiOjE3NDI1NDk5MDAsImV4cCI6MTc0Mzc1OTUwMH0.IEiScsPMsuveJXXY24ae6YV4mUpaBEPZZ2JC5oncFn8';

const params = new URLSearchParams(location.search);
const id = params.get('id');

console.log("ID ricevuto:", id); // Debug

if (!id || id === "errore") {
  console.error("ID non valido:", id);
  document.getElementById('details-container').innerHTML = "<p class='text-danger'>Errore: ID prodotto non valido.</p>";
} else {
  fetch(API_URL + id, {
    headers: { 'Authorization': TOKEN }
  })
  .then(res => {
    if (!res.ok) throw new Error(`Errore HTTP ${res.status}`);
    return res.json();
  })
  .then(product => {
    document.getElementById('details-container').innerHTML = `
      <div class="product-details">
        <img src="${product.imageUrl}" alt="${product.name}" class="product-img" />
        <h1>${product.name}</h1>
        <h3>${product.brand}</h3>
        <p>${product.description}</p>
        <strong>€${product.price}</strong>
      </div>
    `;
  })
  .catch(error => {
    console.error("Errore durante il fetch:", error);
    document.getElementById('details-container').innerHTML = "<p class='text-danger'>Errore nel caricamento del prodotto.</p>";
  });
}