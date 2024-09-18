let total = 0;
let discount = 0;
let total_price = 0;

async function fetchData() {
  const response = await fetch("..\\data\\products.json");
  //   D:\Programming hero course\Summer sale\summer-sale\data\products.json
  //   data\products.json
  //
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

// Item listing
function listingItem(product, id) {
  const parentElement = document.getElementById(id);
  const newProduct = document.createElement("li");
  newProduct.textContent = product.name;
  parentElement.appendChild(newProduct);
}

// Create card dynamically and show product
async function showProducts(products, id) {
  const allProducts = await products();
  const parentElement = document.getElementById(id);
  const cardSection = document.createElement("div");
  cardSection.classList.add("product-card-section");
  allProducts.forEach((item) => {
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
    card.addEventListener("click", () => {
      const listedCartItem = document.getElementById("listed-cart-item");
      const addedLi = document.createElement("li");
      addedLi.textContent = item.name;
      listedCartItem.appendChild(addedLi);
      total = total + item.price;
      total_price = total - discount;
      if (listedCartItem.getElementsByTagName("li").length > 0) {
        const showTotal = document.getElementById("total");
        showTotal.textContent = "Total :" + total.toFixed(2);
        const purchaseBtn = document.getElementById("purchase-btn");
        purchaseBtn.style.display = "block";
      }
    });
  });

  parentElement.appendChild(cardSection);
}

document.addEventListener("DOMContentLoaded", () => {
  showProducts(kitchenware, "kitchenware");
  showProducts(sportsProducts, "sports");
  showProducts(furnitures, "furniture");
});

const purchaseBtn = document.getElementById("purchase-btn");
purchaseBtn.addEventListener("click", () => {
  purchaseBtn.style.display = "none";
  const purchase = document.getElementById("purchase");
  const heading = document.createElement("h1");
  heading.textContent = "Have a cupon?";
  const inputBox = document.createElement("div");
  inputBox.classList.add("cupon-input-box");
  const cuponInput = document.createElement("input");
  cuponInput.type = "text";
  cuponInput.id = "cupon-input";
  const applyCupon = document.createElement("button");
  applyCupon.classList.add("primary-btn");
  applyCupon.id = "apply-cupon-btn";
  applyCupon.textContent = "Apply";
  purchase.appendChild(heading);
  purchase.appendChild(inputBox);
  inputBox.appendChild(cuponInput);
  inputBox.appendChild(applyCupon);
  //   After click apply btn
  applyCupon.addEventListener("click", () => {
    applyCupon.setAttribute("disabled", true);
    if (cuponInput.value.toLocaleLowerCase() === "sell200") {
      discount = total * 0.2;
      total_price = total - discount;
    }
    const modal = document.getElementById("modal");
    modal.style.display = "block";
    purchaseModal(total, discount, total_price);
    const closeBtn = document.querySelector("#modal button");
    closeBtn.addEventListener("click", () => {
      location.reload();
    });
  });
});

function purchaseModal(fullPrice, discountPrice, afterDiscountPrice) {
  const orderAmount = document.getElementById("orderAmount");
  const showTotalPrice = document.createElement("p");
  const showDiscountPrice = document.createElement("p");
  const showAfterDiscountPrice = document.createElement("p");
  showTotalPrice.textContent = "Price: " + fullPrice.toFixed(2) + " TK";
  if (discountPrice > 0) {
    showDiscountPrice.textContent =
      "Discount :" + discountPrice.toFixed(2) + " TK";
    showAfterDiscountPrice.textContent =
      "Total Price: " + afterDiscountPrice.toFixed(2) + " TK";
  }
  orderAmount.appendChild(showTotalPrice);
  orderAmount.appendChild(showDiscountPrice);
  orderAmount.appendChild(showAfterDiscountPrice);
}
