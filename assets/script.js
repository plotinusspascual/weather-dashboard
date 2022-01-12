var searchButton = document.querySelector("#search-button");
var searchInput = document.querySelector("#search-input");
var searchForm = document.querySelector("#search-form");
//Get API
var apiKey = "6b5fdc1d15b44a61151758bf14473f6f";
var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" 
                  + "portland"
                  + "&units=imperial&appid=" + apiKey;
function getApi() {
  fetch(requestURL)
    .then(function(response){
      return response.json();
    })
    //fetches api data with keywords
    .then(function(data){
      console.log(data);
      displayInput(data);      
    })
}
getApi();

function displayInput(data){
  const{name} = data;
  const{icon, description} = data.weather[0];
  const{temp, humidity} = data.main;
  const{speed} = data.wind;
  console.log(name, icon, description, temp,humidity,speed);
  document.querySelector(".print-city").innerText = "Weather in " + name;
  document.querySelector(".temperature").innerText = "Temperature: " + temp;
  document.querySelector(".humidity").innerText = "Humidity: " + humidity;
  document.querySelector(".wind-speed").innerText = "Wind Speed: " + speed;
}

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
  // Make a submit function in search box html to store user input in localstorage
var formSubmitHandler = function(event){
  event.preventDefault();
  var city = searchInput.value.trim();
  if(city){
    getUserInput.value = "";
  }
}

searchForm.addEventListener('submit', formSubmitHandler);  
// THEN I am presented with current and future conditions for that city and that city is added to the search history
  // Call API and find documentation to fetch city's conditions

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
  // Get Api calls from userInput and print on screen these criterias

// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
  // Make a class in css that correlates to color of UV 
  // Case statements or IF Else statments to match UV index with class color

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
  // Fetch 5 day forecast API 

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
  // Use the submit button to render all weather criteria of the city