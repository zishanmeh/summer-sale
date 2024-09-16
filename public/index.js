async function fetchData() {
  const response = await fetch("../data/products.json");
  const data = await response.json();
  return data;
}

async function kitchenware() {
  const allProducts = await fetchData();
  let kitchenProducts = [];
  for (const kitchenProduct of allProducts) {
    if (kitchenProduct.catagory === "Kitchenware") {
      kitchenProducts.push(kitchenProduct);
    }
  }
  return kitchenProducts;
}
async function sportsProducts() {
  const allProducts = await fetchData();
  let sportsProducts = [];
  for (const sportsItem of allProducts) {
    if (sportsItem.catagory === "Sportswear") {
      sportsProducts.push(sportsItem);
    }
  }
  return sportsProducts;
}
async function furnitures() {
  const allProducts = await fetchData();
  let allFurnitures = [];
  for (const furniture of allProducts) {
    if (furniture.catagory === "Furniture") {
      allFurnitures.push(furniture);
    }
  }
  return allFurnitures;
}

// Create card dynamically and show product
async function showProducts(products, id) {
  const allProducts = await products();
  const parentElement = document.getElementById(id);
  const cardSection = document.createElement("div");
  cardSection.classList.add("product-card-section");
  for (item of allProducts) {
    const card = document.createElement("div");
    card.classList.add("product-card");
    const imageSection = document.createElement("div");
    imageSection.classList.add("product-card-image");
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;
    // Card details
    const cardDetails = document.createElement("div");
    cardDetails.classList.add("product-card-details");
    // rating
    const rating = document.createElement("div");
    rating.textContent = `Rating : ${item.rating}`;
    // Name
    const name = document.createElement("h4");
    name.textContent = item.name;
    // Price
    const price = document.createElement("p");
    price.textContent = `${item.price.toFixed(2)} TK`;

    // Appending
    cardSection.appendChild(card);
    card.appendChild(imageSection);
    imageSection.appendChild(img);
    card.appendChild(cardDetails);
    cardDetails.appendChild(rating);
    cardDetails.appendChild(name);
    cardDetails.appendChild(price);
  }

  parentElement.appendChild(cardSection);
}

document.addEventListener("DOMContentLoaded", () => {
  showProducts(kitchenware, "kitchenware");
  showProducts(sportsProducts, "sports");
  showProducts(furnitures, "furniture");
});
