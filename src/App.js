import React, { useState, useEffect } from 'react';
import SearchBar from './Components/SearchBar';
import {SavedLocation} from './components/SavedLocation';
import { EcoTips } from './components/EcoTips';
import WeatherStats from './components/WeatherStats';
import './stylesheets/App.css'


export default function App() {
  //prop drill to necessary components
  const [locationName, setLocationName] = useState('');

  const [weatherData, setWeatherData] = useState({});
  const [didSearch, setDidSearch] = useState(false)
  const [saved, setSaved] = useState(false)
  //prop drill to savedLocation -> default state array/obj?
  const [savedLocation, setSavedLocation] = useState([]);
  
  // set a useState for default location of the user
  const [userLocation, setUserLocation] = useState(null)
  
  // set a use state for current selected Location card
  // pass in the first saved location at the 0 index?
  const [selectedLocation, setSelectedLocation] = useState(userLocation);

  

  async function searchLocation(e) {
    e.preventDefault();
    // useState react hook for searchInput
    let response = await fetch(`http://localhost:3000/weather/${locationName}`) //response received as Object
    const weatherInfo = await response.json();
    const infoObj = {...weatherInfo};
    console.log('weatherInfo: ', infoObj)
    //pass weatherData into setWeatherData
    await setWeatherData(infoObj);
    await setSelectedLocation(infoObj)
    await setDidSearch(true);
    await setSaved(false);

  }

  // function to get geolocation of the user
  useEffect(() => {

    const successCallback = position => {
      setUserLocation(position)
      console.log(position);
    } 

    const errorCallback = error => {
      console.log(error);
    }

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
     console.log('userlocation', userLocation)
    }, [])

// function to fetch geolocation weatherData

  useEffect(() => {
    if (userLocation) {
    fetch(`http://localhost:3000/weather/${userLocation.coords.latitude},${userLocation.coords.longitude}`)
      .then((response) => response.json())
        .then((data => {
          setWeatherData({...data});
          setSelectedLocation(data);
        }))
        .catch((err) => {
          console.log('Error fetching geolocation weather data', err)
        })
  }}, [userLocation]);


// function to fetch savedLocations
  // useEffect(()=>{
  //   //fetch request to endpoint
  //   fetch(`http://localhost:3000/user/:${userId}/saved`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       //data is updated saved location document
  //       setSavedLocation([data])
  //       // set current saved location card to the 0 index
  //       setSelectedLocation([data[0]])
  //     })
  //     .catch((err) => {
  //       console.log('Error fetching saved', err);
  //     })
  // },[savedLocation])


  //function to handle onSubmit
  return (
    <div className='grid'>
      <div className ='search-bar-saved-location-container'>
        <SearchBar locationName={locationName} setLocationName={setLocationName} searchLocation={searchLocation}/>
        <SavedLocation savedLocation={savedLocation} onSelect={setSelectedLocation} />

      </div>
      
      <div className = 'weather-stats-eco-tips-container'>
      {/* conditional rendering
        if user hasn't searched any location, frontend renders nothing
        else, frontend renders WeatherStats component */}
      {selectedLocation && <WeatherStats saved={saved} setSaved={setSaved} setSavedLocation={setSavedLocation} weatherData={weatherData}/>}
      {selectedLocation && <EcoTips selectedLocation={selectedLocation} />}
      </div>
    </div>
  )
}


