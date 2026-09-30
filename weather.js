const apiKey = "3c64a31fb395ca51f27ff2d6793e7d31";
const cityInput = document.getElementById("city-input")
const getWeatherBtn = document.getElementById("get-weather-btn")
const weatherinfo = document.getElementById("weather-info")
const cityName = document.getElementById("city-name")
const temperature = document.getElementById("temperature")
const humidity = document.getElementById("humidity")
const description = document.getElementById("description")
const forcastInfo = document.getElementById("forcast-info")
const forecastList = document.getElementById("forcast-list")

getWeatherBtn.addEventListener("click",GetWeather)

function GetWeather(){
    const city = cityInput.value.trim();

    if(city === ""){
        alert("Please enter a city name.")
        return;
    }
    fetchWeatherData(city);
}
function fetchWeatherData(city){
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`


//fetch current weather data//
fetch(currentWeatherUrl)
.then((response)=> response.json())
.then((data)=>{
    cityName.textContent = `weather in ${data.name}`;
    temperature.textContent = `temperature: ${data.main.temp}°C`;
    humidity.textContent = `humidity: ${data.main.humidity}%`;
    description.textContent = `discription: ${data.weather[0].description}`
})

fetch(forecastUrl)
.then((response)=> response.json())
.then((forecastData)=>{
    displayForecast(forecastData);
})
.catch((error)=>{
    console.log(error);
})
}

// function displayForecast(forecastData){
//     forecastList.innerHTML = "";
//     for(let i=0;i<forecastData.list.length;i+=8){
//         const dayForecast = forecastData.list[i];
//         const listItem = document.createElement("li");

       
//      listItem.textContent = `${new Date(dayForecast.dt * 1000).toLocaleDateString()} - Temp ${dayForecast.main.temp}°C - ${dayForecast.weather[0].description}`
//      forecastList.appendChild(listItem)  
//       }
// }



function displayForecast(forecastData) {

    forecastList.innerHTML = "";

    for (let i = 0; i < forecastData.list.length; i += 8) {

        const dayForecast = forecastData.list[i];

        // Create card
        const card = document.createElement("div");
        card.classList.add("forecast-card");

        // Date
        const date = document.createElement("div");
        date.classList.add("forecast-date");

        date.textContent = new Date(
            dayForecast.dt * 1000
        ).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short"
        });

        // Weather icon
        const icon = document.createElement("div");
        icon.classList.add("forecast-icon");

        const weather = dayForecast.weather[0].main;

        if (weather === "Clear") {
            icon.textContent = "☀️";
        } 
        else if (weather === "Clouds") {
            icon.textContent = "☁️";
        } 
        else if (weather === "Rain") {
            icon.textContent = "🌧️";
        } 
        else if (weather === "Thunderstorm") {
            icon.textContent = "⛈️";
        } 
        else if (weather === "Snow") {
            icon.textContent = "❄️";
        } 
        else {
            icon.textContent = "🌤️";
        }

        // Temperature
        const temp = document.createElement("div");
        temp.classList.add("forecast-temp");

        temp.textContent = `${dayForecast.main.temp}°C`;

        // Description
        const desc = document.createElement("div");
        desc.classList.add("forecast-description");

        desc.textContent = dayForecast.weather[0].description;

        // Add everything to card
        card.appendChild(date);
        card.appendChild(icon);
        card.appendChild(temp);
        card.appendChild(desc);

        // Add card to forecast container
        forecastList.appendChild(card);
    }
}