import React, { createContext, useReducer, Dispatch } from "react";
import clotheReducer, { ClotheAction, clotheInterface } from "./clotheReducer";
import meteoReducer, { MeteoAction, meteoInterface } from "./meteoReducer";

export interface stateInterface {
    meteo: meteoInterface;
    clothe: clotheInterface;
}

const initialMeteo = {
  rainProperties: {
    rain: false,
    rainPrecipitation: 1500
},
snowProperties: {
    snow: false,
    snowPrecipitation: 3000,
}
}

const initialClothe = {
  hat: {
    type: "winter"
  },
  tshirt: {
    type: "summer"
  },
  pant: {
    type: "spring"
  },
}
const initialState: stateInterface = {
    meteo: initialMeteo,
    clothe: initialClothe,
  }

const AppContext = createContext<{
  state: stateInterface;
  dispatch: Dispatch<ClotheAction | MeteoAction>;
}>({
  state: initialState,
  dispatch: () => null
});

const mainReducer = (
  { meteo, clothe }: stateInterface,
  action: ClotheAction | MeteoAction
) => ({
  meteo: meteoReducer(meteo, action as MeteoAction),
  clothe: clotheReducer(clothe, action as ClotheAction)
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
