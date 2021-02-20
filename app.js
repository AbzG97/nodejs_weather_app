const weather_app_utils = require("./utils.js");
const address = process.argv[2];

if(!address){
    console.log("please provide an address");
} else {
    weather_app_utils(address);

}



