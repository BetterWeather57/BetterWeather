import React, { useState, useEffect } from 'react';
import SearchBar from './Components/SearchBar'
export default function App() {
  //prop drill to SearchBar component
  const [locationName, setLocationName] = useState('');
  const [weatherData, setWeatherData] = useState([])
  //prop drill to savedLocation -> default state array/obj?
  const [savedLocation, setSavedLocation] = useState([]);

  // set a use state for current selected Location card
  // pass in the first saved location at the 0 index?
  const [seletedLocation, setSelectedLocation] = useState(savedLocation[0]);
  
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
        // set current saved location card to the 0 index
        setSelectedLocation([data[0]])
      })
      .catch((err) => {
        console.log('Error fetching saved', err);
      })
  },[savedLocation])

  // function to get geolocation

  //function to handle onSubmit
  return (
    <div>
      <div className ='search-bar-saved-location-container'>
        <SearchBar locationName={locationName} setLocationName={setLocationName} searchLocation={searchLocation}/>
        <SavedLocation savedLocation={savedLocation} onSelect={setSeletedLocation} />

      </div>

      <div className = 'weather-stats-eco-tips-container'>
        <WeatherStats weatherData={selectedLocation.weatherData} />
        <EcoTips weatherData={selectedLocation.weatherData} />
      </div>
    </div>
  )
}


