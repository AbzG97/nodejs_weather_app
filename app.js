
const weather_app_utils = require("./utils.js");


const address = process.argv[2];

if(!address){
    console.log("please provide an address");
} else {
    // getting location and weather for the location using callback chaining
    weather_app_utils.GetLocation(address, (error, location_data) => {
        if(error){
            return console.log("Error", error);
        }
        weather_app_utils.forecast(location_data.latitude, location_data.longtitude, (error, {temperature, weather_descriptions, precip_chance} = {}) => {
            if(error){
                return console.log('Error', error);
            }

            console.log(`Location data\n latitude: ${location_data.latitude},  longtitude: ${location_data.longtitude}, location: ${location_data.location}`);
            console.log(`Today's forecast\n tempreature: ${temperature}, it's ${weather_descriptions}, with %${precip_chance} chance of rain.`);
        

        });
        
    });

}

console.log("this just got added");

