var searchBtn = document.getElementById('searchBtn');
var searchBar = document.getElementById('searchInput');
var position = document.getElementById('position');
var dateInfo = document.getElementById('date');
var iconImage = document.getElementById('weather-icon');
var temperature = document.getElementById('temp');
var wind = document.getElementById('wind-speed');
var humid = document.getElementById('humidity');
var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=2d203897c818f6961dfed3403024864b

function getCoordinatesApi(city) {

    // let city = "Miami"
    var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=2&appid=2d203897c818f6961dfed3403024864b`

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var lat = data[0].lat;
            var lon = data[0].lon;
            getWeatherApi(lat, lon);
        })
}


function getWeatherApi(lat, lon) {
    // template literal string
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=2d203897c818f6961dfed3403024864b`
    console.log("clicked")
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var place = data.city.name;
            var date = new Date(data.list[0].dt * 1000);
            var icon = data.list[0].weather[0].icon;
            var temp = data.list[0].main.temp;
            windSpeed = data.list[0].wind.speed;
            humidity = data.list[0].main.humidity;

            
            var fahrenheit = ((temp - 273.15) * 9) / 5 + 32;
            var temperatureValue = fahrenheit.toFixed(0);

            var day = date.getDate();
            var month = date.getMonth() + 1; 
            var year = date.getFullYear();

            var formattedDate = `${month}/${day}/${year}`;

            position.textContent = place;
            dateInfo.textContent = formattedDate;
            iconImage.src = `http://openweathermap.org/img/w/${icon}.png`;
            temperature.textContent = `Temperature: ${temperatureValue} °F`;
            wind.textContent = `Windspeed: ${windSpeed} mph`;
            humid.textContent = `Humidity: ${humidity} %` ;

        });

}

getCoordinatesApi();

searchBtn.addEventListener('click', function () {
    var city = searchBar.value;
    searchHistory.unshift(city);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    let h1 = document.createElement('h1');
    h1.textContent = city;
    document.querySelector('body').appendChild(h1);
    getCoordinatesApi(city);
})