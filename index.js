let now = new Date();
function formatDate(date) {
  console.log(date);
  let hours = date.getHours();
  if (hours < 10) {
    // hours = '0${hours}';
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    //  minutes = '0${minutes}';
  }
  let year = now.getFullYear();
  let currentDate = now.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let currentDay = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let currentMonth = months[now.getMonth()];
  return `${currentDay} ${currentMonth} ${currentDate}, ${year}, ${hours}:${minutes}`;
}

function updateCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city");
  let cityName = document.querySelector(".current-city");
  cityName.innerHTML = `${city.value}`;
  let apiKey = "0f3d4549d502cb2a816dc90919978e74";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", updateCity);

function Celsius() {
  let degree = document.querySelector(".current-temperature");
  let temperature = degree.innerHTML;
  degree.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click", Celsius);

function Farenheit() {
  let degree = document.querySelector(".current-temperature");
  let temperature = degree.innerHTML;
  degree.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let farenheit = document.querySelector("#farenheit-link");
farenheit.addEventListener("click", Farenheit);

function displayTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(response);
  console.log(temperature);
  let degree = document.querySelector(".current-temperature");
  degree.innerHTML = `${temperature}`;
  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector(".humidity");
  humidityElement.innerHTML = `${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector(".wind");
  windSpeed.innerHTML = `${wind}mph`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function displayCurrentCity(response) {
  let cityName = response.data.name;
  let displayCity = document.querySelector(".current-city");
  displayCity.innerHTML = `${cityName}`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  console.log(latitude);
  let longitude = position.coords.longitude;
  console.log(longitude);
  let apiKey = "0f3d4549d502cb2a816dc90919978e74";
  let apiUrl = `https://appi.openweathermap.org/data/2.5/weather?lat=${latitude}&lon${longitude}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(`${apiUrl}`).then(displayTemperature);
  axios.get(`${apiUrl}`).then(displayCurrentCity);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current-btn");
currentButton.addEventListener("click", getCurrentPosition);
