"use strict";

const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const dashs = document.querySelector(".dashs");

let curSlide = 0;
const maxSlide = slides.length; //Number of Nodelist

//Functions
const createDashs = () => {
  slides.forEach(function (_, i) {
    dashs.insertAdjacentHTML(
      "beforeend",
      `
            <button class="dashs-dash" data-slide="${i}"></button>
        `
    );
  });
};
createDashs();

const activeDash = (slide) => {
  document
    .querySelectorAll(".dashs-dash")
    .forEach((dash) => dash.classList.remove("dashs-dash-active"));
  document
    .querySelector(`.dashs-dash[data-slide="${slide}"]`)
    .classList.add("dashs-dash-active");
};
activeDash(0);

const goToSlide = (slide) => {
  // if curSlide = 1 => 0-1 => -1 * 100 = -100% (-100%, 0%, 100%)
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
goToSlide(0);

//Next slide
const nextSlide = () => {
  curSlide === maxSlide - 1 ? (curSlide = 0) : curSlide++;
  goToSlide(curSlide);
  activeDash(curSlide);
};

//Prev slide
const prevSlide = () => {
  curSlide === 0 ? (curSlide = maxSlide - 1) : curSlide--;
  goToSlide(curSlide);
  activeDash(curSlide);
};

setInterval(nextSlide, 3000);

//Event handler
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
dashs.addEventListener("click", (e) => {
  if (e.target.classList.contains("dashs-dash")) {
    // console.log('dash')
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activeDash(slide);
  }
});

// Function to Get Data From API and Append It to Main

const loadData = (param) => {
  // load Categories Menue
  getCategories();

  // Main Content Div
  const mainContentDiv = document.querySelector("#mainContent");
  mainContentDiv.innerHTML = "";

  //Get Data From API
  fetch(`https://dummyjson.com/${param}`)
    .then((res) => res.json())
    .then((json) => {
      let res = json.products;
      console.log(res);
      //Loop Over Data And MAke A Card For Each Product
      res.map((el) => {
        // console.log(el);
        mainContentDiv.innerHTML += `
        <div class="card border-0 shadow mb-5" style="width: 18rem">
        <img
        loading="lazy"
        src="${el.thumbnail}"
        class="border-0 p-2"
        alt=""
        style="height: 15rem !important"
        />
        <div class="card-body d-flex flex-column justify-content-between">
        <h5 class="card-title" style="cursor:pointer" onclick="openSingleProductPage(${
          el.id
        })"> 
        ${el.title}  
        </h5>
        <p class="card-text " style = "height : 6rem !important">
        ${
          el.description.length > 100
            ? el.description.slice(0, 100) + "..."
            : el.description
        }
        </p>
        <div class=" fw-bold  m-3">${el.price} $</div>
        <div class="d-flex justify-content-between mt-auto">
        <button href="" class="btn btn-warning"  >
        Add To Cart
        </button>
        <span class=" bg-success link-light p-2 rounded">
        <i class="fa-solid fa-star"></i>
        ${el.rating.toFixed(1)}</span>
        </div>
        
        </div>
        </div>
        `;
      });
    });
};

// Get All Categories
const getCategories = () => {
  const categoriesContainer = document.querySelector(".categories");
  categoriesContainer.innerHTML = `
        <li class="nav-item">
         <a class="nav-link 
          text-dark" href="#"
          onclick="loadData('products?limit=0')"
          >
          ALL CATOGARIES &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
         </a>
        </li>`;

  fetch("https://dummyjson.com/products/categories")
    .then((res) => res.json())
    .then((json) =>
      json.map(
        (cat) =>
          (categoriesContainer.innerHTML += ` 
            <li class="nav-item">
              <a class="nav-link text-dark" href="#" 
              onclick="loadData('products/category/${cat}')">
              ${cat}
              </a>
           </li>`)
      )
    );
};

// To Get The Id Of a Product When Click On it And open Single Product Page
const openSingleProductPage = (id) => {
  const date = new Date().getTime() + 3;
  document.cookie = `productId = ${id} ; expires = ${date}`;
  location.href = "./singleProductPage.html";
};

// Fire The Function When Load
loadData("products?limit=0");
