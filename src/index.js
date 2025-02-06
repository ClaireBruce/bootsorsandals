function fetchWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#windSpeed");
    let date = new Date(response.data.time * 1000);
    let timeElement = document.querySelector("#time");
    let iconElement = document.querySelector("#icon");
    
    
    

    console.log(response.data);

    temperatureElement.innerHTML = Math.round(temperature);
    descriptionElement.innerHTML = capitalize(response.data.condition.description);
    humidityElement.innerHTML = response.data.temperature.humidity;
    windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
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
    axios.get(apiUrl).then(fetchWeather);
}

function searchSubmit(event) {
    event.preventDefault();
    let searchInput =  document.querySelector("#search-form-input");

    searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

searchCity("Nottingham");
