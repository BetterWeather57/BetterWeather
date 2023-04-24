// npm install node-fetch@2
// up to date node-fetch doesn't work with most updated express???
const fetch = require('node-fetch');

/* API Key: 2d27cf9efb8f4b5a842225540232104
endpoint: http://api.weatherapi.com/v1/forecast.json?key=2d27cf9efb8f4b5a842225540232104&q=San Diego&days=1&aqi=yes
params:
    q: location
    aqi=yes: include aqi
    days: (default 7)
*/

//store api key in .env file!
const API_KEY = '2d27cf9efb8f4b5a842225540232104'

const weatherController = {};


weatherController.getWeather = async (req, res, next) => {
  // location to grab weather for stored on req.params, spaces that exist location name are required in fetch req below (i.e. San Diego)
  const locationId = req.params.location;
  
  const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${locationId}&days=7&aqi=yes`)
    .then(res => res.json())
    .then(result => { // *** UNFINISHED: parse data to get info needed by frontend
        // console.log(result)
        return result
    })
    .catch(err => {
      return next({
        log: `weatherController.getWeather: ${err}`,
        message: { err: 'Error fetching weather data' }
      });
    })

    // deconstructing necessary weather stats from returned weather data
    const { location, current, forecast } = response;
    const { name, region, localtime } = location;
    const { last_updated, temp_f, temp_c, condition, humidity, precip_in, gust_mph, wind_mph, air_quality } = current;
    // daily/hourly forecast -> hourly for current day, daily conditions for rest of the week
    const eachDay = []
    for (let i = 0; i < forecast.forecastday.length; i++) {
      const currDay = forecast.forecastday[i]
      const { date, day } = currDay
      const { maxtemp_f, mintemp_f, avgtemp_f, condition } = day
      const newObj = {
        date,
        day: { maxtemp_f, mintemp_f, avgtemp_f, condition }
      }
      if (i === 0) {
        const { hour, astro } = currDay
        const { sunrise, sunset } = astro
        const hourly = []
        hour.forEach(eachHour => {
          const { time, temp_c, temp_f, condition } = eachHour
          hourly.push({ time, temp_c, temp_f, condition })
        })
        newObj.hour = hourly
        newObj.astro = { sunrise, sunset }
      }
      eachDay.push(newObj)
      continue
    }  

    // data returned to front end
    const object = {
      location: { name, region, localtime },
      condition: condition,
      current: { last_updated, temp_f, temp_c, humidity, precip_in, gust_mph, wind_mph, air_quality },
      day: eachDay
    }
    console.log(object);
    res.locals.stats = object;
    return next();

}

/*
weather api response object template (weather stats for day parsed, no forecast yet)
{
  location: {
    name: "locationName",
    region: "state/region name",
    localtime: "2023-04-22 11:41"
  },
  current: {
    "last_updated": "2023-04-22 11:30",
    "temp_c": 16.1,
    "temp_f": 61.0,
  },
"condition": {
    "text": "Partly cloudy",
            "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
}
"humidity": 71,
"precip_in": 0.0,
"gust_mph": 12.8,
"wind_mph": 10.5,
"air_quality": {
  "co": 270,
  "no2": 23,
  "o3": 46.5,
  "so2": 7.59
  "pm2_5": 23,
  "pm10": 24.0,
  "us-epa-index": 2,
  "gb-defra-index": 2,
},


forecast: {
    forecastdate:[
       {
    day:{
        maxtemp_f:
        mintemp_f: 
       },
    
    hour: [{
        temp_f
        temp_c
        time
        condition: {
            text:
            condition:
        }
}]


*/






// export controller
module.exports = weatherController;