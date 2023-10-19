const apiKey = '358fcb793a53c3da26743ae950044af5'
let cityNameCountry = ''
const inputForm = $('#input-form')
const userInput = $('#user-input')
const weatherBtn = $('#weather-btn')
const outputSection = $('#output-section')
const weatherP = $('#weather-p')
const futureOutput = $('#future-output')

function clearOutput() {
  $(weatherP).empty()
  $('#future-name').empty()
  $('#future-date').empty()
  $('#future-temp').empty()
  $('#future-conditions').empty()
  $('#future-humidity').empty()
  $('#future-windspeed').empty()
  $('#day-2-date').empty()
  $('#day-2-temp').empty()
  $('#day-2-conditions').empty()
  $('#day-2-humidity').empty()
  $('#day-2-windspeed').empty()
  $('#day-3-date').empty()
  $('#day-3-temp').empty()
  $('#day-3-conditions').empty()
  $('#day-3-humidity').empty()
  $('#day-3-windspeed').empty()
  $('#day-4-date').empty()
  $('#day-4-temp').empty()
  $('#day-4-conditions').empty()
  $('#day-4-humidity').empty()
  $('#day-4-windspeed').empty()
  $('#day-5-date').empty()
  $('#day-5-temp').empty()
  $('#day-5-conditions').empty()
  $('#day-5-humidity').empty()
  $('#day-5-windspeed').empty()

}

function CurrentWeather() {

  clearOutput()

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
  
function futureWeather() {

  clearOutput()
  
  const futureApi = `https://api.openweathermap.org/data/2.5/forecast?q=${cityNameCountry}&units=imperial&appid=${apiKey}`
  fetch(futureApi)
  .then(function (res) {
       
    return res.json();
  }).then(function (info) {
  
  var futurePlace = info.city.name
  var collectedData = []
  
  
  
  info.list.forEach(function (chunk) {
    
    var forecastDate = dayjs(chunk.dt_txt);
    
    var currentDate = dayjs();
    
    
    if (forecastDate.date() !== currentDate.date()) {
      
      var hour = forecastDate.hour();
      
      
      if (hour === 12) {
        var futureDate = chunk.dt_txt
        var futureTemp = chunk.main.temp
        var futureConditions = chunk.weather[0].description
        var futureHumidity = chunk.main.humidity
        var futureWindspeed = chunk.wind.speed
        var futureCode = chunk.weather[0].icon
        var futureIcon = new Image()

        futureIcon.src = `http://openweathermap.org/img/w/${futureCode}.png`
        
        collectedData.push(futureDate, futureTemp, futureConditions, futureHumidity, futureWindspeed, futureIcon)

      }
    }
  })
  $('#future-name').append('Place: ' + futurePlace)
  $('#future-date').append('Date: ' + collectedData[0])
  $('#future-temp').append('Temp: ' + collectedData[1] + ' °F')
  $('#future-conditions').append('Condtions: ' + '<li class="future-list" id="futureContainer">' + collectedData[2])
  $('#futureContainer').append(collectedData[5])
  $('#future-humidity').append('Humidity: ' + collectedData[3] + ' %')
  $('#future-windspeed').append('Windspeed: ' + collectedData[4] + ' mph')

  $('#day-2-date').append('Date: ' + collectedData[6])
  $('#day-2-temp').append('Temp: ' + collectedData[7] + ' °F')
  $('#day-2-conditions').append('Condtions: ' + '<li class="future-list" id="day-2Container">' + collectedData[8])
  $('#day-2Container').append(collectedData[11])
  $('#day-2-humidity').append('Humidity: ' + collectedData[9] + ' %')
  $('#day-2-windspeed').append('Windspeed: ' + collectedData[10] + ' mph')

  $('#day-3-date').append('Date: ' + collectedData[12])
  $('#day-3-temp').append('Temp: ' + collectedData[13] + ' °F')
  $('#day-3-conditions').append('Condtions: ' + '<li class="future-list" id="day-3Container">' + collectedData[14])
  $('#day-3Container').append(collectedData[17])
  $('#day-3-humidity').append('Humidity: ' + collectedData[15] + ' %')
  $('#day-3-windspeed').append('Windspeed: ' + collectedData[16] + ' mph')

  $('#day-4-date').append('Date: ' + collectedData[18])
  $('#day-4-temp').append('Temp: ' + collectedData[19] + ' °F')
  $('#day-4-conditions').append('Condtions: ' + '<li class="future-list" id="day-4Container">' + collectedData[20])
  $('#day-4Container').append(collectedData[23])
  $('#day-4-humidity').append('Humidity: ' + collectedData[21] + ' %')
  $('#day-4-windspeed').append('Windspeed: ' + collectedData[22] + ' mph')

  $('#day-5-date').append('Date: ' + collectedData[24])
  $('#day-5-temp').append('Temp: ' + collectedData[25] + ' °F')
  $('#day-5-conditions').append('Condtions: ' + '<li class="future-list" id="day-5Container">' + collectedData[26])
  $('#day-5Container').append(collectedData[29])
  $('#day-5-humidity').append('Humidity: ' + collectedData[27] + ' %')
  $('#day-5-windspeed').append('Windspeed: ' + collectedData[28] + ' mph')



   })

 }

  document.querySelector('#weather-btn').addEventListener('click', function (event) {
   event.preventDefault()
    cityNameCountry = userInput.val()
    CurrentWeather()
    futureWeather()
    })