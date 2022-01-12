var searchButton = document.querySelector("#search-button");
var searchInput = document.querySelector("#search-input");
var searchForm = document.querySelector("#search-form");

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
  // Make a submit function in search box html to store user input in localstorage
// THEN I am presented with current and future conditions for that city and that city is added to the search history
  // Call API and find documentation to fetch city's conditions
var formSubmitHandler = function(event){
  event.preventDefault();
  var city = searchInput.value.trim();
    getApi(city);
    fiveDayForecast(city);
   // getLonLat(city);
}

searchForm.addEventListener('submit', formSubmitHandler); 

//Get API
var apiKey = "6b5fdc1d15b44a61151758bf14473f6f";

function getApi(city) {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
  + city
  + "&units=imperial&appid=6b5fdc1d15b44a61151758bf14473f6f")
    .then(function(response){
      return response.json();
    })
    //fetches api data with keywords
    .then(function(data){
      console.log(data);
      displayInput(data);      
    })
}
//getApi();

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
  // Get Api calls from userInput and print on screen these criterias
function displayInput(data){
  const{name} = data;
  const{icon, description} = data.weather[0];
  const{temp, humidity} = data.main;
  const{speed} = data.wind;
  const{lon,lat} = data.coord;
  console.log(name, icon, description, temp,humidity,speed, lon, lat);
  document.querySelector(".print-city").innerText = "Weather in " + name;
  document.querySelector(".temperature").innerText = "Temperature: " + temp;
  document.querySelector(".humidity").innerText = "Humidity: " + humidity;
  document.querySelector(".wind-speed").innerText = "Wind Speed: " + speed;
}

 
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
  // Make a class in css that correlates to color of UV 
  // Case statements or IF Else statments to match UV index with class color
// function getUV(city){
//   fetch("https://api.openweathermap.org/data/2.5/onecall?lat="
//   + lat + "&lon=" + lon 
//   +"&exclude=hourly&appid="
//   + apiKey)
//     .then(function(response){
//       return response.json();
//     })
//     //fetches api data with keywords
//     .then(function(data){
//       console.log(data);
//       getLonLat(data);      
//     })
// }

// function getLonLat(data){
//   const{lon,lat} = data.coord;
// console.log(lon,lat);
// }  
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
  // Fetch 5 day forecast API 
function fiveDayForecast(city) {
  fetch("https://api.openweathermap.org/data/2.5/forecast?q=" 
  + city
  + "&units=imperial&appid=6b5fdc1d15b44a61151758bf14473f6f")
    .then(function(response){
      return response.json();
    })
    //fetches api data with keywords
    .then(function(data){
      console.log(data);
      displayFiveDayForecast(data);      
    })
  }

function displayFiveDayForecast(data){
  var printForecast = document.querySelector(".print-forecast");
  var forecastStartDate = moment().format("MMM Do");
  console.log(forecastStartDate);

  printForecast.innerHTML = "";


  for(var i=0; i<5; i++){
    const{temp} = data.list[i].main;
    const{description} = data.list[i].weather[0];
    const{humidity} = data.list[i].main;

    var forecastDate = moment().add(i, "days").format("MMM Do");
    console.log(forecastDate);

    var forecastEl = document.createElement("div");
    forecastEl.classList = "row justify-space-between align-center";
    
      var dateEl = document.createElement("li");
      dateEl.textContent = forecastDate;
      var tempEl = document.createElement("li");
      tempEl.textContent = " Temp: "+ temp;
      var conditionEl = document.createElement("li");
      conditionEl.textContent = "Weather Conditions: " + description;
      var humidityEl = document.createElement("li");
      humidityEl.textContent = " Humidity: " + humidity;
    
    forecastEl.appendChild(dateEl);
    forecastEl.appendChild(tempEl);
    forecastEl.appendChild(conditionEl);
    forecastEl.appendChild(humidityEl);
    
    printForecast.appendChild(dateEl);
    printForecast.appendChild(tempEl);
    printForecast.appendChild(conditionEl);
    printForecast.appendChild(humidityEl);
  }  
} 
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
  // Use the submit button to render all weather criteria of the city