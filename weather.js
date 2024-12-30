const apiKey = `b322e2c27a4adecfc62f6bc54a1d29b4`;
// let city = `Bahawalpur`;
let date = new Date();
let todayDate = document.querySelector("#today-date");
todayDate.innerText = date.toDateString();

async function getWeatherData(city) {
    try{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);

    if(!response.ok){
        throw new Error("Unable to fetch weather data.");
    }

    const data = await response.json();
    console.log(data);

    // console.log(data.name);
    // console.log(data.weather[0].main);
    // console.log(data.main.temp);
    // console.log(data.wind.speed);
    // console.log(data.main.humidity);
    // console.log(data.visibility/1000);

    updateWeatherData(data);

    }
    catch(error){
        console.log(error);    
    }
}

let cityName = document.querySelector('.city-name');
let weatherCondition = document.querySelector('.weather-condition');
let temperature = document.querySelector('.temperature');
let air = document.querySelector('#air');
let humidity = document.querySelector('#humidity');
let visibility = document.querySelector('#visibility');
let weather_condition_container = document.querySelector("#weather-condition-container i");

function updateWeatherData(data) {
    cityName.innerText = data.name;
    weatherCondition.innerHTML = `<h3 class="weather-condition">${data.weather[0].main}</h3>`;
    temperature.innerText = `${Math.round(data.main.temp)} °C`;
    air.innerText = `${data.wind.speed} km/h`;
    humidity.innerText = `${data.main.humidity} %`;
    visibility.innerText = `${data.visibility / 1000} km`;
    const weather_icon_name = getWeatherIconName(data.weather[0].main);
    weather_condition_container.innerHTML = `<i class="material-icons me-2" style="font-size:40px;">${weather_icon_name}</i>`;
}

let city_name_input = document.querySelector("#city-name-input");
let formElement = document.querySelector('.search-form');

formElement.addEventListener("submit", function (e) {
    e.preventDefault();
    const city = city_name_input.value;
    if (city == "") {
        alert("Please enter any city name.");
    } else {
        getWeatherData(city);
    }
    city_name_input.value = "";
});

function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };

    return iconMap[weatherCondition] || "help";
}