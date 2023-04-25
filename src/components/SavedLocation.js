import React, {useEffect} from 'react';
import '../stylesheets/SavedLocations.css'


export const SavedLocation = ({setSaved, setSavedLocation, savedLocation, onSelect, selectedLocation }) => {
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
    test = test.filter((location)=>{
      return location.location.name !== name;
    })
    setSavedLocation(test);
    setSaved(false);
  }

  // function to update selectedLocation onClick
  const onSelectLocation = location => {
    onSelect(location)
  }

//   useEffect(() => {
//     fetch(`http://localhost:3000/user/6444bea26f5f28963025d4d5/saved`)
//       .then((response) => response.json())
//         .then((data => {
//           console.log
//           setSavedLocation([...data]);
//         }))
//         .catch((err) => {
//           console.log('Error fetching saved location list', err)
//         })
//   }
//  , [savedLocation])

  return (
    <div className='saved-location-container'>
      {savedLocation.map((location, index) => (
        <div id={index} className='saved-location-cards' key={index} onClick={() => onSelectLocation(location)} style={{cursor:'pointer'}}>
          <div>{location.location.name}, {location.location.region}</div>
          <div>Current: {location.current.temp_f}&deg;F</div>
          <img src={location.condition.icon}/>
          <button id={`button${index}`} onClick={()=>{deleteSavedLocation(location.location.name)}} >delete</button>
        </div>

        ))}
        
        </div>
        
    // </div>
  )
}
