import { clotheInterface } from './clotheReducer';
import { meteoInterface } from './meteoReducer';
import { avatarNames, userInterface } from './userReducer';

export const initialMeteo:  meteoInterface= {
  day: 1,
  sunProperties: {
    sun: true,
    sunIntensity: 1,
  },
  rainProperties: {
    rain: false,
    rainPrecipitation: 1500
  },
  snowProperties: {
    snow: false,
    snowPrecipitation: 3000,
  },
  cloudProperties: {
    cloud: true,
    cloudCover: 4,
    windSpeed: 1,
  }
};

  
export const initialClothe : clotheInterface = {
  hat: {
    type: 'winter'
  },
  tshirt: {
    type: 'summer'
  },
  pant: {
    type: 'spring'
  },
};

export const initialUser: userInterface = {
  name: '',
  avatar: 'toufan' as avatarNames,
};
