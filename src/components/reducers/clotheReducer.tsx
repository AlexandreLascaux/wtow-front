export interface clotheInterface {
    hat: hatProperties;
    tshirt: tshirtProperties;
    pant: pantProperties;
}

interface hatProperties {
    type: string;
}

interface tshirtProperties {
    type: string;
}

interface pantProperties {
  type: string;
}

export type ClotheAction =
 | { type: 'setClothes', value: clotheInterface }
 | { type: 'setTshirt', value: string }
 | { type: 'setHat', value: string }
 | { type: 'setPant', value: string }
 | { type: 'resetClothe', value: clotheInterface};

function initClothe(initialState: clotheInterface) {
  return initialState;
}

export default function clotheReducer(state: clotheInterface, action: ClotheAction): clotheInterface {
  console.log(action.type);
  switch (action.type) {
  case 'setClothes':
    return {...state, ...action.value};
  case 'setTshirt':
    return {...state, tshirt: {...state.tshirt, type: action.value} };
  case 'setHat':
    return {...state, hat: {...state.hat, type: action.value} };
  case 'setPant':
    return {...state, pant: {...state.pant, type: action.value} };
  case 'resetClothe':
    return initClothe(action.value);
  default:
    return state;
  }
}