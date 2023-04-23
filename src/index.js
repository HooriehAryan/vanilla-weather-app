// -----------------------dispaly date & time-------------------
let now = new Date();

function formatDate(currentDate) {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jully",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  let date = now.getDate();

  let formattedDate = ` ${day}, ${date} ${month} `;
  return formattedDate;
}

let newDate = formatDate(now);
let minute = now.getMinutes();
if (minute.toString().length === 1) {
  minute = "0" + minute;
}
let hour = now.getHours();
if (hour.toString().length === 1) {
  hour = "0" + hour;
}
let NewDateTime = document.querySelector("#date-time");
NewDateTime.innerHTML = `${newDate} ${hour}:${minute}`;

// ---------------display current location weather------------------
function displayCurrentWeather(response) {
  //----short form coding
  document.querySelector("#city-title").innerHTML = response.data.name;

  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#maxTemp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#minTemp").innerHTML = Math.round(
    response.data.main.temp_min
  );

  //--add relevant main icon--
  let iconElement = document.querySelector("#main-icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);

  document.querySelector("#search-input").value = "";

  console.log(response);

  //   let temperatureC = Math.round(response.data.main.temp);
  //   let showTemp = document.querySelector("#current-temp");
  //   showTemp.innerHTML = `${temperatureC}`;

  //   let description = response.data.weather[0].main;
  //   let showDes = document.querySelector("#description");
  //   showDes.innerHTML = `${description}`;

  //   let humidity = response.data.main.humidity;
  //   let showHumidity = document.querySelector("#humidity");
  //   showHumidity.innerHTML = `${humidity}`;

  //   let windSpeed = Math.round(response.data.wind.speed);
  //   let showWind = document.querySelector("#windSpeed");
  //   showWind.innerHTML = `${windSpeed}`;

  //   let feelsLike = Math.round(response.data.main.feels_like);
  //   let showFeels = document.querySelector("#feelsLike");
  //   showFeels.innerHTML = `${feelsLike}`;

  //   let tempMax = Math.round(response.data.main.temp_max);
  //   let showTempMax = document.querySelector("#maxTemp");
  //   showTempMax.innerHTML = `${tempMax}`;

  //   let tempMin = Math.round(response.data.main.temp_min);
  //   let showTempMin = document.querySelector("#minTemp");
  //   showTempMin.innerHTML = `${tempMin}`;

  //   let cityTitle = document.querySelector("#city-title");
  //   cityTitle.innerHTML = `${response.data.name}`;
}

//----search current location with lat and long-------
function showPosition(position) {
  // console.log(position);
  // console.log(position.coords.latitude);
  // console.log(position.coords.longitude);
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let key = "cff65853d7c461490797b173c0cc1233";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric`;
  let searchInput = document.querySelector("#search-input");
  searchInput.value = "";
  axios.get(url).then(displayCurrentWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

// -----search city with it's name-------
function searchCity(city) {
  let key = "cff65853d7c461490797b173c0cc1233";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(displayCurrentWeather);
}

function cityTitle(event) {
  event.preventDefault();

  let newCity = document.querySelector("#search-input").value;

  if (newCity.length === 0) {
    alert("Enter a city name");
  } else {
    searchCity(newCity);
  }
}

//-----show default city values-------
searchCity("San Diego");

//-----click search button----
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", cityTitle);

//-----click currentLocation button----
let currentButton = document.querySelector("#currentLocation");
currentButton.addEventListener("click", getCurrentPosition);
