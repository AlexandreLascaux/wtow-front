export interface meteoInterface {
    //storm: boolean;
    day: number;
    sunProperties: sunProperties;
    cloudProperties: cloudProperties;
    rainProperties: rainProperties;
    snowProperties: snowProperties;
    //mist: boolean;
    //mistOpacity: number;
}

interface sunProperties {
  sun: boolean;
  sunIntensity: number;
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
 | { type: 'setMeteoState', value: meteoInterface }
 | { type: 'setDay', value: number }
 | { type: 'setRain', value: boolean }
 | { type: 'setRainPrecipitation', value: number }
 | { type: 'setSnow', value: boolean }
 | { type: 'setSnowPrecipitation', value: number }
 | { type: 'setCloud', value: boolean }
 | { type: 'setCloudCover', value: number }
 | { type: 'setWindSpeed', value: number }
 | { type: 'setSun', value: boolean }
 | { type: 'setSunIntensity', value: number }
 | { type: 'resetMeteo', value: meteoInterface};

function initMeteo(initialState: meteoInterface) {
  return initialState;
}

export default function meteoReducer(state: meteoInterface, action: MeteoAction): meteoInterface {
  switch (action.type) {
  case 'setDay':
    return {...state, day: action.value};
  case 'setMeteoState':
    return {...state, ...action.value};
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
  case 'setSun':
    return {...state, sunProperties: {...state.sunProperties, sun: action.value} };
  case 'setSunIntensity':
    return {...state, sunProperties: {...state.sunProperties, sunIntensity: action.value} };
  case 'resetMeteo':
    return initMeteo(action.value);
  default:
    return state;
  }
}
