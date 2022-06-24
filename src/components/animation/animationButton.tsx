import React from 'react';
import { Button } from '@mui/material';
import { animationInterface } from '../threeJs/models/interfaces';


export interface animationButtonInterface{
    value: string;
    icon: string;
    img: string;
    sound?: string;
    onIconClick: ({value, sound}:animationInterface) => void;
}

export default function AnimationButton({value, icon, sound, img, onIconClick}: animationButtonInterface): React.ReactElement{

  return (
    <Button className="cursor-pointer action-btn " variant="contained" onClick={() => onIconClick({value, sound})} >
      <p>
        <img style={{width:'25px'}} src={img} alt={icon}></img>
      </p>
      <p>{icon}</p>
    </Button>
  );
}