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
    const { location, current, forecast } = response
    const object = {
      location: location.name,
      currentTemp: current.temp_f,
      condition: current.condition
    }
    res.locals.stats = object
    return next()

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