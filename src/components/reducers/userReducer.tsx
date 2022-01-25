import { setCurrentUser } from '../localStorage/user';

export interface userInterface {
    name: string;
    avatar: avatarNames;
}

export type avatarNames = 'toufan' | 'lilia' | 'chafrou' | 'crocmou' | 'noel' | 'rusard'

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
    setCurrentUser({...state, name: action.value});
    return {...state, name: action.value};
  case 'setAvatar':
    setCurrentUser({...state, avatar: action.value});
    return {...state, avatar: action.value};
  case 'resetUser':
    return initUser(action.value);
  default:
    return state;
  }
}