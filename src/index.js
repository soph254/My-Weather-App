let now = new Date();
function formatDate(date) {
  console.log(date);
  let hours = date.getHours();
  if (hours < 10) {
    // hours = '0${hours}';
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
      minutes = '0'+`${minutes}`;
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
    "Saturday",
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
    "December",
  ];
  let currentMonth = months[now.getMonth()];
  return `${currentDay} ${currentMonth} ${currentDate}, ${year}, ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  
  forecast.forEach(function(forecastDay, index) {
    if (index < 6) {

    
    forecastHTML = forecastHTML + `
      <div class="col-2">
      <div class = "weather-forecast-date"> ${formatDay(forecastDay.dt)}</div>
      <img
      src = "https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
      }@2x.png"
      alt = ""
      width= "60px"
      />
      <div class = "weather-forecast-temperatures">
      <span class = "weather-forecast-temperatures-max">
      ${
          Math.round(forecastDay.temp.max)
      } °</span> 
      <span class = "weather-forecast-temperatures-max">
      ${
          Math.round(forecastDay.temp.min)
      }­ °</span>
      </div>
      </div>
      `;
  }
  });
  
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);

  let apiKey = "0f3d4549d502cb2a816dc90919978e74";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function updateCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city");
  let cityName = document.querySelector(".current-city");
  let finalName = city.value[0].toUpperCase() + city.value.substring(1)
  cityName.innerHTML = `${finalName}`;
  search(finalName);
}
function search(city) {
  let apiKey = "0f3d4549d502cb2a816dc90919978e74";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", updateCity);

function displayTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(response);
  console.log(temperature);
  let degree = document.querySelector("#temperature");
  degree.innerHTML = `${temperature} °`;
  let description = document.querySelector("#temperature-description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector(".humidity");
  humidityElement.innerHTML = `${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector(".wind");
  windSpeed.innerHTML = `${wind}mph`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);

  
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
  let longitude = position.coords.longitude;
  let apiKey = "0f3d4549d502cb2a816dc90919978e74";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(displayTemperature);
  axios.get(`${apiUrl}`).then(displayCurrentCity);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current-btn");
currentButton.addEventListener("click", getCurrentPosition);


search("London");