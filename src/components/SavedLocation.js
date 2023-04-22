import React from 'react';
import { App } from '../App'

// pass in savedLocation and LocationSelect function
export const SavedLocation = ({savedLocation, seletedLocation }) => {


  return (
    <div className='saved-location-container'>
        <div className='saved-location-cards'>
        {savedLocation.map((location, index) => (
            <div key={index} onClick={() => onSelect(location)} >
            <div>{location.name}</div>
            <div>{location.current_temp}</div>
            <div>{location.high_temp}</div>
            <div>{location.low_temp}</div>
            </div>
        ))}
        </div>
    </div>
  )
}
