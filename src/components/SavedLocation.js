import React, {useState} from 'react';
import '../stylesheets/SavedLocations.css'

export const SavedLocation = ({setSavedLocation, savedLocation, onSelect, selectedLocation }) => {
  // console.log(testArr)
  // console.log('SAVED LOCATION', savedLocation);
  // console.log('CURRENT LOCATION', selectedLocation);
  
  function deleteSavedLocation(name){
    console.log('clicked delete button')
    console.log('savedLocation: ', savedLocation)
    //fetch request to backend to delete current savedLocation from database
    let test = savedLocation;
    test = test.filter((location)=>{
      return location.location.name !== name;
    })
    console.log('test: ', test)
    setSavedLocation(test);
    
  }

  // function to update selectedLocation onClick
  const onSelectLocation = location => {
    console.log('Clicked location:', location);
    onSelect(location)
  }

  return (
    <div className='saved-location-container'>
      {savedLocation.map((location, index) => (
        <div id={index} className='saved-location-cards' key={index} onClick={() => onSelectLocation(location)} style={{cursor:'pointer'}}>
          <div>{location.location.name}, {location.location.region}</div>
          <div>Current: {location.current.temp_f}&deg;F</div>
              {/* <div>{location.high_temp}</div>
              <div>{location.low_temp}</div> */}
              <button id={`button${index}`} onClick={()=>{deleteSavedLocation(location.location.name)}} >delete</button>
              </div>
        ))}
        
        </div>
        
    // </div>
  )
}
