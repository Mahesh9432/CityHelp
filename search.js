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