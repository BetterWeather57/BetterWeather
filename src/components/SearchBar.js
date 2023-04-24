import React from 'react';
import '../stylesheets/SearchBar.css'
const searchBar = (props) => {
  const {locationName, setLocationName, searchLocation} = props;
  return(
    <form className='searchBar' onSubmit={searchLocation}>
      <label>
        <input className='location-input-bar' type='text' placeholder='Enter a location...' required onChange={(e)=>{setLocationName(e.target.value)}} />
      </label>
    </form>
  )
}

export default searchBar;
