document.addEventListener('DOMContentLoaded', () => {
  // Your OpenWeatherMap API key
  const apiKey = 'ca2484c7361c9914e74de38fca936b5a';

  document.getElementById('getWeatherBtn').addEventListener('click', () => {
      const city = document.getElementById('cityInput').value;
      getWeather(city)
          .then(weatherData => displayWeather(weatherData))
          .catch(error => console.error('Error fetching weather data:', error));
  });

  function getWeather(city) {
      return new Promise((resolve, reject) => {
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

          fetch(url)
              .then(response => {
                  if (!response.ok) {
                      reject('City not found');
                  }
                  return response.json();
              })
              .then(data => resolve(data))
              .catch(error => reject('Error fetching data'));
      });
  }

  function displayWeather(data) {
      const weatherInfoDiv = document.getElementById('weatherInfo');
      weatherInfoDiv.innerHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p>Temperature: ${data.main.temp}°C</p>
          <p>Weather: ${data.weather[0].description}</p>
          <p>Humidity: ${data.main.humidity}%</p>
          <p>Wind Speed: ${data.wind.speed} m/s</p>
      `;
  }
});
