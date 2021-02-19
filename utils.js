
const request = require("request");

const GetLocation = (address, callback) => {
    // getting the location
    const geocodeURL = `http://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidmFuaWxsYXVuaWNvcm4iLCJhIjoiY2toeXk5aHpuMGk4ZDJ5cXE2YWZhczQwMyJ9.TEEfNWliK7gh6uVONOA0WQ&limit=1`;

    request({url: geocodeURL, json: true}, (error, response) => {
        if(error){
            callback("error unable to connect to the service", undefined);
        }else if(response.body.features.length == 0){
            callback("unable to find location", undefined);

        } else {
            callback(undefined, {
                latitude: response.body.features[0].geometry.coordinates[1],
                longtitude: response.body.features[0].geometry.coordinates[0],
                location: response.body.features[0].place_name
            });

        }
    });
}


  // getting the weather
  const forecast = (latitude, longtitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=cec6f01743fcd7a06557c4716e545bc7&query=${encodeURIComponent(latitude)},${encodeURIComponent(longtitude)}`;
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback(undefined, "unable to connect to weather service");
        } else if(response.body.error){
            callback(undefined, "unable to find location");
        } else {
            callback(undefined, {
                temperature: response.body.current.temperature,
                weather_descriptions: response.body.current.weather_descriptions,
                precip_chance: response.body.current.precip
            });

        }
    });
}

module.exports = {
    GetLocation: GetLocation,
    forecast: forecast
};