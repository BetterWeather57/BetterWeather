import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import { SavedLocation } from './components/SavedLocation';
import { EcoTips } from './components/EcoTips';

export default function App() {
  //prop drill to SearchBar component
  const [locationName, setLocationName] = useState('');
  const [weatherData, setWeatherData] = useState([])

  //prop drill to savedLocation -> default state array/obj?
  const [savedLocation, setSavedLocation] = useState([]);

  // set a useState for default location of the user
  const [userLocation, setUserLocation] = useState(null)

  // set a use state for current selected Location card
  // pass in the first saved location at the 0 index?
  const [selectedLocation, setSelectedLocation] = useState(userLocation);


  
  //function for searchBar
  async function searchLocation(e) {
    e.preventDefault();
    // useState react hook for searchInput
    let response = await fetch(`http://localhost:3000/weather/${locationName}`) //response received as Object
    const weatherInfo = await response.json();
    const infoArray = [weatherInfo];
    console.log('weatherInfo: ', infoArray)
    //pass weatherData into setWeatherData
    await setWeatherData(infoArray);

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
          setWeatherData([data]);
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
    <div>
      <div className ='search-bar-saved-location-container'>
        {/* <SearchBar locationName={locationName} setLocationName={setLocationName} searchLocation={searchLocation}/>
        <SavedLocation savedLocation={savedLocation} onSelect={setSelectedLocation} /> */}

      </div>

      <div className = 'weather-stats-eco-tips-container'>
        {/* <WeatherStats weatherData={selectedLocation} /> */}
        {selectedLocation && <EcoTips selectedLocation={selectedLocation} />}
      </div>
    </div>
  )
}


