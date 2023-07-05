"use strict";

// Get Products From LOcla Storage
let getProducts = () => {
  updateCartNum();
  let CartItems = JSON.parse(localStorage.getItem("cartItemsNum"));
  let products = JSON.parse(localStorage.getItem("products"));

  let shipping = 65;
  let total = 0;

  if (products) {
    console.log(products);
    products.map((product) => {
      fetch(`https://dummyjson.com/products/${product.id}`)
        .then((res) => res.json())
        .then((element) => {
          const numOfItems = document.querySelector("#numOfItems");
          numOfItems.innerHTML = `<span style="font-size: 25px">
             Cart
             <span style="color: gray; font-size: 18px">
                 (${CartItems} item)
             </span>
            </span>`;
          const itemsDiv = document.querySelector("#itemsDiv");
          itemsDiv.innerHTML += `<div id="myItems" class="items">
              <img class="itemImg"
                src="${element.thumbnail}"/>
             <div class="details">
                    <p class="brand">${element.brand}</p>
                    <p>${element.description}</p>
                    <h6 style="color: gray">Order in 8 hrs 32 mins</h6>
                    <h6 style="color: rgb(104, 104, 104)">
                        Delivery by<u style="color: rgb(46, 46, 46)">Mon,Jul 3</u>
                    </h6>
                    <h6 style="color: gray">
                        Sold by<b style="color: black">Elmnsora</b>
                    </h6>
                    <span style="color: gray; display: inline">
                    <img class="cannot"
                    src="https://f.nooncdn.com/s/app/com/noon/icons/non_returnable.svg"
                    width="24px"
                    height="24px"
                    />
                    item cannot be exchanged or returned.
                    </span >
                    <h6 onclick="deleteItem(${
                      element.id
                    })" style="cursor: pointer">
                        <i class="fa-solid fa-trash"></i> Remove
                    </h6>
              </div>
                <div class="rightSide">
                    <div class="row">
                    <p style="color: gray">EGP<b style="color: black">${
                      element.price * product.quantity
                    }</b></p>
                    </div>
                    <div class="row d-flex justify-content-center">
                    <select
                        name="num${element.id}"
                        id="numItems${element.id}"
                        style="width: fit-content; height: fit-content"
                        value=${product.quantity.toString()}
                        onchange="updateQuantity(${element.id}, this.value)"
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    
                    <img
                        src="https://f.nooncdn.com/s/app/com/noon/images/fulfilment_express_v2-en.svg"
                        width="80px"
                        height="20px"
                    />
                </div>
                </div>
             </div>`;
          const divOrderSummary = document.querySelector("#divOrderSummary");
          total += Number(element.price * product.quantity);
          // const numItems = document.querySelector(`#numItems_${element.id}`);
          // numItems.value = product.quantity.toString();
          divOrderSummary.innerHTML = `<div class="orderSummary p-4 rounded-bottom">
          <h3>Order Summary</h3>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Coupon Code"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <span class="input-group-text btn btn-primary" id="basic-addon2 "
              >Apply</span
            >
          </div>
          <div class="d-flex justify-content-between">
            <span style="color: gray">Subtotal (${CartItems} item)</span
            ><span style="color: gray">EGP ${total}</span>
          </div>
          <div class="d-flex justify-content-between">
            <span style="color: gray"
              >Shipping
              <a class="text-decoration-none" href="#">Details</a></span
            ><span style="color: gray">EGP ${shipping}</span>
          </div>
          <hr style="color: rgb(160, 158, 158)" />
          <div class="d-flex justify-content-between">
            <span style="color: black; font-size: 20px; font-weight: 600">
              Total
              <span style="color: gray; font-size: 17px; font-weight: 400"
                >(Inclusive of VAT)</span
              >
            </span>
            <span style="color: gray; font-size: 20px; font-weight: 400"
              >EGP ${total + shipping}</span
            >
          </div>

          <div class="d-flex justify-content-start">
            <img
              style="padding-top: 15px"
              src="https://f.nooncdn.com/s/app/com/noon/icons/emi.svg"
              width="50px"
              height="50px"
            />
            <div>
              <h6 style="color: black">Monthly payment plans from EGP 500</h6>
              <a href="#">View more details</a>
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <button
            onclick="checkout()"
              type="button"
              class="btn btn-primary btn-lg btn-block w-100"
            >
              CHECKOUT
            </button>
          </div>`;
        });
    });
  }
};

getProducts();

function deleteItem(id) {
  const products = JSON.parse(localStorage.getItem("products"));
  const selectedIndex = products.findIndex((product) => product.id === id);
  products.splice(selectedIndex, 1);
  localStorage.setItem("products", JSON.stringify(products));
  const itemsDiv = document.querySelector("#itemsDiv");
  itemsDiv.innerHTML = ``;
  getProducts();
}

function checkout() {
  const products = [];
  localStorage.setItem("products", JSON.stringify(products));
  const itemsDiv = document.querySelector("#itemsDiv");
  itemsDiv.innerHTML = ``;

  location.href = "thankYou.html";
}

const updateQuantity = (id, quantity) => {
  const products = JSON.parse(localStorage.getItem("products"));
  const productIndex = products.findIndex((product) => product.id === id);
  products[productIndex].quantity = parseInt(quantity);
  localStorage.setItem("products", JSON.stringify(products));
  const itemsDiv = document.querySelector("#itemsDiv");
  itemsDiv.innerHTML = "";
  getProducts();
};
