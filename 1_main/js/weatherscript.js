var cityInput = "";
var searchButton = "";
var locationButton = "";
var currentWeatherDiv = "";
var weatherCardsDiv = "";
const API_KEY_WEATHER = "0bba40c76fc5974cefb7211ad754bde2"; // API key for OpenWeatherMap API

const createWeatherCard = (cityName, weatherItem, index) => {
    if (index === 0) {
        // HTML for the main weather card
        return `<div class="details">
                    <h2 style="font-size: 3.5rem;">${cityName} <br>(${weatherItem.dt_txt.split(" ")[0]})</h2>
                    <h6 style="font-size: 2.5rem;">온도: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                    <h6 style="font-size: 2.5rem;">바람: ${weatherItem.wind.speed} M/S</h6>
                    <h6 style="font-size: 2.5rem;">습도: ${weatherItem.main.humidity}%</h6>
                </div>
                <div class="icon">
                    <img src="https://openweathermap.org/img/wn/${
                        weatherItem.weather[0].icon
                    }@4x.png" alt="weather-icon" style="width:100px; height:100px;">
                    <h6 style="font-size: 3.5rem;">${weatherItem.weather[0].description}</h6>
                </div>`;
    } else {
        // HTML for the other five day forecast card
        return `<li class="card">
                    <h3 style="font-size: 3.5rem;">(${weatherItem.dt_txt.split(" ")[0]})</h3>
                    <img src="https://openweathermap.org/img/wn/${
                        weatherItem.weather[0].icon
                    }@4x.png" alt="weather-icon">
                    <h6 style="font-size: 2.5rem;">온도: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                    <h6 style="font-size: 2.5rem;">바람: ${weatherItem.wind.speed} M/S</h6>
                    <h6 style="font-size: 2.5rem;">습도: ${weatherItem.main.humidity}%</h6>
                </li>`;
    }
};

const getWeatherDetails = (cityName, latitude, longitude) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY_WEATHER}&lang=kr`;

    fetch(WEATHER_API_URL)
        .then((response) => response.json())
        .then((data) => {
            // Filter the forecasts to get only one forecast per day
            const uniqueForecastDays = [];
            const fiveDaysForecast = data.list.filter((forecast) => {
                const forecastDate = new Date(forecast.dt_txt).getDate();
                if (!uniqueForecastDays.includes(forecastDate)) {
                    return uniqueForecastDays.push(forecastDate);
                }
            });

            // Clearing previous weather data
            cityInput.value = "";
            currentWeatherDiv.innerHTML = "";
            weatherCardsDiv.innerHTML = "";

            // Creating weather cards and adding them to the DOM
            fiveDaysForecast.forEach((weatherItem, index) => {
                const html = createWeatherCard(cityName, weatherItem, index);
                if (index === 0) {
                    currentWeatherDiv.insertAdjacentHTML("beforeend", html);
                } else {
                    weatherCardsDiv.insertAdjacentHTML("beforeend", html);
                }
            });
        })
        .catch(() => {
            alert("기상예보를 가져오는 동안 오류가 발생했습니다!");
        });
};

const getCityCoordinates = () => {
    const cityName = cityInput.value.trim();
    if (cityName === "") return;
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY_WEATHER}&lang=kr`;

    // Get entered city coordinates (latitude, longitude, and name) from the API response
    fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
            if (!data.length) return alert(`${cityName} 지역에 대한 위치를 찾을 수 없습니다.`);
            const { lat, lon, name } = data[0];
            getWeatherDetails(name, lat, lon);
        })
        .catch(() => {
            alert("지역 정보를 가져오는 동안 오류가 발생했습니다.");
        });
};

const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords; // Get coordinates of user location
            // Get city name from coordinates using reverse geocoding API
            const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY_WEATHER}&lang=kr`;
            fetch(API_URL)
                .then((response) => response.json())
                .then((data) => {
                    const { name } = data[0];
                    getWeatherDetails(name, latitude, longitude);
                })
                .catch(() => {
                    alert("지역 이름을 가져오는 동안 오류가 발생했습니다.");
                });
        },
        (error) => {
            // Show alert if user denied the location permission
            if (error.code === error.PERMISSION_DENIED) {
                // alert("지리적 위치 요청을 성공적으로 전송했으나 거부되었습니다.");
            } else {
                alert("지리적 위치 요청 오류입니다. 위치를 다시 확인해주세요.");
            }
        }
    );
};
