
let result;
const icon = document.getElementById("icon");

async function getWeather () {
    const weather = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=-6.353335&lon=32.334193&appid=dd235072273e8b3d0e412e7e1d4435b7");

    result = await weather.json();

    
}

getWeather();


