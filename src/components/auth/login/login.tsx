import React from 'react';
import {Button} from '@mui/material';

export default function Login(): React.ReactElement{
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  function handleClose() {
    setOpen(false);
  }


  return (
    <div>
      <Button onClick={handleOpen}>Connexion</Button>
    </div>
  );
}