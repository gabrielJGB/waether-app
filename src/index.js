const $searchInput = document.querySelector('.search-input');
const $searchButton = document.querySelector('.search-button');
const $unitsButton = document.querySelector('.units-button');
$searchButton.addEventListener('click', getSearch);
$unitsButton.addEventListener('click', changeUnits);

function getSearch(e) {
    e.preventDefault();
    let city = $searchInput.value;
    initialize(city);
}

async function initialize(city) {
    let API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=87eac2828250da32166d49f93bcbf215`;
    let weatherObject = await getResponse(API_URL);
    processWeatherData(weatherObject);
}

async function getResponse(API_URL) {
    const response = await fetch(API_URL);
    if (response.ok) {
        const JSONresponse = await response.json();
        return JSONresponse;
    }
    else {
        console.log('Not found');
    }
}

function processWeatherData(weatherObject) {
    let city = weatherObject.name;
    let country = weatherObject.sys.country;
    let temperature = Math.round(weatherObject.main.temp);
    let apparentTemp = Math.round(weatherObject.main.feels_like);
    let weatherDescription = weatherObject.weather[0].main;
    let iconId = weatherObject.weather[0].icon;
    let humidity = weatherObject.main.humidity;
    let wind = (weatherObject.wind.speed * 3.6).toFixed(2);
    let pressure = weatherObject.main.pressure;
    let windDeg = weatherObject.wind.deg;
    displayWeatherData(city, country, temperature, apparentTemp, iconId, weatherDescription, humidity, wind, pressure, windDeg);

}

function displayWeatherData(city, country, temperature, apparentTemp, iconId, weatherDescription, humidity, wind, pressure, windDeg) {
    let $weatherInfo = document.querySelector('.weather-info');
    let $city = document.querySelector('.city');
    let $country = document.querySelector('.country');
    let $temperature = document.querySelector('.temperature');
    let $apparentTemp = document.querySelector('.apparent-temperature');
    let $description = document.querySelector('.description');
    let $wind = document.querySelector('.wind');
    let $windDirection = document.querySelector('.wind-direction');
    let $iconImg = document.querySelector('.icon');
    let $humidity = document.querySelector('.humidity');
    let $pressure = document.querySelector('.pressure');

    $weatherInfo.style.display = "flex";
    $city.textContent = city;
    $country.textContent = country;
    $temperature.textContent = temperature;
    $apparentTemp.textContent = apparentTemp;
    $description.textContent = weatherDescription;
    $wind.textContent = wind;
    $iconImg.src = `https://openweathermap.org/img/wn/${iconId}@4x.png`;
    $humidity.textContent = humidity;
    $pressure.textContent = pressure;
    $windDirection.textContent = getWindDirection(windDeg);
}

function changeUnits() {
    let $unit = document.querySelectorAll('.unit');
    let $temperature = document.querySelector('.temperature');
    let $apparentTemp = document.querySelector('.apparent-temperature');

    if (this.checked) {  //then display temp in farenheit
        $unit.forEach((i) => {
            i.textContent = '°F';
        });
        let tempCelsius = Math.round(parseInt($temperature.textContent));
        $temperature.textContent = Math.round((tempCelsius * (9 / 5)) + 32);

        let apTempCelsius = Math.round(parseInt($apparentTemp.textContent));
        $apparentTemp.textContent = Math.round((apTempCelsius * (9 / 5)) + 32);
    }
    else { 
        $unit.forEach((i) => {
            i.textContent = '°C';
        })
        let tempFarenheit = Math.round(parseInt($temperature.textContent));
        $temperature.textContent = Math.round((tempFarenheit - 32) * (5 / 9));

        let apTempFarenheit = Math.round(parseInt($apparentTemp.textContent));
        $apparentTemp.textContent = Math.round((apTempFarenheit - 32) * (5 / 9));

    }
}


function getWindDirection(windDeg) {

    if ((337.5 < windDeg && windDeg < 360) || (0 < windDeg && windDeg < 22.5)) {
        return 'N';
    }
    else if (22.5 < windDeg && windDeg < 67.5) {
        return 'NE';
    }
    else if (67.5 < windDeg && windDeg < 112.5) {
        return 'E';
    }
    else if (112.5 < windDeg && windDeg < 157.5) {
        return 'SE';
    }
    else if (157.5 < windDeg && windDeg < 202.5) {
        return 'S';
    }
    else if (202.5 < windDeg && windDeg < 247.5) {
        return 'SW';
    }
    else if (247.5 < windDeg && windDeg < 292.5) {
        return 'W';
    }
    else if (292.5 < windDeg && windDeg < 337.5) {
        return 'NW';
    }
}