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
  updateCity(city.value)
  let cityName = document.querySelector(".current-city");
  cityName.innerHTML = `${city.value}`;
  let apiKey = "0f3d4549d502cb2a816dc90919978e74";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", updateCity);

function showCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitLink.classList.add("active");
  let celciusTemperature =(fahrenheitTemperature - 32) * (5/9);
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;


function displayTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(response);
  console.log(temperature);
  let degree = document.querySelector("#temperature");
  degree.innerHTML = `${temperature}`;

  let description = document.querySelector("#stats");
  description.innerHTML = response.data.weather[0].description;
  
  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector(".humidity");
  humidityElement.innerHTML = `${humidity}%`;


  let wind = Math.round(response.data.main.humidity);
  let windSpeed = document.querySelector(".wind");
  windSpeed.innerHTML = `${wind}mph`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn$response.data.weather[0].icon@2xpng`);
  
  iconElement.serAttribute("alt", response.data.weather[0].description);

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
  let apiUrl = `https://appi.openweathermap.org/data/2.5/weather?lat=${latitude}&lon${longitude}&appid=${apiKey}&units=metric`;
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


let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-Link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

search("London");