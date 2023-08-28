const API_KEY = '5f878ace7edf2edc1c3a0ee023e62386';

function fetchWeatherData() {
    const cityInput = document.getElementById('cityInput').value;
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=5f878ace7edf2edc1c3a0ee023e62386&units=metric`;

    fetch(endpoint)
        .then((response) => response.json())
        .then((data) => {
            // Update current weather data
            const currentLocation = document.getElementById('currentLocation');
            const currentDate = document.getElementById('currentDate');
            const cityName = document.getElementById('cityName');
            const currentTemp = document.getElementById('currentTemp');
            const currentIcon = document.getElementById('currentIcon');
            const currentSummary = document.getElementById('currentSummary');
            const highTemp = document.getElementById('highTemp');
            const lowTemp = document.getElementById('lowTemp');
            const windSpeed = document.getElementById('windSpeed');
            const rainProb = document.getElementById('rainProb');
            const sunrise = document.getElementById('sunrise');
            const sunset = document.getElementById('sunset');

            currentLocation.textContent = data.name + ', ' + data.sys.country;
            currentDate.textContent = new Date().toDateString();
            cityName.textContent = data.name;
            currentTemp.textContent = Math.round(data.main.temp) + '\xB0C';
            currentIcon.src = 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
            currentIcon.alt = data.weather[0].description;
            currentSummary.textContent = data.weather[0].description;
            highTemp.textContent = 'High: ' + Math.round(data.main.temp_max) + '\xB0C';
            lowTemp.textContent = 'Low: ' + Math.round(data.main.temp_min) + '\xB0C';
            windSpeed.textContent = 'Wind: ' + Math.round(data.wind.speed) + ' mph';
            rainProb.textContent = 'Rain: ' + data.clouds.all + '%';
            sunrise.textContent = 'Sunrise: ' + new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            sunset.textContent = 'Sunset: ' + new Date(data.sys.sunset * 1000).toLocaleTimeString();

            // Fetch and update hourly forecast data
            const forecastEndpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=5f878ace7edf2edc1c3a0ee023e62386&units=metric`;

            fetch(forecastEndpoint)
                .then((response) => response.json())
                .then((data) => {
                    const hourlyForecasts = document.getElementById('hourlyForecasts');

                    // Loop through the forecast data for the next 24 hours
                    for (let i = 0; i < 8; i++) {
                        const timestamp = data.list[i].dt;
                        const date = new Date(timestamp * 1000);

                        // Get the hour and minute values
                        const hour = date.getHours();
                        const minutes = ('0' + date.getMinutes()).slice(-2);

                        // Get the temperature, icon, and weather description
                        const temperature = Math.round(data.list[i].main.temp) + '\xB0C';
                        const iconCode = data.list[i].weather[0].icon;
                        const description = data.list[i].weather[0].description;

                        // Display the forecast data for each hour
                        hourlyForecasts.innerHTML += `
              <div class="weather-by-hour__item">
                <div class="weather-by-hour__hour">${hour}:${minutes}</div>
                <img src="https://openweathermap.org/img/w/${iconCode}.png" alt="${description}">
                <div>${temperature}</div>
              </div>
            `;
                    }
                });
        })
        .catch((error) => {
            console.log(error);
        });
}