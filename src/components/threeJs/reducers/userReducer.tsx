export interface userInterface {
    name: string;
    avatar: avatarNames;
}

export type avatarNames = "toufan" | "feline" | "chafrou" | "crocmou" | "noel" | "rusard"

export type UserAction =
| { type: 'setName', value: string }
 | { type: 'setAvatar', value: avatarNames }
 | { type: 'resetUser', value: userInterface};

 function initUser(initialState: userInterface) {
    return initialState;
  }

export default function userReducer(state: userInterface, action: UserAction): userInterface {
  switch (action.type) {
    case 'setName':
        return {...state, name: action.value};
    case 'setAvatar':
      return {...state, avatar: action.value };
    case 'resetUser':
        return initUser(action.value);
    default:
      return state;
  }
}