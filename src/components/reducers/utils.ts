import { clotheInterface } from '../interfaces/clotheInterface';
import { meteoInterface } from './meteoReducer';
import { avatarNames, userInterface } from './userReducer';

export const initialMeteo:  meteoInterface= {
  day: 1,
  weather: 1,
  icon: '',
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
  upperbody: [{
    description: 'winter',
    url :''
  }],
  lowerbody: [{
    description: 'winter',
    url :''
  }],
  shoes: {
    description: 'winter',
    url :''
  },
  misc: [{
    description: 'winter',
    url :''
  }]
};

export const initialUser: userInterface = {
  name: '',
  avatar: 'toufan' as avatarNames,
};
