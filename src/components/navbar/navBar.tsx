
import React from 'react';
import CustomAvatar from '../avatar/customAvatar';
import { AppContext } from '../reducers/context';
import AnimationButton from '../animation/animationButton';
import { animationsByAvatar } from '../animation/utils';
import { animationInterface } from '../threeJs/models/interfaces';

interface NavBarInterface{ 
    handleOpen: () => void;
    handleOpenModalClothes: () => void;
    handleOpenModalAnimations: () => void;
    setCurrentAnimation: (currentAnimation: animationInterface)=> void;
    visible: boolean;
  }

export default function NavBar({handleOpen, visible, handleOpenModalClothes,handleOpenModalAnimations,setCurrentAnimation}: NavBarInterface): React.ReactElement {
  const { state } = React.useContext(AppContext);
  const animations = animationsByAvatar(state.user.avatar);

  const AnimationsRender = () => {
    return <div className="d-flex">
      {
        animations.map(({value, icon, sound, img}, index) => {
          return (<div key={index} className="pr-2 pl-2 d-flex">
            <AnimationButton value={value} icon={icon} sound={sound} img={img} onIconClick={({value, sound}) => setCurrentAnimation({value, sound})} />
          </div>);
        }
        )}
    </div>;

  };

  return <div className="nav-bar" style={{ transition: 'all 0.5s', opacity: visible ? 1 : 0 }}>
    {
      visible && <div className="home-grid-avatar-list d-flex">
        <div className="home-avatar-list d-flex justify-content-center">
          <CustomAvatar
            onClick={handleOpenModalClothes}
            avatarName={'shirt'}
            size={80}
            fs={14}
            mr={50}
          />
          <CustomAvatar
            onClick={handleOpenModalClothes}
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
          <AnimationsRender />
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
    }
      
  </div>;
}