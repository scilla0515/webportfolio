const weatherApiKey = 'pweat'; // Your OpenWeatherMap API key

function showWeather() {
  document.getElementById('weather-section').classList.remove('hidden');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherApiKey}`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const temp = data.main.temp;
          const description = data.weather[0].description;
          const city = data.name;
          document.getElementById('weather-info').innerText = `The weather in ${city} is ${description} at ${temp}°F.`;
        })
        .catch(error => {
          document.getElementById('weather-info').innerText = 'Failed to load weather.';
        });
    }, error => {
      document.getElementById('weather-info').innerText = 'Location access denied.';
    });
  } else {
    document.getElementById('weather-info').innerText = 'Geolocation not supported.';
  }
}
