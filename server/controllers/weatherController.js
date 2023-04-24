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
    const { location, current, forecast } = response;
    const { name, region, localtime } = location;
    const { temp_f, condition, humidity, precip_in, gust_mph, wind_mph, air_quality } = current;
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
        const { hour } = currDay
        const hourly = []
        hour.forEach(eachHour => {
          const { time, temp_c, temp_f, condition } = eachHour
          hourly.push({ time, temp_c, temp_f, condition })
        })
        newObj.hour = hourly
      }
      eachDay.push(newObj)
      continue
    }  

    // data returned to front end
    const object = {
      location: { name, region, localtime },
      condition: condition,
      current: { temp_f, humidity, precip_in, gust_mph, wind_mph, air_quality },
      day: eachDay
    }
    // console.log(object);
    res.locals.stats = object;
    return next();

}

/* response object template
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
  }



}


*/



// export controller
module.exports = weatherController;