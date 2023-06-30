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
    slides.forEach(function(_, i){
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
}

//Prev slide
const prevSlide = () => {
    curSlide === 0 ? curSlide = maxSlide - 1 : curSlide--;
    goToSlide(curSlide);
    activeDash(curSlide);
}

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
