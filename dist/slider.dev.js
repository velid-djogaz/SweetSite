"use strict";

var slider = document.querySelector('.slider');
var slides = document.querySelectorAll('.slide');
var prevButton = document.querySelector('.prev-button');
var nextButton = document.querySelector('.next-button');
var sliderButtons = document.querySelectorAll('.slider-button');
var currentSlide = 0;

function showSlide(index) {
  slides.forEach(function (slide, i) {
    if (i === index) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }
  });
}

function updateButtons() {
  sliderButtons.forEach(function (button, i) {
    if (i === currentSlide) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
  updateButtons();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
  updateButtons();
}

prevButton.addEventListener('click', function () {
  prevSlide();
});
nextButton.addEventListener('click', function () {
  nextSlide();
});
sliderButtons.forEach(function (button, i) {
  button.addEventListener('click', function () {
    currentSlide = i;
    showSlide(currentSlide);
    updateButtons();
  });
});
showSlide(currentSlide);
updateButtons();
//# sourceMappingURL=slider.dev.js.map
