import React, { createContext, useReducer, Dispatch } from 'react';
import { clotheInterface } from '../interfaces/clotheInterface';
import { getCurrentUser } from '../localStorage/user';
import clotheReducer, { ClotheAction } from './clotheReducer';
import meteoReducer, { MeteoAction, meteoInterface } from './meteoReducer';
import userReducer, { UserAction, userInterface } from './userReducer';
import { initialMeteo, initialClothe } from './utils';

export interface stateInterface {
    meteo: meteoInterface;
    clothe: clotheInterface;
    user: userInterface;
}

const initialState: stateInterface = {
  meteo: initialMeteo,
  clothe: initialClothe,
  user: getCurrentUser(),
};

const AppContext = createContext<{
  state: stateInterface;
  dispatch: Dispatch<ClotheAction | MeteoAction | UserAction>;
}>({
  state: initialState,
  dispatch: () => null
});

const mainReducer = (
  { meteo, clothe, user }: stateInterface,
  action: ClotheAction | MeteoAction | UserAction
) => ({
  meteo: meteoReducer(meteo, action as MeteoAction),
  clothe: clotheReducer(clothe, action as ClotheAction),
  user: userReducer(user, action as UserAction)
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
