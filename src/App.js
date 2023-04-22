import React from 'react'

export default function App() {
  //prop drill to SearchBar component
  const [locationData, setLocationData] = useState('');
  const [weatherData, setWeatherData] = useState([])
  //prop drill to savedLocation -> default state array/obj?
  const [savedLocation, setSavedLocation] = useState();
  
   async function searchLocation(e) {
    // useState react hook for searchInput
    let response = await fetch('/url-endpoint') //response received as Object
    const weatherInfo = await response.json();
    const infoArray = [...weatherInfo];
    //pass weatherData into setWeatherData
    await setWeatherData(infoArray);
  }

  //query from database
  useEffect

  //function to handle onSubmit


  

  return (
    <div>
      <div className ='search-bar-saved-location-container'>
        <SearchBar />
        <SavedLocation />
      </div>

      <div className = 'weather-stats-eco-tips-container'>
        <WeatherStats weatherData={weatherData} />
        <EcoTips />
      </div>
    </div>
  )
}


