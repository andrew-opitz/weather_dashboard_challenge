const apiKey = '358fcb793a53c3da26743ae950044af5'
let cityNameCountry = ''
const inputDiv = $('#input-div')
const userInput = $('#user-input')
const weatherBtn = $('#weather-btn')
const outputDiv = $('#output-div')
const weatherP = $('#weather-p')

function showCurrentWeather() {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityNameCountry}&units=imperial&appid=${apiKey}`;
    fetch(apiUrl)
    .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then(data => {
          var info = data.main
          var place = data.name
          var feelsLike = data.main.feels_like
          var humidity = data.main.humidity
        var temp = data.main.temp
        var windSpeed = data.wind.speed
        var conditions = data.weather[0].description
        var lat = data.coord.lat
        var lon = data.coord.lon
        var iconCode = ''

        function getIconCode () {
            if(conditions === 'clear sky') {
                iconCode = '01d'
            } else if(conditions === 'few clouds') {
                iconCode = '02d'
            } else if(conditions === 'scattered clouds') {
                iconCode = '03d'
            } else if(conditions === 'broken clouds') {
                iconCode = '04d'
            }
        }
        getIconCode()


        const icon = new Image()
        icon.src = `http://openweathermap.org/img/w/${iconCode}.png`

        $(weatherP).append(place, temp, conditions, humidity, icon)
        
        // console.log(place, feelsLike, humidity, temp, windSpeed, conditions, icon, lat, lon)
       
    // append to input
        // $(weatherP).append('<ul>' + '<li class="weather-list">' + place + '</li>' + '<li class="weather-list">' + temp + ' °F' + '</li>' + '<li class="weather-list">' + feelsLike + ' °F' + '</li>', '</ul>')
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
    }

    document.querySelector('#weather-btn').addEventListener('click', function () {
        cityNameCountry = userInput.val()
        showCurrentWeather()
      })