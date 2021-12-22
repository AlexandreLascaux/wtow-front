export interface meteoInterface {
    //storm: boolean;
    //sun: boolean;
    //cloud: boolean;
    rainProperties: rainProperties;
    snowProperties: snowProperties;
    //cloudCover: number;
    //windSpeed: number;
    //mist: boolean;
    //mistOpacity: number;
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
 | { type: 'reset', value: meteoInterface};

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
      case 'reset':
        return initMeteo(action.value);
    default:
      return state;
  }
}
