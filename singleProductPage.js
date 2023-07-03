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

  const bod = document.querySelector("#singleProductPage");
  bod.innerHTML = `
  
      <div class="container-fluid mt-3 " style=" width: 33%; background-color:white;">
      <div class="ecommerce-gallery" data-mdb-zoom-effect="true" data-mdb-auto-height="true">
          <div class="row py-3 shadow-5">
            <div class="col-12 mb-1">
              <div class="lightbox">
                <img
                  src="${product.images[0]}"
                  alt="Gallery image 1"
                  class="ecommerce-gallery-main-img active w-100"
                />
              </div>
            </div>
            <div class="col-3 mt-1">
              <img
                src="${product.images[1]}"
                data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/14a.webp"
                alt="Gallery image 1"
                class="active w-100"
              />
            </div>
            <div class="col-3 mt-1">
              <img
                src="${product.images[2]}"
                data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/12a.webp"
                alt="Gallery image 2"
                class="w-100"
              />
            </div>
            <div class="col-3 mt-1">
              <img
                src="${product.images[3]}"
                data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/13a.webp"
                alt="Gallery image 3"
                class="w-100"
              />
            </div>
            <div class="col-3 mt-1">
              <img
                src="${product.images[4]}"
                data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/15a.webp"
                alt="Gallery image 4"
                class="w-100"
              />
            </div>
          </div>
        </div>
        </div>
        <div class="container-fluid mt-3 " style=" width: 33%; background-color:white;">
          <form>
          <h4 class="nameproduct">${product.title}
          </h4>
          <h3>${product.description} </h3>
          <p>Model Number :${product.brand}</p>
          <p>rating:<span class=" bg-success link-light p-2 rounded">
          <i class="fa-solid fa-star"></i>
          ${product.rating.toFixed(1)}</span></p>
          <p class="price">Was:${product.price}</p>
          <p class="lastprice">Now:${product.price-(product.price*((product.discountPercentage)/100))
          }</p>
          <p>Saving:<strong
              class="align-self-center text-lowercase badge  text-wrap fw-bolder fst-italic "
              style="border-radius: 50px 20px; background-color: rgb(241, 241, 4);color: black;">express</strong></p>
              <img src="images/707dcf7e-9467-4bd9-8cfe-8d5ade48c8bd.png"width="100%">
              <p><b> Quantity</b></p>
              <input type="number" name="number" value="1" style="height: 40px; width: 4em;">
              <button onclick="cart(${product.id},${document.getElementsByName("input").value} )" style="height: 40px; width: 85%; border: 0; background-color: rgb(44, 44, 249); color: #ffff; ">Add To Cart</button>
          </form>
            </div>
      <div class="container-fluid mt-3 " style=" width: 30%; background-color:white;">
          <p><img src="images/free_returns_usp.svg"> hassle free returns with this offer.
             <a href="#"> Learn more</a></p>
             <p><img src="images/seller.svg">Sold by<a href="#">noon</a></p>
      <hr>
      <div style="text-align: center; gap: 70px; display: flex;">
          <div>
      <img width="50px" src="images/badge_low_returns_seller.png">
      <p>low return seller</p>
  </div>
  <div>
      <img width="50px" src="images/badge_great_recent_rating.png">
      <p>low return seller</p>
  </div>
          </div>
          <hr>
          <div>
          <img src="images/free_returns_usp.svg"><b>FREE RETURNS  </b>
          <p>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; Get free returns on eligible items</p>
      </div>
      <div>
          <img src="images/trusted_shipping_usp_v2.svg"><b>TRUSTED SHIPPING  </b>
          <p>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; Free shipping when you spend EGP 200 and above on express items</p>
      </div>
      <div>
          <img src="images/secure_usp.svg"><b>SECURE SHOPPING  </b>
          <p>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; Your data is always protected</p>
      </div>
          </div>
          
      
    `;
};

loadSingleProductData();
