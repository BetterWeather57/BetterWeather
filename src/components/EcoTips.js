import React from 'react';
import App from '../App';
import '../stylesheets/EcoTips.css';
import ecoTipsData from '../data/ecotips.json';

export const EcoTips = ({selectedLocation}) => {


  console.log('selectedLocation', selectedLocation)
  console.log(typeof selectedLocation.current.temp_f)
// create helper function to set weather conditionals on passed in data
// need to update properties on selectedLocation
const weatherConditionCheck = (selectedLocation) => {
    const ecoTipsArray = [];

      // check if current temp is hot and if it is, create hotTip variable and push to ecoTips array
      if (Math.floor(selectedLocation.current.temp_f) >= 75) {
        const hotTip = ecoTipsData.results.find(
          (tip) => tip.condition === 'hot'
        );
        if (hotTip) ecoTipsArray.push(hotTip);
      }

      if(Math.floor(selectedLocation.current.humidity) > 65) {
        const humidityTip = ecoTipsData.results.find(
          (tip) => tip.condition === 'humid'
        )
        if (humidityTip) ecoTipsArray.push(humidityTip)
      }

      // check if it's rainy
      if (selectedLocation.condition.text.includes('rain')) {
        const rainyTip = ecoTipsData.results.find(
          (tip) => tip.condition === 'rainy'
        );
        if (rainyTip) ecoTipsArray.push(rainyTip);
      }

      // check if it's snowing
      if (selectedLocation.condition.text.includes('snow')) {
        const snowingTip = ecoTipsData.results.find(
          (tip) => tip.condition === 'snowing'
        );
        if (snowingTip) ecoTipsArray.push(snowingTip);
      }

      // check if it's cold
      if (Math.floor(selectedLocation.current.temp_f) <= 60) {
        const coldTip = ecoTipsData.results.find(
          (tip) => tip.condition === 'cold'
        );
        if (coldTip) ecoTipsArray.push(coldTip);
      }

      // check if aqi is bad
      if (selectedLocation.current.air_quality['us-epa-index'] > 100) {
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


console.log('current temp', selectedLocation.current.temp_f);
console.log('ecoTipsArray', ecoTipsArray);

// map out each item in the ecoTipsArray

  return (
    <div className='eco-tips-container'>
        <div className='eco-tips-div'>
          <h1>Eco Tips</h1>
          <h2>Here are environmentally-friendly ways to deal with your current conditions!</h2>
              {ecoTipsArray.map((item, index) => (
                <p key={index}>{item.tip}</p>
              ))}
        </div>
    </div>

  )
}
