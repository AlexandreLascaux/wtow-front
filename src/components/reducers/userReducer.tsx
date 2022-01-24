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
    const newName = {...state, name: action.value};
    setCurrentUser(newName);
    return newName;
  case 'setAvatar':
    const newAvatar = {...state, avatar: action.value};
    setCurrentUser(newAvatar);
    return newAvatar;
  case 'resetUser':
    return initUser(action.value);
  default:
    return state;
  }
}