import React from 'react';

const searchBar = (props) => {
  const {locationName, setLocationName, searchLocation} = props;
  return(
    <form className='searchBar' onSubmit={searchLocation}>
      <label>
        <input type='text' placeholder='Enter a location...' required onChange={(e)=>{setLocationName(e.target.value)}} />
      </label>
    </form>
  )
}

export default searchBar;
