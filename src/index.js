function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#windSpeed");
    let date = new Date(response.data.time * 1000);
    let timeElement = document.querySelector("#time");
    let iconElement = document.querySelector("#icon");
    

    temperatureElement.innerHTML = Math.round(temperature);
    descriptionElement.innerHTML = capitalize(response.data.condition.description);
    humidityElement.innerHTML = response.data.temperature.humidity;
    windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;

    fetchForecast(response.data.city);
  }

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  
    let formattedDay = days[day];

    return `${formattedDay} ${hours}:${minutes}`;
}

function capitalize(text) {
return (!text || !text.length) ?
text :
(text[0].toUpperCase() + text.slice(1));
}

function searchCity(city) {
    let apiKey = "03a1od824e34f4b433a55ct759776fa6";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
}

function searchSubmit(event) {
    event.preventDefault();
    let searchInput =  document.querySelector("#search-form-input");

    searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function fetchForecast(city) {
  let apiKey = "03a1od824e34f4b433a55ct759776fa6";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
    forecastHtml =
      forecastHtml + 
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
        <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
                <strong>${Math.round(day.temperature.maximum)}°</strong></div>
            <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
            </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

searchCity("Nottingham");
