"use strict";

// ----------- Forms -------------

const modal = document.querySelector(".wrapper");
const btnLoginModal = document.querySelector(".login-link");
const btnRegisterModal = document.querySelector(".register-link");
const overlay = document.querySelector(".overlay");
const btnOpen = document.querySelector(".open");
const btnClose = document.querySelector(".icon-close");
const inputBoxs = document.querySelectorAll(".input-box");
const loginForm = document.querySelector(".login-form");
const registrationForm = document.querySelector(".register-form");
const errorContainer = document.getElementById("errorContainer");
const successContainer = document.getElementById("successContainer");

const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

const isValidName = (userName) => {
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  return usernameRegex.test(userName);
};

const displayError = (errorMessage) => {
  errorContainer.style.display = "block";
  errorContainer.style.color = "red";
  errorContainer.textContent = errorMessage;
};
const displaySuccess = (successMessage) => {
  successContainer.style.display = "block";
  successContainer.style.color = "green";
  successContainer.textContent = successMessage;
};

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("user").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  console.log(typeof users);

  // const user = users.find(
  //   (user) => user.username === username && user.password === password
  // );
  let user = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      user = users[i];
      break;
    }
  }

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    console.log("Login successful");
  } else {
    console.log("Invaild");
  }

  // if (email === "") {
  //   displayError("Email field is required!");
  //   return;
  // }

  // // Perform additional validation on email format
  // if (!isValidEmail(email)) {
  //   displayError("Invalid email address!");
  //   return;

  //   // alert("Invalid email address!");
  //   // return;
  // }

  // if (password === "") {
  //   displayError("Password field is required!");
  //   return;
  //   // alert("Password field is required!");
  //   // return;
  // }

  // if (!isValidPassword(password)) {
  //   displayError("Invalid password!");
  //   //alert("Invalid password!");
  //   return;
  // }

  // if (username === "") {
  //   displayError("Name field is required!");
  //   //alert("Name field is required!");
  //   return;
  // }

  // if (!isValidName(username)) {
  //   displayError("Invalid name!");
  //   //alert("Invalid name!");
  //   return;
  // }

  // If all validations pass, submit the form
  alert("Form submitted successfully!");
  loginForm.submit();
});

registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const regEmail = document.getElementById("email1").value;
  const regPassword = document.getElementById("password1").value;
  const regUserName = document.getElementById("name1").value;

  if (regEmail === "") {
    displayError("Email field is required!");
    return;
  }

  if (!isValidEmail(regEmail)) {
    displayError("Invalid email address!");
    return;
  }

  if (regPassword === "") {
    displayError("Password field is required!");
    return;
  }

  if (!isValidPassword(regPassword)) {
    displayError("Invalid password!");
    return;
  }

  if (regUserName === "") {
    displayError("Name field is required!");
    return;
  }

  if (!isValidName(regUserName)) {
    displayError("Invalid name!");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  // const isUserName = users.some((user) => user.userName === regUserName);
  let isUserName = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === regUserName) {
      isUserName = true;
      break;
    }
  }
  if (isUserName) {
    console.log("Username already logged in");
  } else {
    const newUser = {
      username: regUserName,
      password: regPassword,
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    console.log("Registration successful");
  }

  //alert("Form submitted successfully!");
  displaySuccess("Form submitted successfully!");
  registrationForm.submit();
});

btnRegisterModal.addEventListener("click", () => {
  modal.classList.add("active");
});

btnLoginModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

const openModal = () => {
  modal.classList.add("active-btn");
  overlay.classList.remove("hidden");
};

const closeModal = () => {
  modal.classList.remove("active-btn");
  overlay.classList.add("hidden");
};

btnOpen.addEventListener("click", openModal);

btnClose.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);


// ----------- Slider -------------

const imgNoon = document.querySelector(".img-noon");
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const dashs = document.querySelector(".dashs");

imgNoon.insertAdjacentHTML(
  "beforeend",
  '<img src="images/8.png" alt="img-noon" width="100%">'
);

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

// GEt Data
const getData = (params) =>
  fetch(`https://dummyjson.com/${params}`).then((res) => res.json());

// Function to Get Data From API and Append It to Main
const loadData = async (param) => {
  const mainContentDiv = document.querySelector("#mainContent");
  mainContentDiv.innerHTML = "";

  let res = await getData(param);
  console.log(res.products);

  res.products.map((el) => {
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
};

// Get All Categories
const getCategories = async () => {
  const categoriesContainer = document.querySelector(".categories");
  categoriesContainer.innerHTML = `
        <li class="nav-item btn btn-warning m-1 rounded">
         <a class="nav-link text-dark" href="#"
          onclick="loadData('products?limit=0')">
          ALL CATOGARIES &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
         </a>
        </li>`;

  const res = await getData("products/categories");

  res.map(
    (cat) =>
      (categoriesContainer.innerHTML += ` 
            <li class="nav-item btn btn-warning m-1 rounded" >
              <a class="nav-link text-dark" href="#" 
              onclick="loadData('products/category/${cat}')">
              ${cat}
              </a>
           </li>`)
  );
};

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
    dropDown.appendChild(newOption);
  });
};

// To Get The Id Of a Product When Click On it And open Single Product Page
const openSingleProductPage = (id) => {
  const date = new Date().getTime() + 3;
  document.cookie = `productId = ${id} ; expires = ${date}`;
  location.href = "./singleProductPage.html";
};

// Fire The Function When Load
loadData("products?limit=0");
getCategories();

document
  .querySelector(".inpt-search")
  .addEventListener("input", searchProducts);
