document.addEventListener("DOMContentLoaded",() =>{

    const cityInput = document.getElementById("cityName")
    const getWeatherBtn = document.getElementById("getweatherDetails")
    const getWeatherDetails = document.getElementById("weather_details")
    const cityNameDisplay = document.getElementById("city_name")
    const TemperatureDisplay = document.getElementById("temperature")
    const WeatherDisplay = document.getElementById("weather")
    const error_message = document.getElementById("error_found")

    const API_KEY = '2cfa2864ce229fd6c70fb0c7a320b5b5'

    getWeatherBtn.addEventListener("click" , async () => {

        const city = cityInput.value.trim()
        if (!city) {
            showError()
        }

        // it many through error because we are accessing the api

        try{
            const weatherData = await fetchWeatherDetails(city);

            displayWeather(weatherData);


        }catch (error){
            showError();

        }

    })

    async function fetchWeatherDetails(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        

        if(!response.ok){
            showError()
            

        }

        const data = await response.json();

        
        return data
    }

    function displayWeather(data){
        
        const {name,main,weather} = data;
       const details= {city: name,temp:main['temp'] ,weather : weather[0]['description'] }
        

        cityNameDisplay.textContent=details.city;
        
        TemperatureDisplay.textContent=`Temperature : ${details.temp}°C`;
        
        WeatherDisplay.textContent=`Weather : ${details.weather}`;


        
        getWeatherDetails.classList.remove("hidden")
        error_message.classList.add("hidden")
    }

    function showError()
    {
        getWeatherDetails.classList.add("hidden")
        error_message.classList.remove("hidden")
    }








})