async function fetchData() {
  const response = await fetch("../data/products.json");
  const data = await response.json();
  return data;
}
