import React, {lazy, RefObject, Suspense, useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import { Canvas, GroupProps } from '@react-three/fiber';
import Rain from './meteo/rain';
import Room from './scene/room';
import CustomCamera, { defaultCameraPosition, defaultCameraRotation, defaultFov } from './camera/CustomCamera';
import { Html, OrbitControls } from '@react-three/drei';
import Snow from './meteo/snow';
import { AppContext } from '../reducers/context';
import { CircularProgress } from '@mui/material';
import useWindowDimensions from '../setup/useWindowDimensions';
import Clouds from './meteo/clouds';
import CustomAvatar from '../avatar/customAvatar';
import { animationsByAvatar } from '../animation/utils';
import AnimationButton from '../animation/animationButton';
import { animationInterface, customAvatarInterface } from './models/interfaces';
import ModalProfile from '../modals/modalProfile';
import NavBar from '../navbar/navBar';
import ModalClothes from '../modals/modalClothes';
import ModalAnimations from '../modals/modalAnimations';

export interface cameraOptionsInferface{
    position: number[];
    rotation: number[];
    fov: number;
  }

export interface avatarInterface {
    animation: string;
  }

export default function Scene(): React.ReactElement{
  const initialScenePosition = new THREE.Vector3( 0.3, -1.65, -3.2 );
  const initialSceneRotation = new THREE.Euler( 0, 0, 0, 'XYZ' );
  const initialMeteoPosition = new THREE.Vector3( 10., -2., -10.8 );
  const initialCloudPosition = new THREE.Vector3(initialMeteoPosition.x - 3.3975, initialMeteoPosition.y + 5., initialMeteoPosition.z + 4.8);
  const initialModelRotation = new THREE.Euler( -0.03, 0.4, 0.0, 'XYZ' );
  const scrollArea = useRef(null);
  const [scroll, setScroll] = useState<number>(0.5);
  const { state, dispatch } = React.useContext(AppContext);
  const controller = useRef<customAvatarInterface | null>(null);
  const [CurrentAvatar, setCurrentAvatar] = useState<React.LazyExoticComponent<(props: GroupProps) => JSX.Element>>();
  const [landscape, setLandscape] = useState<boolean>(true);
  const [cameraOptions, setCameraOptions] = useState<cameraOptionsInferface>({
    position: defaultCameraPosition,
    rotation: defaultCameraRotation,
    fov: defaultFov,
  });
  const windowDimensions = useWindowDimensions();
  const animations = animationsByAvatar(state.user.avatar);
  const [sceneLoaded, setSceneLoaded] = useState<boolean>(false);
  const playerRef = useRef<HTMLAudioElement>(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openModalClothes, setOpenModalClothes] = React.useState(false);
  const handleOpenModalClothes = () => setOpenModalClothes(true);
  const handleCloseModalClothes = () => setOpenModalClothes(false);

  const [openModalAnimations, setOpenModalAnimations] = React.useState(false);
  const handleOpenModalAnimations = () => setOpenModalAnimations(true);
  const handleCloseModalAnimations = () => setOpenModalAnimations(false);

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

  function handleOnElementClick(camera: cameraOptionsInferface){
    /*
    setCameraOptions((cameraOptions) => {
      const {0: rx, 2: rz} = cameraOptions.rotation;
      return {...cameraOptions, rotation: [rx, Math.cos(Math.PI * scroll)*0.15, rz]};
    });
    */
    setCameraOptions(camera);
  }


  useEffect(() => {
    const newComponent = lazy(() => import(`./models/${state.user.avatar}`).catch((e) => console.error(e)));
    setCurrentAvatar(newComponent as React.LazyExoticComponent<() => JSX.Element>);
  }, [state.user.avatar]);

  useEffect(()=>{
    if(windowDimensions.height > windowDimensions.width){
      setLandscape(false);
      setScroll(0.5);
    } else {
      setLandscape(true);
    }
  }, [windowDimensions]);
  /*
  useEffect(() => {
    setCameraOptions((cameraOptions) => {
      const {0: rx, 2: rz} = cameraOptions.rotation;
      return {...cameraOptions, rotation: [rx, Math.cos(Math.PI * scroll)*0.15, rz]};
    });
  }, [scroll]);

  */

  function setRotationOnWheel(e: React.WheelEvent<HTMLDivElement>){
    const {deltaY} = e;
    if(landscape){
      if(deltaY >= 0 && scroll > 1) setScroll(1);
      if(deltaY >= 0 && scroll < 1) setScroll(scroll+0.05);
      if(deltaY < 0 && scroll > 0) setScroll(scroll-0.05);
      if(deltaY < 0 && scroll < 0) setScroll(0);
    }
  }
  

  function WaitingSceneToLoad(){
    return  <Html 
      className="user-select-none flex-direction-column d-flex bg-default justify-content-center align-items-center" 
      fullscreen 
      style={{height: `${windowDimensions.height}px`}}
    >
      <h3 className="pb-2">Chargement de la scène</h3>
      <CircularProgress color="inherit" size={46}/>
    </Html>;
  }

  

 
  return (
        
    <div ref={scrollArea} style={{height: `${windowDimensions.height}px`, width: '100%', position: 'relative'}} onWheel={setRotationOnWheel}>
      <div
        className="position-absolute"
        style={{right: '30px', top:'15px', zIndex: 1, display: sceneLoaded ? 'block' : 'none'}}
      >
        <CustomAvatar
          onClick={handleOpen}
          avatarName={state.user.avatar}
          size={100}
        />
        <p>
          <b>{state.user.name}</b>
        </p>
      </div>

      <audio
        ref={playerRef as RefObject<HTMLAudioElement>}
        style={{opacity: 0}}
      >
      </audio>

      <div 
        className="w-100 justify-content-center position-absolute"
        style={{bottom:'0px', zIndex: 1, display: sceneLoaded ? 'flex' : 'none'}}
      >
        <NavBar handleOpen={handleOpen} handleOpenModalClothes={handleOpenModalClothes} handleOpenModalAnimations={handleOpenModalAnimations}/>
      </div>
      
      <ModalClothes onClose={handleCloseModalClothes} open={openModalClothes} />
      <ModalAnimations onClose={handleCloseModalAnimations} open={openModalAnimations} />
      <ModalProfile onClose={handleClose} open={open} />

      <Canvas>
        <CustomCamera position={cameraOptions.position} rotation={cameraOptions.rotation} fov={cameraOptions.fov} />

        {
          // <OrbitControls />
        }
        <ambientLight intensity={0.75} />
        <pointLight color="white" intensity={0.75} position={[initialScenePosition.x, initialScenePosition.y + 3, initialScenePosition.z + 10]} />
        
        {
          !landscape &&
                <Html className="user-select-none flex-direction-column d-flex bg-default justify-content-center align-items-center" fullscreen style={{height: `${windowDimensions.height}px`}}>
                  <div >
                    <h3>Tourne ton écran :)</h3>
                    <img style={{transform: 'rotateY(180deg)' }}src="./assets/screen/rotate.png" alt="rotate" width={windowDimensions.width/2}/>
                  </div>
                </Html>
        }
        <Suspense fallback={<WaitingSceneToLoad />}>
          <Room
            position={initialScenePosition}
            rotation={initialSceneRotation}
            callback={() => setSceneLoaded(true)}
            onElementClick={handleOnElementClick}
          />
          
          {CurrentAvatar && <CurrentAvatar
            ref={controller}
            position={[initialScenePosition.x-1.90, initialScenePosition.y + 0.55, initialScenePosition.z + 6.75]}
            scale={0.0075}
            rotation={initialModelRotation}
          />} 

          {
            sceneLoaded && <Suspense fallback={null}>
              <Rain
                isVisible={state.meteo.rainProperties.rain}
                rainCount={1250}
                position={initialMeteoPosition}
              />
              <Snow
                isVisible={state.meteo.snowProperties.snow}
                snowCount={1250}
                position={initialMeteoPosition}
              />
              <Clouds
                isVisible={state.meteo.cloudProperties.cloud}
                velocity={state.meteo.cloudProperties.windSpeed}
                number={state.meteo.cloudProperties.cloudCover}
                position={initialCloudPosition}
              />
              <Html 
                transform
                className="user-select-none"
                style={{color: 'black', fontSize:'0.070em'}}
                position={[initialScenePosition.x-3.3975, initialScenePosition.y + 2.50, initialScenePosition.z + 5.6]}
              >
                <p
                  className="cursor-pointer"
                  onClick={() => dispatch({type: 'setRain', value: !state.meteo.rainProperties.rain})}>
                  <b>Rain</b>
                </p>
              </Html>

              <Html 
                transform
                className="user-select-none"
                style={{color: 'black', fontSize:'0.05em'}}
                position={[initialScenePosition.x-3.3975, initialScenePosition.y + 1.975, initialScenePosition.z + 5.6]}
              >
                <p
                  className="cursor-pointer"
                  onClick={() => dispatch({type: 'setSnow', value: !state.meteo.snowProperties.snow})}>
                  <b>Snow</b>
                </p>
              </Html>

              <Html 
                transform
                className="user-select-none"
                style={{color: 'black', fontSize:'0.05em'}}
                position={[initialScenePosition.x-3.3975, initialScenePosition.y + 1.72, initialScenePosition.z + 5.6]}
              >
                <p
                  className="cursor-pointer"
                  onClick={() => dispatch({type: 'setCloud', value: !state.meteo.cloudProperties.cloud})}>
                  <b>Cloud</b>
                </p>
              </Html>
            </Suspense>
          }      
          
        </Suspense>
      </Canvas>
    </div>
  );
} 

