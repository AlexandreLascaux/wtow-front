import { Modal } from '@mui/material';
import React, {useRef} from 'react';
import AnimationButton from '../animation/animationButton';
import { AppContext } from '../reducers/context';

import { animationsByAvatar } from '../animation/utils';
import { customAvatarInterface,animationInterface } from '../threeJs/models/interfaces';


interface modalAnimationInterface{ 
  open: boolean;
  onClose: () => void;
}



export default function ModalAnimations({open,onClose}: modalAnimationInterface): React.ReactElement {

  const { state, dispatch } = React.useContext(AppContext);
  const animations = animationsByAvatar(state.user.avatar);
  const playerRef = useRef<HTMLAudioElement>(null);
  const controller = useRef<customAvatarInterface | null>(null);

  function setCurrentAnimation(currentAnimation: animationInterface){
    if (currentAnimation.sound){
      const src=`/assets/sounds/${currentAnimation.sound}.mp3`;
      
      if (playerRef && playerRef.current){
        playerRef.current.volume = 0.1;
        playerRef.current.src = src;
        playerRef.current.play(); 
      }
    }
    if (controller.current && currentAnimation) {
      controller.current.setCurrentAnimation(currentAnimation);
    }
  }

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



  return <Modal
    open={open}
    onClose={onClose}
  >
    <>
      <div className="modal-container">
        <div className="child">
          <div className="modal-inputs">
          </div>
          <div className="home-grid-avatar-list d-flex">
            <p>Animations</p>
            <AnimationsRender />
          </div>
        </div>
      </div>
    </>
  </Modal>;
}