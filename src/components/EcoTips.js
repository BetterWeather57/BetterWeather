import React from 'react';
import App from '../App';
import ecoTipsData from '../data/ecotips.json';

export const EcoTips = ({selectedLocation}) => {

// create helper function to set weather conditionals on passed in data
// need to update properties on selectedLocation
const weatherConditionCheck = (selectedLocation) => {
    const ecoTipsArray = [];

    // check if current temp is hot and if it is, create hotTip variable and push to ecoTips array
    if (selectedLocation.current.temp_f > 80) {
        const hotTip = ecoTipsData.results.find(
          (tip) => tip.condition === 'hot'
        );
        if (hotTip) ecoTipsArray.push(hotTip);
      }

      // check if it's rainy
      if (selectedLocation.precip_in > .1) {
        const rainyTip = ecoTipsData.results.find(
          (tip) => tip.condition === 'rainy'
        );
        if (rainyTip) ecoTipsArray.push(rainyTip);
      }

      // check if it's snowing
      if (selectedLocation.condition.includes('snow')) {
        const snowingTip = ecoTipsData.results.find(
          (tip) => tip.condition === 'snowing'
        );
        if (snowingTip) ecoTipsArray.push(snowingTip);
      }

      // check if it's cold
      if (selectedLocation.current.temp_f < 60) {
        const coldTip = ecoTipsData.results.find(
          (tip) => tip.condition === 'cold'
        );
        if (coldTip) ecoTipsArray.push(coldTip);
      }

      // check if aqi is bad
      if (selectedLocation.air_quality.us-epa-index > 100) {
        const aqiTip = ecoTipsData.results.find(
          (tip) => tip.condition === 'aqi'
        );
        if (aqiTip) ecoTipsArray.push(aqiTip);
      }

      // check if array is empty, then set tip condition to default
      if (ecoTipsArray.length === 0) {
        const defaultTip = ecoTipsData.results.find(
          (tip) => tip.condition === 'default'
        );
        if (defaultTip) ecoTipsArray.push(defaultTip);
      }
      return ecoTipsArray
    };

//invoke helperFunction
const ecoTipsArray = weatherConditionCheck(selectedLocation);

// map out each item in the ecoTipsArray

  return (
    <div className='eco-tips-container'>
        <h1>Eco Tips</h1>
        <h2>Here are environmentally-friendly ways to deal with your current conditions!</h2>
        <div className='eco-tips-div'>
            {ecoTipsArray.map((item, index) => (
                <p key={index}>{item.tip}</p>
            ))}
            </div>
    </div>

  )
}
