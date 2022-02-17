import React from 'react';
import { Button } from '@mui/material';
import { animationInterface } from '../threeJs/models/interfaces';


export interface animationButtonInterface{
    value: string;
    icon: string;
    sound?: string;
    onIconClick: ({value, sound}:animationInterface) => void;
}

export default function AnimationButton({value, icon, sound, onIconClick}: animationButtonInterface): React.ReactElement{
  
  return (
    <Button className="cursor-pointer" variant="contained" onClick={() => onIconClick({value, sound})}>
      {icon}
    </Button>
  );
}