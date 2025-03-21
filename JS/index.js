const API_URL = 'https://striveschool-api.herokuapp.com/api/product/';
const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMzM4YjM4MzRiZjAwMTUwMDA3MGUiLCJpYXQiOjE3NDI1NDk5MDAsImV4cCI6MTc0Mzc1OTUwMH0.IEiScsPMsuveJXXY24ae6YV4mUpaBEPZZ2JC5oncFn8';

const container = document.getElementById('home-product-list');
const products = [
  {
    _id: "1",
    "name": "Back in Black",
    "brand": "AC/DC",
    "description": "L'album hard rock definitivo, potente e immortale.",
    "imageUrl": "https://can-of-worms.co.uk/2814-medium_default/acdc-back-in-black-album-cover-wooden-coaster.jpg",
    "price": 12.99
  },
  {
    _id: "2",
    "name": "Nevermind",
    "brand": "Nirvana",
    "description": "Il grunge prende il mondo a calci nel '91.",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/en/b/b7/NirvanaNevermindalbumcover.jpg",
    "price": 10.5
  },
  {
    _id: "3",
    "name": "Appetite for Destruction",
    "brand": "Guns N' Roses",
    "description": "Il debutto che ha fatto esplodere il Sunset Strip.",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/it/0/06/Appetite_for_Destruction.jpg",
    "price": 13.99
  },
  {
    _id: "4",
    "name": "The Dark Side of the Moon",
    "brand": "Pink Floyd",
    "description": "Un viaggio psichedelico senza tempo.",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png",
    "price": 15.0
  },
  {
    _id: "5",
    "name": "Led Zeppelin IV",
    "brand": "Led Zeppelin",
    "description": "Include l'intramontabile 'Stairway to Heaven'.",
    "imageUrl": "https://i.discogs.com/KKjg5uNSXStjCh2jSKjlt5lt6a063AlYHaY-tN8DDHY/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU2ODgx/ODUtMTU0MjQwMjg2/NC00MDI3LmpwZWc.jpeg",
    "price": 14.5
  },
  {
    _id: "6",
    "name": "Paranoid",
    "brand": "Black Sabbath",
    "description": "L'inizio del metal, con 'Iron Man' e 'War Pigs'.",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/en/6/64/Black_Sabbath_-_Paranoid.jpg",
    "price": 11.99
  },
  {
    _id: "7",
    "name": "Californication",
    "brand": "Red Hot Chili Peppers",
    "description": "Funky rock dalla California, con un'anima malinconica.",
    "imageUrl": "https://m.media-amazon.com/images/I/81TnWHafWdL.jpg",
    "price": 12.5
  },
  {
    _id: "8",
    "name": "American Idiot",
    "brand": "Green Day",
    "description": "Punk rock teatrale per l'era Bush.",
    "imageUrl": "https://m.media-amazon.com/images/I/71Z0rLIvpuL.jpg",
    "price": 9.99
  },
  {
    _id: "9",
    "name": "Ten",
    "brand": "Pearl Jam",
    "description": "L'esplosione del grunge nel cuore degli anni '90.",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/en/2/2d/PearlJam-Ten2.jpg",
    "price": 13.5
  },
  {
    _id: "10",
    "name": "Highway to Hell",
    "brand": "AC/DC",
    "description": "Il canto del cigno di Bon Scott, un classico immortale.",
    "imageUrl": "https://m.media-amazon.com/images/I/91NuHgWC6cL._UF1000,1000_QL80_.jpg",
    "price": 11.0
  }
];


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


const searchInput = document.querySelector('input[type="search"]');


function renderProducts(filteredProducts) {
  container.innerHTML = "";
  container.className = "row";

  filteredProducts.forEach(p => {
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

renderProducts(products);

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm) ||
    p.brand.toLowerCase().includes(searchTerm)
  );
  renderProducts(filtered);
});