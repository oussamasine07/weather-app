
// get all DOM elements
const currentLocationBtn = document.getElementById("current-location")
const searchInput = document.getElementById("search-city");
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
const loadCities = document.getElementById("load-cities");
const autoCompletecities = document.getElementById("auto-complete-cities");

const apiKey = "dd235072273e8b3d0e412e7e1d4435b7";

let currentLocation = {};
let weatherInfo = null;


currentLocationBtn.addEventListener("click",() =>  getCurrentLocationWeather());

const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setCurrentLocationAndFetchWeather);
    } else {
        console.log("this browser does not support localization")
    }
}

const setCurrentLocationAndFetchWeather = async ({coords: { longitude, latitude }}) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    weather = await fetchWeather( url );

    showWeatherInfo(weather);
    
}

const showWeatherInfo = ( weather ) => {
    // mainSideIcon.src = "";
    mainSideDegree.innerText = weather.main.temp;
    mainSideDescription.innerText = weather.weather[0].description;
    countery.innerText = weather.sys.country;
    city.innerText = weather.name;
    lat.innerText = weather.coord.lat;
    lon.innerText = weather.coord.lon;
    sunRise.innerText = weather.sys.sunrise;
    sunSet.innerText = weather.sys.sunset;
    feelLike.innerText = weather.main.feels_like;
    windSpeed.innerText = weather.wind.speed;
    windDegree.innerText = weather.wind.deg;
    maxTemp.innerText = weather.main.temp_max;
    minTemp.innerText = weather.main.temp_min;
    presure.innerText = weather.main.pressure;
    humidity.innerText = weather.main.humidity;
    seaLevel.innerText = weather.main.sea_level;
    grndLevel.innerText = weather.main.grnd_level;
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


let citiesData = []; 
let searchCities = []; 


const loadCityData = async () => {
    const res = await fetch("./js/ville.json");
    citiesData = await res.json(); 
};

const createAutoLoadElem = ( { ville } ) => {

    const li = document.createElement("li");
    li.className = "border-b-2 border-slate-500";
    li.innerHTML = `
        <a href="#" class="p-2 capitalize text-[#141730] font-bold block transition-all hover:text-gray-500">${ ville }</a>
    `;
    loadCities.appendChild(li);
}

const showSearchAutoComplete = () => {
    autoCompletecities.classList.remove("hidden")
}

const hideSeachAutoComplete = ( e ) => {
    if( e.target ) e.target.value = "";
    autoCompletecities.classList.add("hidden")
}

searchInput.addEventListener("keydown", ( e ) => searchCity(e));
searchInput.addEventListener("blur", ( e ) => hideSeachAutoComplete(e));

const searchCity = (e) => {
    const search = e.target.value.toLowerCase();
    searchCities.length = 0;
    searchCities = [];

    if (search.length > 0) {
       
        citiesData.forEach(city => {
            if (city.ville.toLowerCase().startsWith(search)) {
                searchCities.push(city);
            }
        });
    }


    if ( searchCities.length == 0 && e.target.value != "" ) {
        console.log("city not found")
    } else {
        loadCities.innerHTML = "";

        if ( e.target.value == "" ) {
            hideSeachAutoComplete( e )
            searchCities = [];
        } else {
            
            showSearchAutoComplete();
            searchCities.forEach(city => {
                createAutoLoadElem(city);
            })
        }
        
    }
};

loadCityData();


// async function getWeather () {
//     const weather = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=-6.353335&lon=32.334193&appid=dd235072273e8b3d0e412e7e1d4435b7");

//     result = await weather.json();

    
// }

// getWeather();


