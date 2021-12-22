import React, { useState, ReactElement } from 'react';
import { TextField } from '@mui/material';
import Scene from '../threeJs';
import "./homeStyle.css";
import { avatarNames } from '../threeJs/reducers/userReducer';
import CustomAvatar from '../ avatar/customAvatar';

function Home(): ReactElement{
  const [openScene, setOpenScene] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>("");
  const listAvatars: avatarNames[] = ["toufan", "feline", "chafrou", "crocmou", "noel", "rusard"];

  return (
    <>
    {
      openScene
      ?
      <Scene />
      :
      <div className="home-grid-container">
        <div className="home-grid-name-label">
          <h2>Quel est ton prénom ?</h2>
        </div>
        <div className="home-grid-name-input">
          <TextField label="Outlined" variant="outlined" color="success" value={userName} onChange={(event) => setUserName(event.target.value)}/>
        </div>
        <div className="home-grid-avatar-label">
          <h2>Choisis un personnage</h2>
        </div>
        <div className="home-grid-avatar-list d-flex">
            {
              listAvatars.map((avatar) => 
                <div className="home-avatar-list d-flex justify-content-center">
                  <CustomAvatar avatarName={avatar} width={130} />
                </div>
              )
            }
        </div>
      </div>
    }
    
    </>
    );
  }
  
  export default Home;