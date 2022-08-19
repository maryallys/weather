//let weather = { paris: { temp: 19.7,humidity: 80 },
//  tokyo: {temp: 17.3,humidity: 50},
//  lisbon: { temp: 30.2, humidity: 20 },
//  "san francisco": {  temp: 20.9, humidity: 100},
//  oslo: {  temp: -5,  humidity: 20 }};
//let city = prompt("Enter a city?");
//city = city.toLowerCase().trim();
//  if (city in weather) {
//    let farenheit = Math.round(weather[city].temp*9/5+32)
//alert (`It is currently ${Math.round(weather[city].temp)} °C (${farenheit}°F) in ${city} with a humidity of ${weather[city].humidity}%`)}
//else {alert(`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`)}

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
  today = 
    days[now.getDay()] + ", "+
    month[now.getMonth()] +
    " " +
    now.getDate();
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
//console.log(currentTime())
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
//console.log(dayTommorow())
let fiveDays = [dayTommorow()];
let times = 0;
while (times < 4) {
fiveDays.push(dayTommorow())
times = times + 1;
}
//console.log(fiveDays)
let nextDays = document.querySelectorAll(".nextDay");
times=0
//console.log(nextDays);
while (times < 5) {
nextDays[times].innerHTML = fiveDays[times];
times = times + 1;
}

// temperature converter

let tempArray = document.querySelectorAll(".temperatureC");
let tempArrayC = []
let farenheit = []
let tempArrayF = []
let lenthTemp = tempArray.length

times = 0
while (times < lenthTemp) {
farenheit = [Math.round(tempArray[times].innerHTML*9/5+32)]
tempArrayF.push(farenheit)
tempArrayC.push(tempArray[times].innerHTML);
times = times + 1;
//console.log(farenheit)
}
//console.log(tempArrayF);
//convertor from C to F
function tempCtoF(){
times = 0
while (times < lenthTemp) {
    tempArray[times].innerHTML=tempArrayF[times]
    times = times + 1;
    let changeWeightF = document.querySelector(".tempF")
    let changeWeightC = document.querySelector(".tempC")

}}
//convertor from F to C
function tempFtoC(){
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

//Change city part

function cityInput(event) {
  event.preventDefault();
  let form = document.querySelector("#searchInput");
  let cityIn = form.value;
  //console.log(form);
  //console.log(cityIn);
let cityNew = document.querySelector("#mainCity");
cityNew.innerHTML = cityIn
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityIn}&units=metric`;
axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  return cityIn;
}

let passForm = document.querySelector("#searchForm");
passForm.addEventListener("submit", cityInput);

//Temperature API. See API key on the top.
let latitude = 0
let longitude = 0

function showPosition(position){
  navigator.geolocation.getCurrentPosition(showPosition);
   latitude = (position.coords.latitude)
   longitude = (position.coords.longitude)
let apiUrl =
  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

 let currentLocationButton = document.querySelector(".currentLocation");
      currentLocationButton.addEventListener("click", showPosition);

//"http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=500df23a19b510acb3b117489ca64dfa"

function showTemperature(response) {
  console.log(response.data);
let city = response.data.name; 
let citySelector = document.querySelector("#mainCity");
citySelector.innerHTML =  `${city}`;

let temperatureL = Math.round(response.data.main.temp);
let temperatureSelector1 = document.querySelector(".temperatureC");
temperatureSelector1.innerHTML = temperatureL
  
let temperatureFeel = Math.round(response.data.main.feels_like);
let temperatureSelector2 = document.querySelectorAll(".temperatureC");
temperatureSelector2[1].innerHTML = temperatureFeel
  
let humidity =  Math.round(response.data.main.humidity);
let humiditySelector = document.querySelector("#humidity");
humiditySelector.innerHTML = humidity

let wind =  Math.round(response.data.wind.speed);
let windSelector = document.querySelector("#wind");
windSelector.innerHTML = wind
}