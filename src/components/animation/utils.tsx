import { avatarNames } from '../reducers/userReducer';
import { animationButtonInterface } from './animationButton';

export function animationsByAvatar(avatar: avatarNames): Omit<animationButtonInterface, 'onIconClick'>[]{
  switch (avatar){
  case 'chafrou':
    return chafrouAnimations();
  case 'toufan':
    return toufanAnimations();
  case 'lilia':
    return liliaAnimations();
  case 'crocmou':
    return crocmouAnimations();
  case 'noel':
    return noelAnimations();
  case 'rusard':
    return rusardAnimations();
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
    {
      value: 'Run',
      icon: 'Run'
    },
    {
      value: 'Victory',
      icon: 'Victory'
    },
    {
      value: 'Sleep',
      icon: 'Sleep'
    },
  ]; 
}

function toufanAnimations(){
  return [
    {
      value: 'Run.FBX_0',
      icon: 'Run'
    },
    {
      value: 'Idle.FBX_0',
      icon: 'pose'
    },
    {
      value: 'Sleep.FBX_0',
      icon: 'Sleep'
    },
    {
      value: 'Success.FBX_0',
      icon: 'Success'
    },
  ]; 
}

function crocmouAnimations(){
  return [
    {
      value: 'Run.FBX_0',
      icon: 'Run'
    },
    {
      value: 'Idle.FBX_0',
      icon: 'Pose'
    },
    {
      value: 'Sleep.FBX_0',
      icon: 'Sleep'
    },
    {
      value: 'Success.FBX_0',
      icon: 'Success'
    },
  ]; 
}


function liliaAnimations(){
  return [
    {
      value: 'Idle',
      icon: 'Pose'
    },
    {
      value: 'Run',
      icon: 'Run'
    },
    {
      value: 'Success',
      icon: 'Success'
    },
    {
      value: 'Sleep',
      icon: 'Sleep'
    },
  ]; 
}


function rusardAnimations(){
  return [
    {
      value: 'Idle',
      icon: 'pose'
    },
    {
      value: 'Run',
      icon: 'Run'
    },
    {
      value: 'Success',
      icon: 'Success'
    },
    {
      value: 'Sleep',
      icon: 'Sleep'
    },
  ]; 
}

function noelAnimations(){
  return [
    {
      value: 'Idle',
      icon: 'pose'
    },
    {
      value: 'Run',
      icon: 'Run'
    },
    {
      value: 'Success',
      icon: 'Success'
    },
    {
      value: 'Sleep',
      icon: 'Sleep'
    },
  ]; 
}


