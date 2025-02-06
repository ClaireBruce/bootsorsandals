function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    searchCity(searchInputElement.value);
  }
  
  function displayTemperature(response) {
    let temperature = Math.round(response.data.temperature.current);
    let temperatureCurrent = document.querySelector("#current-temperature-value");
    temperatureCurrent.innerHTML = temperature;
  
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = response.data.city;
  }
  function searchCity(city) {
    let apiKey = "03a1od824e34f4b433a55ct759776fa6";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
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
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  let currentDateElement = document.querySelector("#current-date");
  let currentDate = new Date();
  
  currentDateElement.innerHTML = formatDate(currentDate);
  