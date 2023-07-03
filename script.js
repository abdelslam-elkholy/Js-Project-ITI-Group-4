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
const successLogin = document.getElementById("successLogin");

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

const displayError = (errorContainer, errorMessage) => {
  errorContainer.style.display = "block";
  errorContainer.style.color = "red";
  errorContainer.textContent = errorMessage;
};

const displaySuccess = (successMessage) => {
  successContainer.style.display = "block";
  successContainer.style.color = "green";
  successContainer.textContent = successMessage;
};

const checkLoggedIn = () => {
  let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

  if (isLoggedIn == true) {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    console.log(loggedInUser);
    btnOpen.innerHTML = `<span>Welcome ${loggedInUser.username} 🎉</span>
                  <a style="text-decoration: none; color:red;" onclick="signOut()" href="#">Sign Out</a>`;
  }
};
checkLoggedIn();

const signOut = () => {
  localStorage.setItem("loggedInUser", JSON.stringify(""));
  localStorage.setItem("isLoggedIn", JSON.stringify(false));
  location.reload();
};

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("user").value;

  let users = [];
  users = JSON.parse(localStorage.getItem("users"));
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
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
    checkLoggedIn();
  } else {
    errorContainer.textContent = "Invaild name or password";
    return;
  }

  // If all validations pass, submit the form
  loginForm.submit();
  closeModal();
});

const regEmail = document.getElementById("email1");
const regPassword = document.getElementById("password1");
const regUserName = document.getElementById("name1");

const validateEmail = () => {
  const errDiv = document.querySelector(".error-email");

  if (regEmail.value === "") {
    displayError(errDiv, "Email field is required!");
    return;
  }

  if (!isValidEmail(regEmail.value)) {
    displayError(errDiv, "Invalid email address!");
    return;
  } else {
    errDiv.textContent = "";
    return true;
  }
};

const validatePassword = () => {
  const errDiv = document.querySelector(".error-password");

  if (regPassword.value === "") {
    displayError(errDiv, "Password field is required!");
    return;
  }

  if (!isValidPassword(regPassword.value)) {
    displayError(errDiv, "Invalid password!");
    return;
  } else {
    errDiv.textContent = "";
    return true;
  }
};

const validateName = () => {
  const errDiv = document.querySelector(".error-name");
  if (regUserName.value === "") {
    displayError(errDiv, "Name field is required!");
    return;
  }

  if (!isValidName(regUserName.value)) {
    displayError(errDiv, "Invalid name!");
    return;
  } else {
    errDiv.textContent = "";
    return true;
  }
};

regEmail.addEventListener("input", validateEmail);
regPassword.addEventListener("input", validatePassword);
regUserName.addEventListener("input", validateName);

registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validatePassword() && validateName()) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // const isUserName = users.some((user) => user.userName === regUserName);
    let isUserName = false;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === regUserName.value) {
        isUserName = true;
        break;
      }
    }
    if (isUserName) {
      errorContainer.textContent = "Username already logged in";
      return;
    } else {
      const newUser = {
        username: regUserName.value,
        password: regPassword.value,
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
    }

    displaySuccess("Form submitted successfully!");
    registrationForm.submit();
    setTimeout(closeModal, 4000);
  }
});

// localStorage.clear();

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

const mySildeShow = setInterval(nextSlide, 3000);

//Event handler
btnRight.addEventListener("click", () => {
  clearInterval(mySildeShow);
  nextSlide();
});
btnLeft.addEventListener("click", () => {
  clearInterval(mySildeShow);
  prevSlide();
});

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
        <li class="nav-item">
          <a class="nav-link active" href="#category"onclick="loadData('products?limit=0')">
           ALL CATOGARIES &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
          </a>
        </li>`;

  const res = await getData("products/categories");

  res.map(
    (cat) =>
      (categoriesContainer.innerHTML += ` 
            <li class="nav-item" >
              <a class="nav-link " href="#categories"
                onclick="loadData('products/category/${cat}');changeActive()">
                ${cat.toUpperCase()}
              </a>
           </li>`)
  );
};

// To Change The Activated Style Of Categories
const changeActive = function () {
  console.log("im working");
  const paginationLinks = document.querySelectorAll(".nav-tabs .nav-link");
  paginationLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      console.log("im working");
      paginationLinks.forEach(function (link) {
        link.classList.remove("active");
      });

      this.classList.add("active");
    });
  });
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
    newOption.onclick = () => openSingleProductPage(product.id);
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
