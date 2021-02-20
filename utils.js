const request_promise = require("request-promise");

const GetWeather = (address) => {
    // getting the location
    const geocodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${address}&limit=1&appid=c56f6f5adad7d73cd791504a079198d8`;
    request_promise(geocodeURL).then((data) => {
       // console.log(parsed_data);
        //console.log("data returned");
        const parsed_data = JSON.parse(data);
        //console.log(jsonData);
        const location_data =  {
            name: parsed_data[0].name,
            country: parsed_data[0].country,
            lat: parsed_data[0].lat,
            lon: parsed_data[0].lon
        }
        request_promise(`http://api.openweathermap.org/data/2.5/weather?lat=${location_data.lat}&lon=${location_data.lon}&units=metric&appid=c56f6f5adad7d73cd791504a079198d8`)
        .then((weather_data) => {
            const parsed_weather_data = JSON.parse(weather_data);
            const forecast = {
                place_name: parsed_weather_data.name,
                weather_desc: parsed_weather_data.weather[0].description,
                temp: parsed_weather_data.main.temp,
                feels_like: parsed_weather_data.main.feels_like,
                humidity: parsed_weather_data.main.humidity,
            }
            console.log(forecast);
        }).catch((e) => {
            console.log("unable to connect to forecast services");
            console.log(e);
        })
    }).catch ((e) => {
        console.log("unable to connect to location services");
        console.log(e);
    });
}

//GetWeather("Mississauga, Ontario");

module.exports = GetWeather;