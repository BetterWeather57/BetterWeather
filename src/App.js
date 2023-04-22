import React, { useState, useEffect } from 'react';

export default function App() {
  //prop drill to SearchBar component
  const [locationName, setLocationName] = useState('');
  const [weatherData, setWeatherData] = useState([])
  //prop drill to savedLocation -> default state array/obj?
  const [savedLocation, setSavedLocation] = useState([]);
  
  //function for searchBar
  async function searchLocation(e) {
    e.prevent.default();
    // useState react hook for searchInput
    let response = await fetch(`http://localhost:3000/weather/:${locationName}`) //response received as Object
    const weatherInfo = await response.json();
    const infoArray = [...weatherInfo];
    //pass weatherData into setWeatherData
    await setWeatherData(infoArray);
  }


// function to fetch savedLocations
  useEffect(()=>{
    //fetch request to endpoint
    fetch(`http://localhost:3000/:${userId}/saved`)
      .then((response) => response.json())
      .then((data) => {
        //data is updated saved location document
        setSavedLocation([data])
      })
      .catch((err) => {
        console.log('Error fetching saved', err);
      })
  },[savedLocation])

  //function to handle onSubmit
  return (
    <div>
      <div className ='search-bar-saved-location-container'>
        <SearchBar locationName={lcoationName} setLocationName={setLocationName}/>
        <SavedLocation savedLocation={SavedLocation}/>
      </div>

      <div className = 'weather-stats-eco-tips-container'>
        <WeatherStats weatherData={weatherData} />
        <EcoTips weatherData={weatherData} />
      </div>
    </div>
  )
}


