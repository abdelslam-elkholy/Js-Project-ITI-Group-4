"use strict";
//Search
const searchProducts = async () => {
  const searchValue = document.querySelector(".inpt-search").value;
  const dropDown = document.querySelector(".dropdown-content");

  if (searchValue == "") {
    dropDown.innerHTML = "";
    dropDown.classList.remove("show");
    return;
  }
  dropDown.innerHTML = "";
  const res = await getData(`products/search?q=${searchValue}`);
  console.log(res);
  res.products.length > 0
    ? dropDown.classList.add("show")
    : dropDown.classList.remove("show");
  res.products.map((product, i) => {
    if (i >= 10) return;
    let newOption = document.createElement("a");
    newOption.textContent = product.title;
    newOption.href = "#";
    newOption.onclick = () => openSingleProductPage(product.id);
    dropDown.appendChild(newOption);
  });
};

// GEt Data
const getData = (params) =>
  fetch(`https://dummyjson.com/${params}`).then((res) => res.json());

// To Get The Id Of a Product When Click On it And open Single Product Page
const openSingleProductPage = (id) => {
  const date = new Date().getTime() + 3;
  document.cookie = `productId = ${id} ; expires = ${date}`;
  location.href = "./singleProductPage.html";
};
