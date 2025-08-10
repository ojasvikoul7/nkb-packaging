(() => {
  // Slideshow
  const slides = document.querySelectorAll('.slide');
  let index = 0;

  function showSlide() {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    index = (index + 1) % slides.length;
  }

  setInterval(showSlide, 3000);

  // Carousel
  const track = document.querySelector(".carousel-track");
  const prevBtn = document.querySelector(".nav.prev");
  const nextBtn = document.querySelector(".nav.next");
  const dotsContainer = document.querySelector(".dots");

  const cards = Array.from(track.children);
  const cardWidth = cards[0].getBoundingClientRect().width + 20; // card + margin

  let currentSlide = 0;
  const cardsPerView = 3;
  const totalSlides = Math.ceil(cards.length / cardsPerView);

  // Create dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
  const dots = Array.from(dotsContainer.children);
  updateDots();

  // Move to specific slide
  function goToSlide(index) {
    currentSlide = index;
    const offset = -cardWidth * cardsPerView * currentSlide;
    track.style.transform = `translateX(${offset}px)`;
    updateDots();
  }

  // Update dot indicator
  function updateDots() {
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[currentSlide]) dots[currentSlide].classList.add("active");
  }

  // Button navigation
  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
  });

  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide);
  });

  // Optional: Autoplay
  let autoplay = true;
  if (autoplay) {
    setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      goToSlide(currentSlide);
    }, 6000);
  }
})();

