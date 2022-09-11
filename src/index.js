let apiKey = "500df23a19b510acb3b117489ca64dfa";
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
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
  "December"
];


function formatDate(today) {
  today = `${days[now.getDay()]}, ${month[now.getMonth()]} ${now.getDate()}`;
  return today;
}

function currentTime(timeNow) { 
  let hoursNow = now.getHours()
  let minutesNow = now.getMinutes();
  if (hoursNow < 10) {
    hoursNow = "0"+hoursNow;
  }
  if (minutesNow <10) {
    minutesNow = "0"+ minutesNow;
  }
    timeNow = hoursNow + ":" + minutesNow;
    return timeNow
}

let date = document.querySelector(".date");
date.innerHTML = formatDate()
let time = document.querySelector(".time");
time.innerHTML = currentTime()

//Temperature API. See API key on the top.

//update weather in current city
function currentWeather(city){
  city = document.querySelector("#mainCity").innerHTML;
  console.log(city);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
currentWeather()

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

//weather in current c
function showPosition(position){
  navigator.geolocation.getCurrentPosition(showPosition);
  latitude = (position.coords.latitude)
  longitude = (position.coords.longitude)
  let apiUrl =
  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let passForm = document.querySelector("#searchForm");
passForm.addEventListener("submit", cityInput);
let currentLocationButton = document.querySelector(".currentLocation");
currentLocationButton.addEventListener("click", showPosition);

let temperatureC1 = null
let temperatureC2 = null;
let coord = null;

function getForecast(coordinates) {
  let apiUrl =  `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
  console.log(apiUrl);
  axios.get(apiUrl).then(weathercast)
}

function showTemperature(response) {
  console.log(response.data);
  let citySelector = document.querySelector("#mainCity");
  let temperatureSelector1 = document.querySelector("#temp1");
  let temperatureSelector2 = document.querySelector("#temp2");  
  let typeSelector = document.querySelector("#typeW");
  let humiditySelector = document.querySelector("#humidity");
  let windSelector = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
   temperatureC1 = response.data.main.temp;
   temperatureC2 = response.data.main.feels_like;
   getForecast(response.data.coord);
   
   
   citySelector.innerHTML =  response.data.name;
   temperatureSelector1.innerHTML = Math.round(response.data.main.temp);
   temperatureSelector2.innerHTML = Math.round(response.data.main.feels_like)
   typeSelector.innerHTML = response.data.weather[0].description.charAt(0).toUpperCase()+response.data.weather[0].description.slice(1);
   humiditySelector.innerHTML = Math.round(response.data.main.humidity)
   windSelector.innerHTML = Math.round(response.data.wind.speed)
   iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
   iconElement.setAttribute("alt", response.data.weather[0].description);
  
}

// temperature converter

//let tempArray = document.querySelectorAll(".temperatureC");
//let lenthTemp = tempArray.length;
//let tempArrayC = [];
//let tempArrayF = [];
//times = 0;
//while (times < lenthTemp) {
//let farenheit = [Math.round(tempArray[times].innerHTML*9/5+32)]
//tempArrayF.push(farenheit);
//tempArrayC.push(tempArray[times].innerHTML);
//times = times + 1;
//}
//function tempCtoF(){
//  changeTempFtoC.classList.remove("active");
//  changeTempCtoF.classList.add("active");
//times = 0
//while (times < lenthTemp) {
//    tempArray[times].innerHTML=tempArrayF[times]
//    times = times + 1;
  //  let changeWeightF = document.querySelector(".tempF")
  //  let changeWeightC = document.querySelector(".tempC")
//}}
//convertor from F to C
//function tempFtoC(){
// changeTempFtoC.classList.add("active");
// changeTempCtoF.classList.remove("active");
// times = 0
//    while (times < lenthTemp) {
//    tempArray[times].innerHTML=tempArrayC[times]
//    times = times + 1;
//}}

//call function converter temperature
//tempC, tempF class

let changeTempCtoF = document.querySelector(".tempF");
let changeTempFtoC = document.querySelector(".tempC");

changeTempCtoF.addEventListener("click", tempCtoF);
changeTempFtoC.addEventListener("click", tempFtoC);

function tempCtoF(){
 changeTempFtoC.classList.remove("active");
 changeTempCtoF.classList.add("active");
 let temp1 = document.querySelector("#temp1")
 let temp2 = document.querySelector("#temp2")
 temp1.innerHTML = Math.round(temperatureC1*9/5+32);
 temp2.innerHTML = Math.round(temperatureC2*9/5+32);
}
function tempFtoC(){
 changeTempFtoC.classList.add("active");
 changeTempCtoF.classList.remove("active");
 let temp1 = document.querySelector("#temp1")
 let temp2 = document.querySelector("#temp2")
 temp1.innerHTML = Math.round(temperatureC1);
 temp2.innerHTML = Math.round(temperatureC2);
}

//forecast for the next 5 days
function weathercast(response){
  console.log(response.data.daily);
let forecastElement = document.querySelector("#forecast");
let forecastHTML = ""
let dayShort =["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let counter = now.getDay()+1;
let fiveDays = [];
let times = 0;

while (times < 5) {
if (counter > 7) {
  counter = counter - 7}
fiveDays.push(dayShort[counter])    
counter = counter+1;
times = times + 1;
}

forecastHTML = `<div class="row">`;
fiveDays.forEach(function (day) {
//  forecastHTML = forecastHTML + `<div class="container week">
forecastHTML = forecastHTML + `<div class="col-2">
            <h3 class="tomorrow">
               <img
              src="http://openweathermap.org/img/wn/10d@2x.png"
              alt="clear"
              id="icon"
              width="60px"/>
              <br />
              <strong><span class="temperatureC">19</span>°</strong>
              <br />
              <span class="temperatureC">22</span>°<br />
              <span class="nextDay">${day}</span>
            </h3>
          
          </div>`
})
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
};
