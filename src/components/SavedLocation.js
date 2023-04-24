import React, {useState} from 'react';
import '../stylesheets/SavedLocations.css'

export const SavedLocation = ({setSaved, setSavedLocation, savedLocation, onSelect, selectedLocation }) => {
  // console.log(testArr)
  // console.log('SAVED LOCATION', savedLocation);
  // console.log('CURRENT LOCATION', selectedLocation);
  
  async function deleteSavedLocation(name){
    console.log('clicked delete button')
    console.log('savedLocation: ', savedLocation)
    //fetch request to backend to delete current savedLocation from database
    // await fetch(`http://localhost:3000/user/6444bea26f5f28963025d4d5/deleteLocation`, {
    //   method: 'DELETE',
    //   headers: {'content-type': 'application/json'},
    //   body: JSON.stringify({
    //     location: `${name}`
    //   })
    // })

    let test = savedLocation;
    test = savedLocation.filter((location)=>{
      return location.location.name !== name;
    })
    setSavedLocation(test);
    setSaved(false);
  }

  // function to update selectedLocation onClick
  const onSelectLocation = location => {
    onSelect(location)
  }

  //fetch request to get names of savedLocation array
  const savedLocationList = fetch(`http://localhost:3000/user/6444bea26f5f28963025d4d5/saved`)
  .then(response=>response.json())
  .then(data => {
    console.log('data from intial fetch request to get list of savedLocation: ', data)
    return data;
  })
  

  return (
    <div className='saved-location-container'>
        {savedLocation.map((location, index) => (
              <div id={index} className='saved-location-cards' key={index} onClick={() => onSelectLocation(location)} >
              <div>{location.location.name}, {location.location.region}</div>
              <div>Current: {location.current.temp_f}&deg;F</div>
              <button id={`button${index}`} onClick={()=>{deleteSavedLocation(location.location.name)}} >delete</button>
              </div>
        ))}
        
        </div>
        
    // </div>
  )
}
