import React from 'react';
import { Avatar } from '@mui/material';
import { avatarNames } from '../reducers/userReducer';
import './customAvatarStyle.css';

interface AvatarInterface {
    avatarName: avatarNames;
    size?: number;
    fs?: number;
    mr?: number
    active?: boolean;
    disabled?: boolean;
    color?: string;
    onClick?: () => void;
}
export default function CustomAvatar({avatarName, size = 24, fs, mr, color = '#434343', active, disabled, onClick}: AvatarInterface): React.ReactElement {
  function className(){
    let className = '';
    if(disabled) className += 'is-disabled';
    if(active) className += 'is-active';
    return className;
  }
  return (
    <div className="avatar-container" style={{color,marginRight: mr}}>
      <Avatar
        onClick={onClick}
        className={`mb-2 cursor-pointer avatar-style ml-auto  ${className()}`}
        alt={avatarName}
        src={`./assets/avatar/${avatarName}.png`}
        sx={{ width: size, height: size }}
      />
      <h3 style={{fontSize: fs}}><b>{avatarName.toUpperCase()}</b></h3>
    </div>
  );
}