const track = document.querySelector('.carousel-track');
const leftBtn = document.querySelector('.carousel-btn.left');
const rightBtn = document.querySelector('.carousel-btn.right');
const slides = Array.from(track.children);
const slideCount = slides.length;
let slideWidth = slides[0].offsetWidth + 16;

slides.forEach(slide => {
  const cloneStart = slide.cloneNode(true);
  const cloneEnd = slide.cloneNode(true);
  track.insertBefore(cloneStart, track.firstChild);
  track.appendChild(cloneEnd);                      
});

const allSlides = document.querySelectorAll('.carousel-track .slide');

track.scrollLeft = slideWidth * slideCount;

function scrollNext() {
  track.scrollBy({ left: slideWidth, behavior: 'smooth' });
}
function scrollPrev() {
  track.scrollBy({ left: -slideWidth, behavior: 'smooth' });
}

rightBtn.addEventListener('click', scrollNext);
leftBtn.addEventListener('click', scrollPrev);

let autoScroll = setInterval(scrollNext, 3000);

track.addEventListener('scroll', () => {
  if (track.scrollLeft <= slideWidth) {
    track.scrollLeft += slideWidth * slideCount;
  } else if (track.scrollLeft >= slideWidth * (slideCount * 2)) {
    track.scrollLeft -= slideWidth * slideCount;
  }
});

let isDragging = false;
let startX = 0;
let scrollStart = 0;

track.addEventListener('mousedown', e => {
  isDragging = true;
  startX = e.pageX;
  scrollStart = track.scrollLeft;
  track.style.cursor = 'grabbing';
});

track.addEventListener('mousemove', e => {
  if (!isDragging) return;
  const dx = e.pageX - startX;
  track.scrollLeft = scrollStart - dx;
});

track.addEventListener('mouseup', () => {
  isDragging = false;
  track.style.cursor = 'default';
});

track.addEventListener('mouseleave', () => {
  isDragging = false;
  track.style.cursor = 'default';
});

track.addEventListener('touchstart', e => {
  isDragging = true;
  startX = e.touches[0].pageX;
  scrollStart = track.scrollLeft;
});

track.addEventListener('touchmove', e => {
  if (!isDragging) return;
  const dx = e.touches[0].pageX - startX;
  track.scrollLeft = scrollStart - dx;
});

track.addEventListener('touchend', () => {
  isDragging = false;
});