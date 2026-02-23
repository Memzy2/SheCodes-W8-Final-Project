// Feature 2
function search(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-inp");
  let mainCity = document.querySelector("#current-c");
  mainCity.innerHTML = inputCity.value;
}

let currentCity = document.querySelector("#search-form");
currentCity.addEventListener("submit", search);

// Feature 1
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let date = new Date();
let day = days[date.getDay()];
let hours = date.getHours();
let minutes = date.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}

if (hours < 10) {
  hours = `0${hours}`;
}

let currentC = document.querySelector("#main-city");
currentC.innerHTML = `${day} ${hours}:${minutes}`;

//Adding the Weather API
function changeT(response) {
  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;

  let descriptionElement = document.querySelector("#description")
  let humidityElement = document.querySelector("#humidity")
  let windElement = document.querySelector("#wind")
  let tempElement = document.querySelector("#change-t")
  let iconElement = document.querySelector("#icon");
  
  tempElement.innerHTML = `${temperature}`;
  descriptionElement.innerHTML = response.data.condition.description
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`
  windElement.innerHTML = `${response.data.wind.speed}km/h`
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" img class="current-temperature-icon">`

  getForecast(response.data.city);
}

function searchtemp(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-inp");
  let city = searchInput.value;

  let apiKey = "c7fa13d333obb49ef9t40cc2acbb1bec";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(changeT);
}

function getForecast(city) {
  let apiKey = "c7fa13d333obb49ef9t40cc2acbb1bec";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units+metric`;
  axios(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function displayForecast(response) {
  console.log(response.data);
 
  let forecastHtml = "";
  
  response.data.daily.forEach(function (day) {
    forecastHtml = 
      forecastHtml +
      `
      <div class="weather-forecast-minibox">
       <div class="weather-forecast-day">Tue</div>
          <div class="weather-forecast-icon">
          <img src="${day.condition.icon_url}" /> 
          </div>
          <div class="weather-forecast-temperatures">
            <div class="little-temps">
             <strong>${Math.round(day.temperature.maximum)}°</strong>
            </div>
            <div class="little-temps">${Math.round(day.temperature.minimum)}°</div>
          </div>
      </div>
     `;
  }); 
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let form2 = document.querySelector("#search-form");
form2.addEventListener("submit", searchtemp);
