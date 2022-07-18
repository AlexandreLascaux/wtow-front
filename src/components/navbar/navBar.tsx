
import React from 'react';
import CustomAvatar from '../avatar/customAvatar';
import { AppContext } from '../reducers/context';
import AnimationButton from '../animation/animationButton';
import { animationsByAvatar } from '../animation/utils';
import { animationInterface } from '../threeJs/models/interfaces';

interface NavBarInterface{ 
    handleOpen: () => void;
    handleOpenModalClothes: () => void;
    setCurrentAnimation: (currentAnimation: animationInterface)=> void;
    visible: boolean;
  }

export default function NavBar({handleOpen, visible, handleOpenModalClothes, setCurrentAnimation}: NavBarInterface): React.ReactElement {
  const { state } = React.useContext(AppContext);
  const animations = animationsByAvatar(state.user.avatar);

  const AnimationsRender = () => {
    return <div className="d-flex">
      {
        animations.map(({value, icon, sound, img}, index) => {
          return (
            <div key={index} className="pr-2 pl-2 d-flex align-items-center" style={{verticalAlign: 'baseline' }}>
              <AnimationButton value={value} icon={icon} sound={sound} img={img} onIconClick={({value, sound}) => setCurrentAnimation({value, sound})} />
            </div>);
        }
        )}
    </div>;

  };

  return <div className="d-container" style={{ transition: 'all 0.5s', opacity: visible ? 1 : 0 }}>
    {
      visible && <div className="d-flex d-row">
        <div className="d-col d-flex justify-content-center">
          <AnimationsRender />
          <div className="d-flex align-items-center pl-2 pr-2">
            <div className="vr " style={{height: '80px', backgroundColor: '#FFFF', width: '2px'}}></div>
          </div>
          <div className="d-flex align-items-center">
            <CustomAvatar
              onClick={handleOpenModalClothes}
              avatarName={'VÊTEMENTS'}
              size={80}
              fs={14}
              mr={50}
            />
            <CustomAvatar
              onClick={handleOpen}
              avatarName={state.user.avatar}
              size={80}
              fs={14}
            />
          </div>
        </div>
      </div>
    }
      
  </div>;
}