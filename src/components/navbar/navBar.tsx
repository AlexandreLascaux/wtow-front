
import React from 'react';
import CustomAvatar from '../avatar/customAvatar';
import { AppContext } from '../reducers/context';

interface NavBarInterface{ 
    handleOpen: () => void;
    handleOpenModalClothes: () => void;
    handleOpenModalAnimations: () => void;
  }

export default function NavBar({handleOpen,handleOpenModalClothes,handleOpenModalAnimations}: NavBarInterface): React.ReactElement {
  const { state } = React.useContext(AppContext);

  return <>
    <div className="nav-bar">
      <div className="home-grid-avatar-list d-flex">
        <div className="home-avatar-list d-flex justify-content-center">
          <CustomAvatar
            onClick={handleOpenModalClothes}
            avatarName={state.user.avatar}
            size={80}
            fs={14}
            mr={50}
          />
          <CustomAvatar
            onClick={handleOpenModalAnimations}
            avatarName={state.user.avatar}
            size={80}
            fs={14}
            
           
          />
        </div>

        <div className="home-avatar-list-right d-flex justify-content-center">
          <CustomAvatar
            onClick={handleOpen}
            avatarName={state.user.avatar}
            size={80}
            fs={14}
          />
        </div>
      </div>
    </div>
  </>;
}