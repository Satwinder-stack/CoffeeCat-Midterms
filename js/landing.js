const carouselIntervals = new Map();

function startAutoSlide(carousel) {
  const interval = setInterval(() => {
    const nextButton = carousel.querySelector('.carousel-next');
    changeImage(nextButton, 1);
  }, 5000);
  carouselIntervals.set(carousel, interval);
}

function stopAutoSlide(carousel) {
  const interval = carouselIntervals.get(carousel);
  if (interval) {
    clearInterval(interval);
    carouselIntervals.delete(carousel);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const carousels = document.querySelectorAll('.image-carousel');
  carousels.forEach(carousel => {
    startAutoSlide(carousel);
    
    carousel.addEventListener('mouseenter', () => stopAutoSlide(carousel));
    carousel.addEventListener('mouseleave', () => startAutoSlide(carousel));
  });
});

function changeImage(button, direction) {
  const carousel = button.parentElement;
  const container = carousel.querySelector('.carousel-container');
  const images = carousel.querySelectorAll('.carousel-image');
  
  let currentTransform = container.style.transform;
  let currentIndex = 0;
  
  if (currentTransform) {
    const match = currentTransform.match(/translateX\(-(\d+\.?\d*)%\)/);
    if (match) {
      currentIndex = Math.round(parseFloat(match[1]) / 16.666);
    }
  }
  
  let newIndex = currentIndex + direction;
  
  if (newIndex >= images.length) {
    newIndex = 0;
  } else if (newIndex < 0) {
    newIndex = images.length - 1;
  }
  
  container.style.transform = `translateX(-${newIndex * 16.666}%)`;
}