
// Function is called once the html page has loaded
//called from onLoad.js
function loadWeatherData(){
    fetchWeatherData()
}

// If the getCurrentPosition call is successful then we pass the user location to the openWeather API 
function onLocationSuccess(position)
{
    fetchWeatherData(position.coords.latitude.toFixed(2),position.coords.longitude.toFixed(2));
}

// If the getCurrentPosition call failed in any way (user didnt allow for location tracking or the navigator didnt return a response in time) 
// then we passed in the location of Toronto,Ontario (defined here) to the openWeather API
function onLocationFailure(error)
{
    console.log(error);
    // Default location values for the WeatherData Call
    var torontoLatitude = 43.65;
    var torontoLongitude = -79.38;

    fetchWeatherData(torontoLatitude, torontoLongitude);
}

function onHTMLLoaded()
{
    // Set the options passed to the navigator object (position accuracy, max response time from navigator)
    // NOTE: Most APIs like OpenWeather and the navigator use different time scales (seconds and milseconds) where as JavaScript
    // by default sticks to milseconds so its important to know which time scale and units are being used.
    var naivgatorOptions = {
        enableHighAccuracy: true,
        timeout: 1000 * 10, // 10 seconds
        maximumAge: 1000 * 60 * 5, // 5 minutes
    };

    // Call the navigator to find the current location of the user (there will be promt in the browser for ask for their location) with different function call if the
    // navigator success or fails.
    navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationFailure, naivgatorOptions);
}


// Using the latitude and longitude to fetch weather data from OpenWeather API via API key
function fetchWeatherData()
{
    var torontoLatitude = 43.65;
    var torontoLongitude = -79.38;
    var apiKey = '3de34fbb2c3485ba723ca873f8379cb9';
    var exculde = 'hourly,minutely,alerts';
    var openWeatherUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat='+torontoLatitude+'&lon='+torontoLongitude+'&exclude='+exculde+'&appid='+apiKey;
    // Fetch the weather data
    fetch(openWeatherUrl)
    .then(resp =>{
        if (!resp.ok)
        {
            throw new Error (resp.statusText);
        }
        return resp.json();
    })
    .then(data=>
        {
            displayWeatherData(data);
        })
    .catch(console.error);
}

// Change the weatherBox in the html to display the weather data
function displayWeatherData(data)
{
    console.log(data);
    var weatherBox = document.getElementById('weatherBox');
    var weatherCardBox = document.createElement('div');
    weatherCardBox.setAttribute('id', 'weatherCardBox');
    
    var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (var i = 0; i < 7; i++)
    {
        var daily = data.daily[i];
        var date = new Date(daily.dt * 1000);

        var weatherCard = document.createElement('div');
        weatherCard.setAttribute('class', 'weatherCard');
        
        var cardDay = document.createElement('h4');
        cardDay.setAttribute('class', 'weatherDay'); 
        cardDay.innerHTML = dayNames[date.getDay()];
        weatherCard.append(cardDay);

        var cardImage = document.createElement('img');
        cardImage.setAttribute('class', 'cardImage');
        cardImage.setAttribute('src', 'http://openweathermap.org/img/wn/'+daily.weather[0].icon+'@2x.png');
        cardImage.setAttribute('alt', daily.weather[0].description);
        weatherCard.append(cardImage);

        var cardDescription = document.createElement('h5');
        cardDescription.setAttribute('class', 'cardDescription'); 
        cardDescription.innerHTML = daily.weather[0].description;
        weatherCard.append(cardDescription);

        var cardTemp = document.createElement('p');
        cardTemp.setAttribute('class', 'cardTemp');
        cardTemp.innerHTML = (daily.temp.max - 273.15).toFixed(0) + '°C';
        weatherCard.append(cardTemp);

        weatherCardBox.append(weatherCard);
        
    }

    weatherBox.append(weatherCardBox);
}