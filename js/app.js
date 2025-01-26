
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
const dateTabWrapper = document.getElementById("date-tab-wrapper");
const timeDetails = document.getElementById("time-details");
const timeBtnsWrapper = document.getElementById("time-btns-wrapper");


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
    // weather = await fetchWeather( url );
    weather = await fetchForcastWeather({ lat: latitude, lon: longitude });
    
    showWeatherInfo(weather);
    
}

const makeDateTab = ( tab, dayDatails ) => {
    
    const date = new Date( tab );
    const dayNames = ["sun", "mon", "tus", "wed", "thu", "fri", "sat" ]
    
    const dateTab = document.createElement("div")
    dateTab.className = "tab relative col-span-2 p-3 bg-[#262B4F] transition-all hover:bg-[#4F4772] rounded-xl flex justify-center items-center cursor-pointer";
    dateTab.id = tab;
    dateTab.innerHTML = `
        <div class="box-day capitalize">
            <div class="w-full flex items-center justify-between">
                <span class="text-sm" id="tab-temp-${tab}">${ dayDatails["00:00"].main.temp } °C</span>
                <img id="tab-icon-${tab}" src="https://openweathermap.org/img/wn/${ dayDatails["00:00"].weather[0].icon }.png" alt="weather" class="w-7 ml-2">
            </div>
            <div class="day text-lg font-bold text-center mt-2">${ dayNames[date.getDay()] }-${ date.getDate() }</div>
        </div>
        <div data-day='${ tab }' data-day-details='${ JSON.stringify(dayDatails) }' class="box-day-click w-full h-full absolute top-0 left-0 z-50 bg-transparent"></div>
    `;

    dateTabWrapper.appendChild(dateTab)
}

const updateTimeBtns = ( keys, day ) => {
    for (const [key, value ] of Object.entries( keys )) {
        document.getElementById(key).dataset.timeDetail = `${JSON.stringify(value)}`;
        document.getElementById(key).dataset.day = day;
    }
}

const showCurrentDetails = ( currentDetails ) => {
    // mainSideIcon.src = "";
    mainSideDegree.innerText = currentDetails.main.temp;
    mainSideDescription.innerText = currentDetails.weather[0].description;

    countery.innerText = weather.city.country;
    city.innerText = weather.city.name;
    lat.innerText = weather.city.coord.lat;
    lon.innerText = weather.city.coord.lon;
    sunRise.innerText = weather.city.sunrise;
    sunSet.innerText = weather.city.sunset;

    feelLike.innerText = currentDetails.main.feels_like;
    windSpeed.innerText = currentDetails.wind.speed;
    windDegree.innerText = currentDetails.wind.deg;
    maxTemp.innerText = currentDetails.main.temp_max;
    minTemp.innerText = currentDetails.main.temp_min;
    presure.innerText = currentDetails.main.pressure;
    humidity.innerText = currentDetails.main.humidity;
    seaLevel.innerText = currentDetails.main.sea_level;
    grndLevel.innerText = currentDetails.main.grnd_level;
}

const showWeatherInfo = ( weather ) => {
    // create date nvigations
    for (const [key, value] of Object.entries(weather.days)) {
        makeDateTab( key, value )
    }
    
    const currentDetails = Object.values(Object.values(weather.days)[0])[0]
    
    const keys = Object.values(weather.days)[0]
    const day = Object.keys(weather.days)[0]

    updateTimeBtns( keys, day )

    showCurrentDetails( currentDetails )
    
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

const showUnfoundCity = () => {
    loadCities.innerHTML = "";
    const li = document.createElement("li");
    li.className = "border-b-2 border-slate-500";
    li.innerHTML = `
        <a href="#" class="p-2 capitalize text-center text-red-500 font-bold block transition-all">the city you're looking for NOT Found</a>
    `;
    loadCities.appendChild(li);
}

searchInput.addEventListener("input", ( e ) => searchCity(e));
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

    if (search != "" ) {
        if ( searchCities.length == 0 && e.target.value != "" ) {
            showUnfoundCity()
        } else {

            loadCities.innerHTML = "";
            showSearchAutoComplete();
            searchCities.forEach(city => {
                createAutoLoadElem(city);
            })
            
        }
    } else {
        hideSeachAutoComplete( e )
        searchCities = [];
    }
    
};

loadCityData();

let fetchedForcastWeather = {};

const fetchForcastWeather = async ( objDetails ) => {
    let url;

    if ( 'name' in objDetails ) url = `https://api.openweathermap.org/data/2.5/forecast?q=${objDetails.name}&appid=${apiKey}&units=metric`;

    if ( 'lat' in objDetails ) url = `https://api.openweathermap.org/data/2.5/forecast?lat=${objDetails.lat}&lon=${objDetails.lon}&appid=${apiKey}&units=metric`;

    const res = await fetch( url );
    const { city, list } = await res.json();

    fetchedForcastWeather.city = city
    
    let chunk = 8;

    for ( let i = 0; i < 5; i++ ) {
        let newArr = list.splice(0, chunk);
        fetchedForcastWeather.days = {
            ...fetchedForcastWeather.days,
            [newArr[0].dt_txt.split(" ")[0]]: (() => {
                let times = {};
                newArr.forEach( timeStp => {
                    let keyName = `${timeStp.dt_txt.split(" ")[1].split(":")[0]}:00`;
                    times = {
                        ...times,
                        [keyName]: timeStp
                    }
                })

                return times
            })()
        }
    }
    
    // console.log(fetchedForcastWeather)

    return fetchedForcastWeather;

}

dateTabWrapper.addEventListener("click", ( e ) => showDayWeatherInfo( e ));
const showDayWeatherInfo = ( e ) => {
    if ( e.target.parentElement.classList.contains("tab")) {
        const weatherInfo = JSON.parse(e.target.dataset.dayDetails);
        const day = e.target.dataset.day

        console.log(weatherInfo)
        const currentDetails = Object.values(weatherInfo)[0]

        updateTimeBtns( weatherInfo, day )

        showCurrentDetails( currentDetails )

    }
}

timeBtnsWrapper.addEventListener("click", ( e ) => showTimeDetails( e ))

const showTimeDetails = ( e ) => {
    if (e.target.classList.contains("time-details")) {
        if (e.target.dataset.timeDetail) {
            const details = JSON.parse(e.target.dataset.timeDetail)
            showCurrentDetails( details )
            
            document.getElementById(`tab-temp-${e.target.dataset.day}`).innerText = details.main.temp
            document.getElementById(`tab-icon-${e.target.dataset.day}`).src = `https://openweathermap.org/img/wn/${ details.weather[0].icon }.png`
        } else {
            console.log("data not found")
        }
    }
}

// fetchForcastWeather({name: "beni mellal"});
// fetchForcastWeather({lat: 32.3373, lon: -6.3498});


// async function getWeather () {
//     const weather = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=-6.353335&lon=32.334193&appid=dd235072273e8b3d0e412e7e1d4435b7");

//     result = await weather.json();

    
// }

// getWeather();


