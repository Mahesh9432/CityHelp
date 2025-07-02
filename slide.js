document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.getElementById("navMenu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("show");
  });



  document.addEventListener("DOMContentLoaded", function () {
    const profileIcon = document.getElementById("profileIcon");
    const profileDropdown = document.getElementById("profileDropdown");

    profileIcon.addEventListener("click", function (e) {
      e.stopPropagation();
      profileDropdown.classList.toggle("active");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
      if (!profileDropdown.contains(e.target) && e.target !== profileIcon) {
        profileDropdown.classList.remove("active");
      }
    });
  });



  document.addEventListener("click", function (e) {
    const isClickInside = hamburger.contains(e.target) || navMenu.contains(e.target);
    if (!isClickInside) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("show");
    }
  });
});

function scrollCarousel(direction) {
  const track = document.getElementById('carouselTrack');
  const slide = track.querySelector('.slide');
  const scrollAmount = slide.offsetWidth + 20;
  track.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

function scrollCarousel(direction) {
  const track = document.getElementById('carouselTrack');
  const slide = track.querySelector('.slide');
  const scrollAmount = slide.offsetWidth + 20;
  track.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

function toggleDropdown(id) {
  document.querySelectorAll('.dropdown-menu').forEach(menu => {
    if (menu.id !== id) menu.style.display = 'none';
  });

  const dropdown = document.getElementById(id);
  dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
}

function selectItem(inputId, itemElement) {
  const input = document.getElementById(inputId);
  const text = itemElement.innerText.trim();

  if (text.toLowerCase().includes('use my location')) {
    getCurrentLocation(input);
  } else {
    input.value = (input.value === text) ? '' : text;
  }

  itemElement.parentElement.style.display = 'none';
}

function clearInput(inputId) {
  document.getElementById(inputId).value = '';
}

function getCurrentLocation(input) {
  if (!navigator.geolocation) {
    alert('Geolocation not supported by your browser.');
    return;
  }

  input.value = 'Detecting location...';

  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      fetchLocationName(latitude, longitude, input);
    },
    error => {
      input.value = '';
      alert('Failed to get location.');
    }
  );
}

function fetchLocationName(lat, lon, input) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const location = data.address?.city || data.address?.town || data.address?.village || 'Your Location';
      input.value = location;
    })
    .catch(() => {
      input.value = '';
      alert('Could not fetch location name.');
    });
}

document.addEventListener('click', function (event) {
  const wrapper = event.target.closest('.input-wrapper');
  if (!wrapper) {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      menu.style.display = 'none';
    });
  }
});

// Smooth scroll for footer links (optional)
document.querySelectorAll('.footer-links a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    document.querySelector(targetId).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Current year for copyright (optional)
document.querySelector('.footer-copyright').innerHTML =
  `&copy; ${new Date().getFullYear()} CityHelp. All rights reserved.`;

  