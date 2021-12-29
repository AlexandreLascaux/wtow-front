import { userInterface } from '../reducers/userReducer';
import { initialUser } from '../reducers/utils';

export function setCurrentUser(user: userInterface) {
  const stringifiedUser = JSON.stringify(user);
  localStorage.setItem('user', stringifiedUser);
}

export function getCurrentUser(): userInterface {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : initialUser;
}

