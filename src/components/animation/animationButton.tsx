import React from 'react';
import { Button } from '@mui/material';


export interface animationButtonInterface{
    value: string;
    icon: string;
    onIconClick: (value: string) => void;
}

export default function AnimationButton({value, icon, onIconClick}: animationButtonInterface): React.ReactElement{
  
  return (
    <Button className="cursor-pointer" variant="contained" onClick={() => onIconClick(value)}>
      {icon}
    </Button>
  );
}

