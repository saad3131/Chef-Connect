const chefSlides = document.querySelectorAll('.chef-slide');
let currentIndex = chefSlides.length - 1;

function nextSlide() {
  chefSlides[currentIndex].style.transform = 'translateX(-100%)';
  currentIndex = (currentIndex - 1 + chefSlides.length) % chefSlides.length;
  chefSlides[currentIndex].style.transform = 'translateX(0)';
}

function prevSlide() {
  chefSlides[currentIndex].style.transform = 'translateX(100%)';
  currentIndex = (currentIndex + 1) % chefSlides.length;
  chefSlides[currentIndex].style.transform = 'translateX(0)';
}

setInterval(nextSlide, 15000); // Slide every 15 seconds
