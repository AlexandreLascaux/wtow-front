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
      icon: 'pose',
      sound: 'pose-sound',
    },
    {
      value: 'Run',
      icon: 'Courir',
      sound: 'all-run'
    },
    {
      value: 'Victory',
      icon: 'Joie',
      sound: 'chafrou-victory',
    },
    {
      value: 'Sleep',
      icon: 'Dormir',
      sound: 'chafrou-sleep'
    },
  ]; 
}

function toufanAnimations(){
  return [
    {
      value: 'Idle.FBX_0',
      icon: 'pose',
      sound: 'pose-sound',

    },
    {
      value: 'Run.FBX_0',
      icon: 'Courir',
      sound: 'all-run'
    },
    {
      value: 'Success.FBX_0',
      icon: 'Joie',
      sound : 'toufan-victory'
    },
    {
      value: 'Sleep.FBX_0',
      icon: 'Dormir',
      sound: 'toufan-sleep'
    },
  ]; 
}

function crocmouAnimations(){
  return [
    {
      value: 'Idle.FBX_0',
      icon: 'Pose',
      sound: 'pose-sound',
    },
    {
      value: 'Run.FBX_0',
      icon: 'Courir',
      sound: 'all-run'
    },
    {
      value: 'Success.FBX_0',
      icon: 'Joie',
      sound : 'all-victory'
    },
    {
      value: 'Sleep.FBX_0',
      icon: 'Dormir',
      sound:'crocmou-sleep'
    },
  ]; 
}


function liliaAnimations(){
  return [
    {
      value: 'Idle',
      icon: 'Pose',
      sound: 'pose-sound',
    },
    {
      value: 'Run',
      icon: 'Courir',
      sound: 'all-run'
    },
    {
      value: 'Success',
      icon: 'Joie',
      sound : 'all-victory'
    },
    {
      value: 'Sleep',
      icon: 'Dormir',
      sound: 'noel-sleep'
    },
  ]; 
}


function rusardAnimations(){
  return [
    {
      value: 'Idle',
      icon: 'pose',
      sound: 'pose-sound',
    },
    {
      value: 'Run',
      icon: 'Courir',
      sound: 'all-run'
    },
    {
      value: 'Success',
      icon: 'Joie',
      sound : 'all-victory'
    },
    {
      value: 'Sleep',
      icon: 'Dormir',
      sound: 'noel-sleep'
    },
  ]; 
}

function noelAnimations(){
  return [
    {
      value: 'Idle',
      icon: 'pose',
      sound: 'pose-sound',
    },
    {
      value: 'Run',
      icon: 'Courir',
      sound: 'all-run'
    },
    {
      value: 'Success',
      icon: 'Joie',
      sound : 'all-victory'
    },
    {
      value: 'Sleep',
      icon: 'Dormir',
      sound: 'noel-sleep'
    },
  ]; 
}


