let apiKey = "500df23a19b510acb3b117489ca64dfa";
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let month = [
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

function formatDate(today) {
  today = `${days[now.getDay()]}, ${"</br>"} ${
    month[now.getMonth()]
  } ${now.getDate()}`;
  return today;
}

function currentTime(timeNow) {
  let hoursNow = now.getHours();
  let minutesNow = now.getMinutes();
  if (hoursNow < 10) {
    hoursNow = "0" + hoursNow;
  }
  if (minutesNow < 10) {
    minutesNow = "0" + minutesNow;
  }
  timeNow = hoursNow + ":" + minutesNow;
  return timeNow;
}

let date = document.querySelector(".date");
let time = document.querySelector(".time");
date.innerHTML = formatDate();
time.innerHTML = currentTime();

//Temperature API. See API key on the top.
//update weather in current city
function currentWeather(city) {
  city = document.querySelector("#mainCity").innerHTML;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
currentWeather();

//weather in other city
function cityInput(event) {
  event.preventDefault();
  let form = document.querySelector("#searchInput");
  let cityNew = document.querySelector("#mainCity");
  let cityIn = form.value;
  cityNew.innerHTML = cityIn;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityIn}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  return cityIn;
}

//weather in current point
function showPosition(position) {
  navigator.geolocation.getCurrentPosition(showPosition);
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let passForm = document.querySelector("#searchForm");
passForm.addEventListener("submit", cityInput);
let currentLocationButton = document.querySelector(".currentLocation");
currentLocationButton.addEventListener("click", showPosition);

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weathercast);
}

function showTemperature(response) {
  //console.log(response.data);
  let citySelector = document.querySelector("#mainCity");
  let temperatureSelector1 = document.querySelector("#temp1");
  let temperatureSelector2 = document.querySelector("#temp2");
  let typeSelector = document.querySelector("#typeW");
  let humiditySelector = document.querySelector("#humidity");
  let windSelector = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  getForecast(response.data.coord);

  citySelector.innerHTML = response.data.name;
  temperatureSelector1.innerHTML = Math.round(response.data.main.temp_min);
  temperatureSelector2.innerHTML = Math.round(response.data.main.temp_max);
  typeSelector.innerHTML =
    response.data.weather[0].description.charAt(0).toUpperCase() +
    response.data.weather[0].description.slice(1);
  humiditySelector.innerHTML = Math.round(response.data.main.humidity);
  windSelector.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

//forecast for the next 5 days
function weathercast(response) {
  let forecastDay = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let dayShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return dayShort[day];
  }

  forecastHTML = `<div class="row">`;
  forecastDay.forEach(function (forecastDay, index) {
    if ((index > 0) & (index < 6)) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
            <h3 class="tomorrow">
               <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt="clear"
              id="icon"
              width="50px"/>
              <br />
              <strong><span class="temperatureC">${Math.round(
                forecastDay.temp.max
              )}</span>°</strong>
              <br />
              <span class="temperatureC">${Math.round(
                forecastDay.temp.min
              )}</span>°<br />
              <span class="nextDay">${formatDay(forecastDay.dt)}</span>
            </h3>
          
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
