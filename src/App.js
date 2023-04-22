import React from 'react'

export default function App() {
  //prop drill to SearchBar component
  const [locationData, setLocationData] = useState('');
  //prop drill to savedLocation -> default state array/obj?
  const [savedLocation, setSavedLocation] = useState();
  
  //function to handle onSubmit

  return (
    <div>
      <div className ='search-bar-saved-location-container'>
        <SearchBar />
        <SavedLocation />
      </div>

      <div className = 'weather-stats-eco-tips-container'>
        <WeatherStats />
        <EcoTips />
      </div>
    </div>
  )
}


