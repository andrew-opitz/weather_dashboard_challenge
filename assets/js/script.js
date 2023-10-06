const apiKey = '358fcb793a53c3da26743ae950044af5'
let cityNameCountry = ''
const inputForm = $('#input-form')
const userInput = $('#user-input')
const weatherBtn = $('#weather-btn')
const outputSection = $('#output-section')
const weatherP = $('#weather-p')


function CurrentWeather() {
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
    
      var place = data.name
      var humidity = data.main.humidity
      var temp = data.main.temp
      var windSpeed = data.wind.speed
      var conditions = data.weather[0].description
      var iconCode = ''
      var lat = data.coord.lat
      var lon = data.coord.lon
      var currentDate = new Date()
      
      const icon = new Image()
    
      if (conditions === 'clear sky') {
        iconCode = '01d'
      } else if (conditions === 'few clouds') {
        iconCode = '02d'
      } else if (conditions === 'scattered clouds') {
        iconCode = '03d'
      } else if (conditions === 'broken clouds') {
        iconCode = '04d'
      } else if(conditions ==='overcast clouds') {
        iconCode = '04d'
      } else if (conditions === 'shower rain') {
        iconCode = '09d'
      } else if (conditions === 'rain') {
        iconCode = '10d'
      } else if (conditions === 'thunderstorm') {
        iconCode = '11d'
      } else if (conditions === 'snow') {
        iconCode = '13d'
      } else if (conditions === 'mist') {
        iconCode = '50d'
      }
    
      icon.src = `http://openweathermap.org/img/w/${iconCode}.png`
      
      $(weatherP).append('<ul>' +
      '<li class="weather-list">' + place + '</li>' +
      '<li class="weather-list">' + currentDate + '</li>' +
      '<li class="weather-list">' + temp + ' °F' + '</li>' +
      '<li class="weather-list" id="iconContainer">' + conditions + '</li>' +
      '<li class="weather-list">' + humidity + ' %' + '</li>' +
      '<li class="weather-list">' + windSpeed + ' mph' + '</li>' +
      '</ul>');
      
      $('#iconContainer').append(icon)
      
      
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
  }
  
  document.querySelector('#weather-btn').addEventListener('click', function (event) {
   event.preventDefault()
    cityNameCountry = userInput.val()
    CurrentWeather()
  })