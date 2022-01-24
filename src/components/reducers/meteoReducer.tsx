export interface meteoInterface {
    //storm: boolean;
    //sun: boolean;
    cloudProperties: cloudProperties;
    rainProperties: rainProperties;
    snowProperties: snowProperties;
    //mist: boolean;
    //mistOpacity: number;
}


interface cloudProperties {
  cloud: boolean;
  cloudCover: number;
  windSpeed: number;
}

interface rainProperties {
    rain: boolean;
    rainPrecipitation: number;
}

interface snowProperties {
    snow: boolean;
    snowPrecipitation: number;
}

export type MeteoAction =
| { type: 'setRain', value: boolean }
 | { type: 'setRainPrecipitation', value: number }
 | { type: 'setSnow', value: boolean }
 | { type: 'setSnowPrecipitation', value: number }
 | { type: 'setCloud', value: boolean }
 | { type: 'setCloudCover', value: number }
 | { type: 'setWindSpeed', value: number }
 | { type: 'resetMeteo', value: meteoInterface};

function initMeteo(initialState: meteoInterface) {
  return initialState;
}

export default function meteoReducer(state: meteoInterface, action: MeteoAction): meteoInterface {
  switch (action.type) {
  case 'setRain':
    return {...state, rainProperties: {...state.rainProperties, rain: action.value} };
  case 'setRainPrecipitation':
    return {...state, rainProperties: {...state.rainProperties, rainPrecipitation: action.value} };
  case 'setSnow':
    return {...state, snowProperties: {...state.snowProperties, snow: action.value} };
  case 'setSnowPrecipitation':
    return {...state, snowProperties: {...state.snowProperties, snowPrecipitation: action.value} };
  case 'setCloud':
    return {...state, cloudProperties: {...state.cloudProperties, cloud: action.value} };
  case 'setCloudCover':
    return {...state, cloudProperties: {...state.cloudProperties, cloudCover: action.value} };
  case 'setWindSpeed':
    return {...state, cloudProperties: {...state.cloudProperties, windSpeed: action.value} };
  case 'resetMeteo':
    return initMeteo(action.value);
  default:
    return state;
  }
}
