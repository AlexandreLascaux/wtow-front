
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
  const sun = 'sun';
  return <>
    <div className="nav-bar">
      <div className="home-grid-avatar-list d-flex">
        <div className="home-avatar-list d-flex justify-content-center">
          <CustomAvatar
            onClick={handleOpenModalClothes}
            avatarName={'sun'}
            size={80}
            fs={14}
            mr={50}
          />
          <CustomAvatar
            onClick={handleOpenModalAnimations}
            avatarName={'shirt'}
            size={80}
            fs={14}
            mr={50}
          />
          <CustomAvatar
            onClick={handleOpenModalAnimations}
            avatarName={'game'}
            size={80}
            fs={14}
            mr={50}
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