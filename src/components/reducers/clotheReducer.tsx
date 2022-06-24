import { clotheInterface, ClothesDetailInterface } from '../interfaces/clotheInterface';

export type ClotheAction =
 | { type: 'setClothes', value: clotheInterface }
 | { type: 'setUpperbody', value: ClothesDetailInterface[] }
 | { type: 'setLowerbody', value: ClothesDetailInterface }
 | { type: 'setShoes', value: ClothesDetailInterface }
 | { type: 'setMisc', value: ClothesDetailInterface[] }
 | { type: 'resetClothe', value: clotheInterface};

function initClothe(initialState: clotheInterface) {
  return initialState;
}

export default function clotheReducer(state: clotheInterface, action: ClotheAction): clotheInterface {

  switch (action.type) {
  case 'setClothes':
    return {...state, ...action.value};
  case 'setUpperbody':
    return {...state, upperbody: action.value };
  case 'setLowerbody':
    return {...state, lowerbody:  action.value };
  case 'setShoes':
    return {...state, shoes: action.value };
  case 'setMisc':
    return {...state, misc: action.value };
  case 'resetClothe':
    return initClothe(action.value);
  default:
    return state;
  }
}