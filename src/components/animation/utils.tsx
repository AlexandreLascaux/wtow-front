import { avatarNames } from '../reducers/userReducer';
import { animationButtonInterface } from './animationButton';

export function animationsByAvatar(avatar: avatarNames): Omit<animationButtonInterface, 'onIconClick'>[]{
  switch (avatar){
  case 'chafrou':
    return chafrouAnimations();
  case 'toufan':
    return toufanAnimations();
  default:
    return [];
  }
}

function chafrouAnimations(){
  return [
    {
      value: 'Idle',
      icon: 'pose'
    },
  ]; 
}

function toufanAnimations(){
  return [
    {
      value: 'Run.FBX_0',
      icon: 'run'
    },
    {
      value: 'Idle.FBX_0',
      icon: 'pose'
    },
  ]; 
}

