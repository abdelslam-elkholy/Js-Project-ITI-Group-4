"use strict";

const loadSingleProductData = async () => {
  const id = document.cookie
    .split("; ")
    .find((row) => row.startsWith("productId"))
    .split("=")[1];

  let product = await fetch(`https://dummyjson.com/products/${id}`).then(
    (res) => res.json()
  );
  console.log(product);

  const body = document.querySelector("#singleProductPage");
  body.innerHTML = `
      <div class="card border-0 shadow mb-5" style="width: 18rem">
        <img
          loading="lazy"
          src="${product.thumbnail}"
          class="border-0 p-2"
          alt=""
          style="height: 15rem !important"
        />
        <div class="card-body d-flex flex-column justify-content-between">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">
        ${product.description}
          </p>
          <div class="text-center fw-bold link-danger mb-2">${product.price} $</div>
          <div class="d-flex justify-content-between mt-auto">
            <a href="" class="btn btn-warning">
              View More
            </a>
            <button class="btn btn-success" onclick="openSingleProductPage(${product.id})"  >Add to cart</button>
          </div>
        </div>
      </div>
    `;
};

loadSingleProductData();
