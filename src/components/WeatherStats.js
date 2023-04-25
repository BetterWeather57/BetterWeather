import React, {useState} from 'react'
import '../stylesheets/WeatherStats.css'

export default function WeatherStats(props){
  const {setSavedLocation, saved, savedLocation, setSaved, locationName, selectedLocation, setSelectedLocation} = props;

  // console.log('weatherData inside WeatherStats file: ', weatherData)
  // console.log('what is the state of saved: ', saved)
  //extract the hour from last updated time
  const time = selectedLocation.current.last_updated; //'2023-04-23 19:30'
  const currentHour = time.slice(11)
  // console.log('current time: ', currentHour) //19
  const body = document.querySelector('body')
  const condition = selectedLocation.condition.text
  // console.log('condition', condition)
  // change background based on conditions
  condition.includes('Clear') ? 
      body.setAttribute('style', 'background-image: linear-gradient(-90deg, #0D324D 30%, #7F5A83 99%);' ) :
  condition.includes('snow' || 'Snow' || 'Blizzard' || 'freezing' || 'Freezing') ?
      body.setAttribute('style', 'background-image: linear-gradient(-90deg, #FFFFFF 30%, #91A6FF 80%);' ) :
  condition.includes('cloudy' || 'Cloudy' || 'Overcast' || 'Mist' || 'Fog' || 'fog' || 'drizzle' || 'showers') ?
      body.setAttribute('style', 'background-image: linear-gradient(-90deg, #DBE7FC 30%, #1D2951 99%);' ) :
  body.setAttribute('style', 'background-image: linear-gradient(-90deg, #AFF1DA 30%, #F9EA8F 99%);' )



  // used to create current week for 7 day forecast
  const weekDay = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
                  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]    
  const timeStamp = [ '12AM', '1AM', '2AM', '3AM', '4AM', '5AM', 
                    '6AM', '7AM', '8AM', '9AM', '10AM', '11AM',
                    '12PM', '1PM', '2PM', '3PM', '4PM', '5PM',
                    '6PM', '7PM', '8PM', '9PM', '10PM', '11PM' ]
  // populate a current week based on the current date
  const now = new Date()
  const currentDay = now.getDay()
  const currentWeek = []
  for (let i = currentDay; i < 8; i++) {
    currentWeek.push(weekDay[i])
  }

  function saveLocation(){
    //check to see if saved state is false
      //this will only allow users to save current weather data once to mitigate duplicates
    if(saved===false){
      //test to see if save button functionality
      // console.log('clicked')
      // console.log('weatherData to be saved inside db: ', weatherData)
      setSaved(true);
      //fetch request to get current userId
      // const userId = 
      //fetch request to backend at specific endpoint to save current weather data inside db
      // await fetch(`http://localhost:3000/6444bea26f5f28963025d4d5/addNewLocation`)
      
      // invoke setSavedLocation()
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
        <div className='location-name'>{selectedLocation.location.name}</div>
        <div className='location-region'>{selectedLocation.location.region}</div>
        <div className='current-temp'>{selectedLocation.current.temp_f}&deg;F / {selectedLocation.current.temp_c}&deg;C</div>
        <div className='current-temp-text'>{selectedLocation.condition.text}</div>
        {/* <div className='high-low-temps'>High: {selectedLocation.forecast.day.maxtemp_f} Low: {selectedLocation.forecast[0].day.maxtemp_f}</div> */}
      </div>

      <div className = 'hourly-forecast-display-container'>
        <div className='forecast-title'>Hourly Forecast</div>
        <div className = 'hourly-forecast-display'>
          {selectedLocation.day[0].hour.map((hour, index) => (
            <div key={`hour${index}`} className = 'hourly-forecast-data'>
              {/* <div className = 'hourly-time'>{hour.time.slice(11)}</div> */}
              <div className = 'hourly-time'>{timeStamp[ new Date(hour.time).getHours() ]}</div>
              
              <img className = 'hourly-condition-icon' src = {`${hour.condition.icon}`} />

              <div className = 'hourly-temp-f'><strong>{hour.temp_f}&deg;F</strong></div>
              <div className = 'hourly-temp-c'>{hour.temp_c}&deg;C</div>
            </div>
          ))}
        </div>
      </div>
      

      <div className = 'seven-day-forecast-container'>
          <div className='forecast-title'>7-Day Forecast</div>
          <div className = 'seven-day-forecast-display'>
            {selectedLocation.day.map((day, index)=>(
              <div key={`day${index}`} className = 'seven-day-forecast-data'>
                <div className = 'daily-temp-f'><strong>{day.day.maxtemp_f}&deg;F</strong></div>
                <img className = 'daily-condition-icon' src={`${day.day.condition.icon}`} />
                <div className = 'daily-date'>{currentWeek[index]}</div>
                <div className = 'daily-date'>{day.date.slice(5)}</div>
              </div>
            ))}
          {/* {day.date} */}
          </div>
      </div>
      
      <div className = 'other-forecast-info'>
          <ul className = 'air-quality-list'>
            <div classname='forecast-title'>Air Quality</div>
            {Object.keys(selectedLocation.current.air_quality).map((element, index)=>(
              <li key = {`air-element-${index}`} className = 'element-info'>
                <strong>{element.toUpperCase()}:</strong>  {selectedLocation.current.air_quality[element]}
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