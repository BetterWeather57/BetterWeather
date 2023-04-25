import React, {useState} from 'react'
import '../stylesheets/WeatherStats.css'
export default function WeatherStats(props){
  const {setSavedLocation, saved, savedLocation, setSaved, locationName, selectedLocation, setSelectedLocation} = props;

  console.log('selectedLocation inside WeatherStats file: ', selectedLocation)
  console.log('what is the state of saved: ', saved)
  //extract the hour from last updated time
  const time = selectedLocation.current.last_updated; //'2023-04-23 19:30'
  const currentHour = time.slice(11)
  console.log('current time: ', currentHour) //19
  const weekDay = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]

  async function saveLocation(){
    //check to see if saved state is false
      //this will only allow users to save current weather data once to mitigate duplicates
    if(saved===false){
      //test to see if save button functionality
      console.log('clicked')
      console.log('selectedLocation: ', selectedLocation) //should be cerritos(default current location)
      //invoke setSaved(true)
      setSaved(true);
      //fetch request to backend at specific endpoint to save current weather data inside db
      await fetch(`http://localhost:3000/user/6444bea26f5f28963025d4d5/addNewLocation`, {
        method: 'PATCH',
        headers: {'content-type' : 'application/json'},
        body: JSON.stringify({
          location: `${selectedLocation.location.name}, ${selectedLocation.location.region}`
        })
      })
      .then(response=>response.json())
      .then(data=>{ data})
      if(!locationName) {
        setSavedLocation([selectedLocation])
      }else{
        setSavedLocation([...savedLocation, selectedLocation]);
      }
    }

  }
  return(

    <div className = 'weather-data-display'>
      <div className = 'current-temp-data'>
        <div className='location-name'>{selectedLocation.location.name}, {selectedLocation.location.region}</div>
        <div className='current-temp'>{selectedLocation.current.temp_f}&deg;F / {selectedLocation.current.temp_c}&deg;C</div>
        <div className='current-temp-text'>{selectedLocation.condition.text}</div>
        {/* <div className='high-low-temps'>High: {selectedLocation.forecast.day.maxtemp_f} Low: {selectedLocation.forecast[0].day.maxtemp_f}</div> */}
      </div>

      <div className = 'hourly-forecast-display-container'>
        <div>Hourly Forecast</div>
        <div className = 'hourly-forecast-display'>
          {selectedLocation.day[0].hour.map((hour, index) => (
            <div key={`hour${index}`} className = 'hourly-forecast-data'>
              <div className = 'hourly-temp-f'><strong>{hour.temp_f}&deg;F</strong></div>
              <div className = 'hourly-temp-c'>{hour.temp_c}&deg;C</div>
              
              <img className = 'hourly-condition-icon' src = {`${hour.condition.icon}`} />
              <div className = 'hourly-time'>{hour.time.slice(11)}</div>
            </div>
          ))}
        </div>
      </div>
      

      <div className = 'seven-day-forecast-container'>
          <div>7-Day Forecast</div>
          <div className = 'seven-day-forecast-display'>
            {selectedLocation.day.map((day, index)=>(
              <div key={`day${index}`} className = 'seven-day-forecast-data'>
                <div className = 'daily-temp-f'><strong>{day.day.maxtemp_f}&deg;F</strong></div>
                <img className = 'daily-condition-icon' src={`${day.day.condition.icon}`} />
                <div className = 'daily-date'>{weekDay[new Date(day.date).getDay()]}</div>
              </div>
            ))}
          {/* {day.date} */}
          </div>
      </div>
      
      <div className = 'other-forecast-info'>
          <ul className = 'air-quality-list'>
            Air Quality
            {Object.keys(selectedLocation.current.air_quality).map((element, index)=>(
              <li key = {`air-element-${index}`} className = 'element-info'>
                <strong>{element}:</strong>  {selectedLocation.current.air_quality[element]}
              </li>
            ))}
          </ul>

          
          <div className = 'sunset-sunrise-humidity-container'>
            <div className = 'sunset-sunrise'>
              <div>Sunrise: {selectedLocation.day[0].astro.sunrise.slice(1)}</div>
              <div>Sunset: {selectedLocation.day[0].astro.sunset.slice(1)}</div>
            </div>

            <div className = 'humidity'>
              Humidity
              <div>{selectedLocation.current.humidity}</div>
            </div>
          </div>
          

      </div>

      <button onClick={saveLocation} className = 'save-button'>Save</button>
    </div>
  )
}