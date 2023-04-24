import React, {useState} from 'react'
import '../stylesheets/WeatherStats.css'
export default function WeatherStats(props){
  const {weatherData, setSavedLocation, saved, setSaved} = props;
  console.log('weatherData inside WeatherStats file: ', weatherData)
  console.log('what is the state of saved: ', saved)
  function saveLocation(){
    //check to see if saved state is false
      //this will only allow users to save current weather data once to mitigate duplicates
    if(saved===false){
      //test to see if save button functionality
      console.log('clicked')
      console.log('weatherData to be saved inside db: ', weatherData)
      setSaved(true);
      //fetch request to backend at specific endpoint to save current weather data inside db
      //invoke setSaved(true)
      //invoke setSavedLocation()
    }

  }

  return(

    <div className = 'weather-data-display'>
      <div className = 'current-temp-data'>
        <div className='location-name'>{weatherData.location}</div>
        <div className='current-temp'>{weatherData.currentTemp}&deg;F</div>
        {/* <div className='high-low-temps'>High: {weatherData.forecast.day.maxtemp_f} Low: {weatherData.forecast[0].day.maxtemp_f}</div> */}
      </div>

      <div className = 'hourly-forcast-display'>
        <span>Hourly Forecast</span>
        {/* {weatherData.forecast.forecastday[2].map((hour, index) => (
          <div className = 'hourly-forecast-data'>
            <div className = 'hourly-temp'>hour.temp_f</div>
            <div className = 'hourly-condition'>hour.condition.text</div>
            <div className = 'hourly-condition-icon'>hour.condition.icon</div>
            <div className = 'hourly-time'>hour.condition.time</div>
          </div>
        ))} */}
      </div>

      <div className = 'other-forecast-info'>
          <span>other information</span>
          {/* <div className = 'air-quality-display'>
            Air Quality
            <ul >
              <li>CO level: {weatherData.air_quality.co}</li>
              <li>O3: {weatherData.air_quality.no2}</li>
              <li>NO2 level: {weatherData.air_quality.o3}</li>
              <li>SO2 level: {weatherData.air_quality.so2}</li>
            </ul>
          </div>
          <div className = 'sunrise-sunset-display'>
            Sunrise: {weatherData.forcast.forcastday[1].sunrise }
            Sunset: {weatherData.forcast.forcastday[1].sunset}
          </div>
          <div className = 'humidity-display'>Humidity</div> */}

      </div>

      <button onClick={saveLocation} className = 'save-button'>Save</button>
    </div>
  )
}