const API_KEY = "f4cf4ab50526479faa595819202109";


var searchCitySection = document.getElementsByClassName("module__form")[0];

const hideSearch = () => {
    searchCitySection.hidden = true;
}

const showSearch = () => {
    searchCitySection.hidden = false;
}

const moduleWeather = e => {
    e.target.parentElement.style.display = 'none';
}

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

async function getLocalCity() {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=auto:ip&days=5`)
    .then(res => res.json())
    .then(data => {
        document.getElementsByClassName("weather__icon")[0].getElementsByTagName("img")[0].src = "https:" + data.current.condition['icon'];
        document.getElementsByClassName("city__name")[0].innerHTML = data.location.name;
        document.getElementsByClassName("temperature__value")[0].innerHTML = data.current.temp_c;
        document.getElementsByClassName("pressure__value")[0].innerHTML = data.current.pressure_mb + " hPa";
        document.getElementsByClassName("humidity__value")[0].innerHTML = data.current.humidity + " %";
        document.getElementsByClassName("wind-speed__value")[0].innerHTML = data.current.wind_kph + " km/h"
        document.getElementsByClassName("temperature__value")[1].innerHTML = data.forecast.forecastday[0].day.avgtemp_c;        
        document.getElementsByClassName("temperature__value")[2].innerHTML = data.forecast.forecastday[1].day.avgtemp_c;        
        document.getElementsByClassName("temperature__value")[3].innerHTML = data.forecast.forecastday[2].day.avgtemp_c;        
        document.getElementsByClassName("day")[0].innerHTML = days[new Date(data.forecast.forecastday[0].date).getDay()];
        document.getElementsByClassName("day")[1].innerHTML = days[new Date(data.forecast.forecastday[1].date).getDay()];
        document.getElementsByClassName("day")[2].innerHTML = days[new Date(data.forecast.forecastday[2].date).getDay()];
        document.getElementsByClassName("weather__icon")[1].src = "https:" + data.forecast.forecastday[0].day.condition.icon;
        document.getElementsByClassName("weather__icon")[2].src = "https:" + data.forecast.forecastday[1].day.condition.icon;
        document.getElementsByClassName("weather__icon")[3].src = "https:" + data.forecast.forecastday[2].day.condition.icon;
    })
    document.getElementsByClassName("module__weather")[0].hidden = false;
}

setTimeout(function(){
    getLocalCity();
    document.getElementsByTagName("body")[0].className = "";
}, 500);





const createWeatherTab = e => {
    e.preventDefault();
    hideSearch();
    var city = e.target.children[0].value;
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log(data.current.condition['icon'])
            var weatherModule = document.getElementsByClassName("module__weather")[0];
            weatherClone = weatherModule.cloneNode(true);
            weatherClone.hidden = false;
            weatherClone.getElementsByClassName("weather__icon")[0].getElementsByTagName("img")[0].src = "https:" + data.current.condition['icon'];
            weatherClone.getElementsByClassName("city__name")[0].innerHTML = data.location.name;
            weatherClone.getElementsByClassName("temperature__value")[0].innerHTML = data.current.temp_c;
            weatherClone.getElementsByClassName("pressure__value")[0].innerHTML = data.current.pressure_mb + " hPa";
            weatherClone.getElementsByClassName("humidity__value")[0].innerHTML = data.current.humidity + " %";
            weatherClone.getElementsByClassName("wind-speed__value")[0].innerHTML = data.current.wind_kph + " km/h"
            weatherClone.getElementsByClassName("temperature__value")[1].innerHTML = data.forecast.forecastday[0].day.avgtemp_c;        
            weatherClone.getElementsByClassName("temperature__value")[2].innerHTML = data.forecast.forecastday[1].day.avgtemp_c;        
            weatherClone.getElementsByClassName("temperature__value")[3].innerHTML = data.forecast.forecastday[2].day.avgtemp_c;        
            weatherClone.getElementsByClassName("day")[0].innerHTML = days[new Date(data.forecast.forecastday[0].date).getDay()];
            weatherClone.getElementsByClassName("day")[1].innerHTML = days[new Date(data.forecast.forecastday[1].date).getDay()];
            weatherClone.getElementsByClassName("day")[2].innerHTML = days[new Date(data.forecast.forecastday[2].date).getDay()];
            weatherClone.getElementsByClassName("weather__icon")[1].src = "https:" + data.forecast.forecastday[0].day.condition.icon;
            weatherClone.getElementsByClassName("weather__icon")[2].src = "https:" + data.forecast.forecastday[1].day.condition.icon;
            weatherClone.getElementsByClassName("weather__icon")[3].src = "https:" + data.forecast.forecastday[2].day.condition.icon;
            var container = document.getElementsByTagName("section")[0];
            container.append(weatherClone)
            console.log(weatherClone)
        })
    }

