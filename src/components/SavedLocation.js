import React from 'react'
import { App } from '../App'

export const SavedLocation = ({SavedLocation}) => {


  return (
    <div className='saved-location-container'>
        <div className='saved-location-cards'>
        {SavedLocation.map((location, index) => (
            <>
            <div>{location.name}</div>
            <div>{location.current_temp}</div>
            <div>{location.high_temp}</div>
            <div>{location.low_temp}</div>
            </>
        ))}
        </div>
    </div>
  )
}
