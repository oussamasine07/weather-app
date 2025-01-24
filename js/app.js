
let result;
const icon = document.getElementById("icon");
const currentLocationBtn = document.getElementById("current-location")

const currentLocation = {};

const setLocation = (position) => {
    currentLocation.longitude = position.coords.longitude;
    currentLocation.latitude = position.coords.latitude;
}

const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setLocation);
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


