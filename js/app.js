
// get all DOM elements
const currentLocationBtn = document.getElementById("current-location")


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


