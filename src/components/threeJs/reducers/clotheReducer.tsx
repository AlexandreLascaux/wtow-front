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
| { type: 'setTshirt', value: string }
 | { type: 'setHat', value: string }
 | { type: 'setPant', value: string }
 | { type: 'reset', value: clotheInterface};

 function initClothe(initialState: clotheInterface) {
    return initialState;
  }

export default function clotheReducer(state: clotheInterface, action: ClotheAction): clotheInterface {
  switch (action.type) {
    case 'setTshirt':
        return {...state, tshirt: {...state.tshirt, type: action.value} };
    case 'setHat':
      return {...state, hat: {...state.hat, type: action.value} };
      case 'setPant':
        return {...state, pant: {...state.pant, type: action.value} };
      case 'reset':
        return initClothe(action.value);
    default:
      return state;
  }
}