
// get all DOM elements
const currentLocationBtn = document.getElementById("current-location")
const mainSideIcon = document.getElementById("main-side-icon");
const mainSideDegree = document.getElementById("main-side-degree");
const mainSideDescription = document.getElementById("main-side-description");
const countery = document.getElementById("countery");
const city = document.getElementById("city");
const lat = document.getElementById("lat");
const lon = document.getElementById("lon");
const sunRise = document.getElementById("sun-rise");
const sunSet = document.getElementById("sun-set");
const feelLike = document.getElementById("feel-like");
const windSpeed = document.getElementById("wind-speed");
const windDegree = document.getElementById("wind-degree");
const maxTemp = document.getElementById("max-temp");
const minTemp = document.getElementById("min-temp");
const presure = document.getElementById("presure");
const humidity = document.getElementById("humidity");
const seaLevel = document.getElementById("sea-level");
const grndLevel = document.getElementById("grnd-level");

const apiKey = "dd235072273e8b3d0e412e7e1d4435b7";

let currentLocation = {};
let weatherInfo = null;

const showWeatherInfo = ( weather ) => {

}

const setCurrentLocationAndFetchWeather = async (position) => {
    currentLocation.longitude = position.coords.longitude;
    currentLocation.latitude = position.coords.latitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ currentLocation.latitude }&lon=${ currentLocation.longitude }&appid=${ apiKey }`;

    weatherInfo = await fetchWeather( url );

    console.log(weatherInfo)
}

const fetchWeather = async ( url ) => {
    try {
        const res = await fetch(url);
        const weather = await res.json();
        return weather;
    } catch (error) {
        console.log(error);
    }
    
}

const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setCurrentLocationAndFetchWeather);
    } else {
        console.log("this browser does not support localization")
    }
}



currentLocationBtn.addEventListener("click", getCurrentLocationWeather);

// async function getWeather () {
//     const weather = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=-6.353335&lon=32.334193&appid=dd235072273e8b3d0e412e7e1d4435b7");

//     result = await weather.json();

    
// }

// getWeather();


