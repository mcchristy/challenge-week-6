var searchBtn = document.getElementById('searchBtn');
var searchBar = document.getElementById('searchInput');
var location = document.getElementById('location');
var dateInfo = document.getElementById('date');
var iconImage = document.getElementById('weather-icon');
var temperature = document.getElementById('temp');
var wind = document.getElementById('wind-speed');
var humid = document.getElementById('humidity');

function getWeatherApi() {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}'
    console.log("clicked")
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var place = data.name;
            var {date} = data.time;
            var icon = data.symbol;
            var {temp} = data.temperature;
            var windSpeed = data.windSpeed;
            var humidity = data.humidity;

            var dateinGMT = new Date(date * 1000);
            var fahrenheit = (temp * 9) / 5 + 32;

            searchBar.addEventListener('search', () {
            
            location.textContent = place;
            dateInfo.textContent = dateinGMT;
            iconImage.src = icon;
            temperature.textContent = fahrenheit;
            wind.textContent = windSpeed;
            humid.textContent = humidity;
        })
        })
        
}