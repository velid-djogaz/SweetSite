const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const sliderButtons = document.querySelectorAll('.slider-button');

let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
    });
}

function updateButtons() {
    sliderButtons.forEach((button, i) => {
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

prevButton.addEventListener('click', () => {
    prevSlide();
});

nextButton.addEventListener('click', () => {
    nextSlide();
});

sliderButtons.forEach((button, i) => {
    button.addEventListener('click', () => {
        currentSlide = i;
        showSlide(currentSlide);
        updateButtons();
    });
});

showSlide(currentSlide);
updateButtons();