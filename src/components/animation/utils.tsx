import { avatarNames } from '../reducers/userReducer';
import { animationButtonInterface } from './animationButton';
const imgs = [
  'https://cdn.shopify.com/s/files/1/1061/1924/products/Man_Walking_Emoji_large.png?v=1571606063',
  'https://cdn.shopify.com/s/files/1/1061/1924/products/Man_Running_Emoji_large.png?v=1571606063',
  'https://cdn.shopify.com/s/files/1/1061/1924/products/Clapping_Hands_Emoji_large.png?v=1571606063',
  'https://cdn.shopify.com/s/files/1/1061/1924/products/Sleeping_Emoji_large.png?v=1571606036'
];
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
      icon: '',
      img: imgs[0],
      sound: 'pose-sound',
    },
    {
      value: 'Run',
      icon: '',
      img: imgs[1],
      sound: 'all-run'
    },
    {
      value: 'Victory',
      icon: '',
      img: imgs[2],
      sound: 'chafrou-victory',
    },
    {
      value: 'Sleep',
      icon: '',
      img: imgs[3],
      sound: 'chafrou-sleep'
    },
  ]; 
}

function toufanAnimations(){
  return [
    {
      value: 'Idle.FBX_0',
      icon: '',
      img: imgs[0],
      sound: 'pose-sound',

    },
    {
      value: 'Run.FBX_0',
      icon: '',
      img: imgs[1],
      sound: 'all-run'
    },
    {
      value: 'Success.FBX_0',
      icon: '',
      img: imgs[2],
      sound : 'toufan-victory'
    },
    {
      value: 'Sleep.FBX_0',
      icon: '',
      img: imgs[3],
      sound: 'toufan-sleep'
    },
  ]; 
}

function crocmouAnimations(){
  return [
    {
      value: 'Idle.FBX_0',
      icon: '',
      img: imgs[0],
      sound: 'pose-sound',
    },
    {
      value: 'Run.FBX_0',
      icon: '',
      img: imgs[1],
      sound: 'all-run'
    },
    {
      value: 'Success.FBX_0',
      icon: '',
      img: imgs[2],
      sound : 'all-victory'
    },
    {
      value: 'Sleep.FBX_0',
      icon: '',
      img: imgs[3],
      sound:'crocmou-sleep'
    },
  ]; 
}


function liliaAnimations(){
  return [
    {
      value: 'Idle',
      icon: '',
      img: imgs[0],
      sound: 'pose-sound',
    },
    {
      value: 'Run',
      icon: '',
      img: imgs[1],
      sound: 'all-run'
    },
    {
      value: 'Success',
      icon: '',
      img: imgs[2],
      sound : 'all-victory'
    },
    {
      value: 'Sleep',
      icon: '',
      img: imgs[3],
      sound: 'noel-sleep'
    },
  ]; 
}


function rusardAnimations(){
  return [
    {
      value: 'Idle',
      icon: '',
      img: imgs[0],
      sound: 'pose-sound',
    },
    {
      value: 'Run',
      icon: '',
      img: imgs[1],
      sound: 'all-run'
    },
    {
      value: 'Success',
      icon: '',
      img: imgs[2],
      sound : 'all-victory'
    },
    {
      value: 'Sleep',
      icon: '',
      img: imgs[3],
      sound: 'noel-sleep'
    },
  ]; 
}

function noelAnimations(){
  return [
    {
      value: 'Idle',
      icon: ' ',
      img: imgs[0],
      sound: 'pose-sound',
    },
    {
      value: 'Run',
      icon: '',
      img: imgs[1],
      sound: 'all-run'
    },
    {
      value: 'Success',
      icon: '',
      img: imgs[2],
      sound : 'all-victory'
    },
    {
      value: 'Sleep',
      icon: '',
      img: imgs[3],
      sound: 'noel-sleep'
    },
  ]; 
}


