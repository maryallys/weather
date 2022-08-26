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
let dayShort =[
"Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
]

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
let counter = now.getDay()+1;
//forecast for the next 5 days

function dayTommorow(dayT){
if (counter < 7) {
    dayT = [dayShort[counter]]
}
else {
    counter = counter - 7
    dayT = [dayShort[counter]];    
}
counter = counter+1;
return dayT
}

let fiveDays = [dayTommorow()];
let nextDays = document.querySelectorAll(".nextDay");
let times = 0;
  while (times < 4) {
  fiveDays.push(dayTommorow());
  nextDays[times].innerHTML = fiveDays[times];
  times = times + 1;
}

// temperature converter

let tempArray = document.querySelectorAll(".temperatureC");
let lenthTemp = tempArray.length
let tempArrayC = []
let tempArrayF = []

times = 0
while (times < lenthTemp) {
let farenheit = [Math.round(tempArray[times].innerHTML*9/5+32)]
tempArrayF.push(farenheit)
tempArrayC.push(tempArray[times].innerHTML);
times = times + 1;
}

function tempCtoF(){
  changeTempFtoC.classList.remove("active");
  changeTempCtoF.classList.add("active");
times = 0
while (times < lenthTemp) {
    tempArray[times].innerHTML=tempArrayF[times]
    times = times + 1;
  //  let changeWeightF = document.querySelector(".tempF")
  //  let changeWeightC = document.querySelector(".tempC")
}}

//convertor from F to C
function tempFtoC(){
 changeTempFtoC.classList.add("active");
 changeTempCtoF.classList.remove("active");
 times = 0
    while (times < lenthTemp) {
    tempArray[times].innerHTML=tempArrayC[times]
    times = times + 1;
}}

//call function converter temperature
//tempC, tempF class

let changeTempCtoF = document.querySelector(".tempF");
changeTempCtoF.addEventListener("click", tempCtoF);

let changeTempFtoC = document.querySelector(".tempC");
changeTempFtoC.addEventListener("click", tempFtoC);

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

function showTemperature(response) {
  console.log(response.data);
  let citySelector = document.querySelector("#mainCity");
  let temperatureSelector1 = document.querySelector(".temperatureC");
  let temperatureSelector2 = document.querySelectorAll(".temperatureC");
  let typeSelector = document.querySelector("#typeW");
  let humiditySelector = document.querySelector("#humidity");
  let windSelector = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
 console.log(iconElement);

   citySelector.innerHTML =  response.data.name;
   temperatureSelector1.innerHTML = Math.round(response.data.main.temp);
   temperatureSelector2[1].innerHTML = Math.round(response.data.main.feels_like)
   typeSelector.innerHTML = response.data.weather[0].description;
   humiditySelector.innerHTML = Math.round(response.data.main.humidity)
   windSelector.innerHTML = Math.round(response.data.wind.speed)
   iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
   iconElement.setAttribute("alt", response.data.weather[0].description);

}
