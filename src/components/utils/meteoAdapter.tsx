import { forecastInterface } from '../interfaces/meteoInterface';
import { meteoInterface } from '../reducers/meteoReducer';

export function convertMeteoData(data: forecastInterface[], day: number): meteoInterface{
  const currentData = data[day];
  const sunProperties = {
    sun: hasSun(currentData),
    sunIntensity: 1,
  };

  const rainProperties = {
    rain: !!((currentData && currentData.Precipitation.mode === 'rain')),
    rainPrecipitation: convertDataRainCoverToNumber(currentData),
  };
  const cloudProperties = {
    cloud: !!((currentData && currentData.Cloud.cover > 0) || false),
    cloudCover: convertDataCloudCoverToNumber(currentData),
    windSpeed: convertDataWindSpeedToVelocity(currentData),
  };

  const snowProperties = {
    snow: !!(currentData && currentData.Precipitation.mode === 'snow'),
    snowPrecipitation: 3000,
  };

  const meteoDate = {
    day,
    sunProperties,
    rainProperties,
    cloudProperties,
    snowProperties,
  };

  return meteoDate; 
}

function convertDataRainCoverToNumber(data: forecastInterface): number{
  const precipitation = data ? +data.Precipitation.value : 0;
  switch (true) {
  case precipitation < 5:
    return 4000; 
  case precipitation < 15 && precipitation > 5:
    return 12000; 
  case precipitation > 15:
    return 20000; 
  default:
    return 50000; 
  }
}

function hasSun(data: forecastInterface | undefined){
  const icon = data ? data.icon : '';
  if (icon ==='01d' || icon === '03d'){
    return true;  
  }
  return false;
}

function convertDataCloudCoverToNumber(data: forecastInterface): number{
  return data?.Cloud.cover ? data.Cloud.cover / 20 : 1;
}

function convertDataWindSpeedToVelocity(data: forecastInterface): number{
  return data?.Wind.speed ? +data.Wind.speed / 6 : 1;
}