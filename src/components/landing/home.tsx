import React, { useState, ReactElement } from 'react';
import Scene from '../threeJs';
import "./homeStyle.css";
import { avatarNames } from '../reducers/userReducer';
import CustomAvatar from '../ avatar/customAvatar';
import { AppContext } from '../reducers/context';

function Home(): ReactElement{
  const [openScene, setOpenScene] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>("");
  const listAvatars: avatarNames[] = ["toufan", "lilia", "chafrou", "crocmou", "noel", "rusard"];

  const { state, dispatch } = React.useContext(AppContext);

  function isActive(avatar: avatarNames){
    return avatar === state.user.avatar;
  }

  function handleOnClick(avatar: avatarNames){
    dispatch({type: 'setAvatar', value: avatar});
    dispatch({type: 'setName', value: userName});
    setOpenScene(true);
  }

  return (
    <>
    {
      openScene
      ?
      <div style={{height: "100%", width: "100%"}}>
        <Scene />
      </div>
      :
      <div className="home-grid-container">
        <div className="home-grid-name-label">
          <h2 className='user-select-none'>Quel est ton prénom ?</h2>
        </div>
        <div className="home-grid-name-input">
          <input className="custom-input" type="text" value={userName} onChange={(event) => setUserName(event.target.value)}/>
        </div>
        <div className="home-grid-avatar-label">
          <h2>Choisis un personnage</h2>
        </div>
        <div className="home-grid-avatar-list d-flex">
            {
              listAvatars.map((avatar) => 
                <div className="home-avatar-list d-flex justify-content-center">
                  <CustomAvatar
                    onClick={() => handleOnClick(avatar)}
                    avatarName={avatar}
                    size={130}
                    active={isActive(avatar)}
                    />
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