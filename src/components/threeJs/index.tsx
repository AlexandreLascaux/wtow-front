import React, {lazy, RefObject, Suspense, useEffect, useLayoutEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import { Canvas, GroupProps, useFrame, Vector3 } from '@react-three/fiber';
import Rain from './meteo/rain';
import Room from './scene/base';
import Garden from './scene/garden';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import CustomCamera, { defaultCameraPosition, defaultCameraRotation, defaultFov } from './camera/CustomCamera';
import { Html, OrbitControls } from '@react-three/drei';
import Snow from './meteo/snow';
import { AppContext } from '../reducers/context';
import { Button, CircularProgress } from '@mui/material';
import useWindowDimensions from '../setup/useWindowDimensions';
import Clouds from './meteo/clouds';
import CustomAvatar from '../avatar/customAvatar';
import { animationsByAvatar } from '../animation/utils';
import AnimationButton from '../animation/animationButton';
import { animationInterface, customAvatarInterface } from './models/interfaces';
import ModalProfile from '../modals/modalProfile';
import NavBar from '../navbar/navBar';
import ModalClothes from '../modals/modalClothes';
import { isEqual } from 'lodash';
import Stork from './birds/stork';

export interface cameraOptionsInferface{
    position: number[];
    rotation: number[];
    fov: number;
  }

export interface avatarInterface {
    animation: string;
  }
  
  interface extendedAvatar {
    finalPosition: Vector3
    reachedAvatarPositionCallback: () => void;
  }

export default function Scene(): React.ReactElement{
  const initialScenePosition = new THREE.Vector3( 0.3, -1.65, -3.2 );
  const initialSceneRotation = new THREE.Euler( 0, 0, 0, 'XYZ' );

  const neutralGardenPosition = new THREE.Vector3( -10.0, 1.1, -19 );
  const initialGardenRotation = new THREE.Euler( 0.6, -0.6, 0, 'XYZ' );
  
  const initialGardenPosition = new THREE.Vector3( -4.2, -1, -3.2 );

  const initialMeteoPosition = new THREE.Vector3( 10., -2., -10.8 );
  const initialCloudPosition = new THREE.Vector3(initialMeteoPosition.x - 3.3975, initialMeteoPosition.y + 5., initialMeteoPosition.z + 4.8);
  const initialModelRotation = new THREE.Euler( -0.03, 0.4, 0.0, 'XYZ' );

  const [windowsMode, setWindowsMode] = useState<boolean>(false);

  const scrollArea = useRef(null);
  const { state, dispatch } = React.useContext(AppContext);
  const controller = useRef<customAvatarInterface | null>(null);
  const [CurrentAvatar, setCurrentAvatar] = useState<React.LazyExoticComponent<(props: GroupProps & extendedAvatar) => JSX.Element>>();
  const [landscape, setLandscape] = useState<boolean>(true);
  const [sceneRender, setSceneRender] = useState<number>(1);

  const [cameraOptions, setCameraOptions] = useState<cameraOptionsInferface>({
    position: defaultCameraPosition,
    rotation: defaultCameraRotation,
    fov: defaultFov,
  });
  const windowDimensions = useWindowDimensions();
  const animations = animationsByAvatar(state.user.avatar);
  const [sceneLoaded, setSceneLoaded] = useState<boolean>(false);

  const [gardenLoaded, setGardenLoaded] = useState<boolean>(false);
  const [avatarScale, setAvatarScale] = useState<number>(0.0075);


  const playerRef = useRef<HTMLAudioElement>(null);
  const backgroundAudioRef = useRef<HTMLAudioElement>(null);

  const [birdCounter, setBirdCounter] = useState<number>(0);

  const [baseCameraPosition, setBaseCameraPosition] = useState<boolean>(true);
  const [reachedCameraPosition, setReachedCameraPosition] = useState<boolean>(false);
  const [reachedAvatarPosition, setReachedAvatarPosition] = useState<boolean>(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openModalClothes, setOpenModalClothes] = React.useState(false);
  const handleOpenModalClothes = () => setOpenModalClothes(true);
  const handleCloseModalClothes = () => setOpenModalClothes(false);

  const [avatarPosition, setAvatarPosition] = useState<number[]>([initialScenePosition.x-1.90, initialScenePosition.y + 0.55, initialScenePosition.z + 6.75]);

  function setCurrentAnimation(currentAnimation: animationInterface){
    if (currentAnimation.sound){
      const src=`/assets/sounds/${currentAnimation.sound}.mp3`;
      
      if (playerRef && playerRef.current){
        playerRef.current.src = src;
        playerRef.current.play(); 
      }
    }
    if (controller.current && currentAnimation) {
      controller.current.setCurrentAnimation(currentAnimation);
    }
  }
 
  function changeCameraProperties(camera: cameraOptionsInferface){
    if(!isEqual(camera, {
      position: defaultCameraPosition,
      rotation: defaultCameraRotation,
      fov: defaultFov,
    })) {
      setBaseCameraPosition(false);
    }
    if(!isEqual(camera, cameraOptions)){
      setReachedCameraPosition(false);
    }
    setCameraOptions(camera);
  }

  function textVisible(){
    return sceneLoaded && !open;
  }

  function changeScene(){
    const scene = sceneRender === 1 ? 2 : 1;
    setSceneRender(scene);
  }

  useEffect(() => {
    const newComponent = lazy(() => import(`./models/${state.user.avatar}`).catch((e) => console.error(e)));
    setCurrentAvatar(newComponent as React.LazyExoticComponent<() => JSX.Element>);
  }, [state.user.avatar]);

  useEffect(() => {
    if(reachedAvatarPosition){
      setCurrentAnimation({value: ''});
      if(playerRef.current) playerRef.current.pause();
    }
  }, [reachedAvatarPosition]);
  

  useEffect(() => {
    switch (sceneRender) {
    case 2:
      setAvatarPosition([neutralGardenPosition.x+12, neutralGardenPosition.y - 0.5, neutralGardenPosition.z + 5.5]);
      if(controller.current) controller.current.setAvatarPosition([neutralGardenPosition.x+12, neutralGardenPosition.y - 0.5, neutralGardenPosition.z + 5.5]);
      setAvatarScale(0.009);
      break;
    case 1:
    default:
      changeCameraProperties({
        position: defaultCameraPosition,
        rotation: defaultCameraRotation,
        fov: defaultFov,
      });
      setAvatarPosition([initialScenePosition.x-1.90, initialScenePosition.y + 0.55, initialScenePosition.z + 6.75]);
      if(controller.current) controller.current.setAvatarPosition([initialScenePosition.x-1.90, initialScenePosition.y + 0.55, initialScenePosition.z + 6.75]);
      setAvatarScale(0.0075);
      break;
    }
    
  }, [sceneRender]);



  useEffect(()=>{
    if(windowDimensions.height > windowDimensions.width){
      setLandscape(false);
    } else {
      setLandscape(true);
    }
  }, [windowDimensions]);

  useLayoutEffect(() =>{
    if (playerRef && playerRef.current){
      playerRef.current.volume = 0.2;
    }
    if(backgroundAudioRef && backgroundAudioRef.current) backgroundAudioRef.current.volume = 0.15;
  }, []);

  function moveAvatar(pos: number[]){
    if(controller.current){
      if(!isEqual(controller.current.getPosition(), avatarPosition)){
        setCurrentAnimation(animationsByAvatar(state.user.avatar)[1]);
        setReachedAvatarPosition(false);
      }
    }

    setAvatarPosition(pos);
  }

   
  /*
  useEffect(() => {
    setCameraOptions((cameraOptions) => {
      const {0: rx, 2: rz} = cameraOptions.rotation;
      return {...cameraOptions, rotation: [rx, Math.cos(Math.PI * scroll)*0.15, rz]};
    });
  }, [scroll]);

  */
  /*
  function setRotationOnWheel(e: React.WheelEvent<HTMLDivElement>){
    const {deltaY} = e;
    if(landscape){
      if(deltaY >= 0 && scroll > 1) setScroll(1);
      if(deltaY >= 0 && scroll < 1) setScroll(scroll+0.05);
      if(deltaY < 0 && scroll > 0) setScroll(scroll-0.05);
      if(deltaY < 0 && scroll < 0) setScroll(0);
    }
  }
  */

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
        
    <div ref={scrollArea} style={{height: `${windowDimensions.height}px`, width: '100%', position: 'relative', alignItems: 'baseline'}}>
      <audio
        ref={playerRef as RefObject<HTMLAudioElement>}
        style={{opacity: 0}}
      >
      </audio>

      <audio
        ref={backgroundAudioRef as RefObject<HTMLAudioElement>}
        autoPlay
        loop
        src='/assets/sounds/pose-sound.mp3'
        style={{opacity: 0}}
      >
      </audio>
      
      <div
        className="w-100 justify-content-center position-absolute"
        style={{bottom:'0px', zIndex: 1, display: sceneLoaded ? 'flex' : 'none'}}
      >
        <NavBar
          visible={textVisible() && baseCameraPosition}
          handleOpen={handleOpen}
          handleOpenModalClothes={handleOpenModalClothes}
          setCurrentAnimation={setCurrentAnimation}
        />
      </div>
      <div
        className="justify-content-center position-absolute"
        onClick={() => changeScene()}
        style={{
          color: '#ffd600',
          left: '35px',
          top: '50%', 
          zIndex: 1,
          display: sceneLoaded ? 'flex' : 'none',
          animation: 'arrowAnimation 1s ease-in-out infinite alternate'}}
      >
        <ArrowBackIosRoundedIcon/>
      </div>
      <div 
        className="w-100 justify-content-center position-absolute"
        style={{bottom:'25px', left: '50%', transform: 'translate(-50%, 0)', zIndex: 1, display: sceneLoaded ? 'flex' : 'none'}}
      >
        {
          reachedCameraPosition &&
            <Button variant="contained" onClick={() => {setWindowsMode(false); changeCameraProperties({
              position: defaultCameraPosition,
              rotation: defaultCameraRotation,
              fov: defaultFov,
            });}}>Revenir</Button>
        }
      </div>

      <ModalClothes onClose={handleCloseModalClothes} open={openModalClothes} />
      <ModalProfile onClose={handleClose} open={open} />

      <Canvas>
        <CustomCamera 
          position={cameraOptions.position}
          rotation={cameraOptions.rotation}
          fov={cameraOptions.fov}
          baseCameraPositionCallback={() => setBaseCameraPosition(true)}
          reachedCameraPositionCallback={() => setReachedCameraPosition(true)}
        />

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
          {
            sceneRender === 1 ?
              <Suspense fallback={null}>
                <Room
                  visible={sceneRender === 1}
                  position={initialScenePosition}
                  rotation={initialSceneRotation}
                  moveAvatar={(pos) => moveAvatar([pos.x, pos.y + 0.1, pos.z])}
                  callback={() => setSceneLoaded(true)}
                  onElementClick={changeCameraProperties}
                  sceneLoaded={sceneLoaded}
                  onWindowsMode={() => setWindowsMode(true)}
                  windowsMode={windowsMode}
                />
                {
                  sceneLoaded && <Suspense fallback={null}>
                    <Stork
                      identifiant="stork"
                      props={{scale: [0.3, 0.3, 0.3]}}
                      position={[defaultCameraPosition[0] + 13, defaultCameraPosition[1] + 1.75, defaultCameraPosition[2] - 14]}
                      birdSpeed={birdCounter*10}
                      callback={() =>setBirdCounter((counter) => counter+1)}
                    />

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
                      style={{
                        color: 'black',
                        fontSize:'0.070em',
                        transition: 'all 0.5s',
                        opacity: textVisible() ? 1 : 0,
                        transform: `scale(${textVisible() ? 1 : 0.5})`
                      }}
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
                      style={{
                        color: 'black',
                        fontSize:'0.05em',
                        transition: 'all 0.5s',
                        opacity: textVisible() ? 1 : 0,
                        transform: `scale(${textVisible() ? 1 : 0.5})`
                      }}
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
                      style={{
                        color: 'black',
                        fontSize:'0.05em',
                        transition: 'all 0.5s',
                        opacity: textVisible() ? 1 : 0,
                        transform: `scale(${textVisible() ? 1 : 0.5})`
                      }}
                      position={[initialScenePosition.x-3.3975, initialScenePosition.y + 1.72, initialScenePosition.z + 5.6]}
                    >
                      <p
                        className="cursor-pointer"
                        onClick={() => dispatch({type: 'setCloud', value: !state.meteo.cloudProperties.cloud})}>
                        <b>Cloud</b>
                      </p>
                    </Html>
                    <Html 
                      transform
                      style={{
                        color: 'white',
                        fontSize:'0.175em',
                        opacity: textVisible() ? 1 : 0,
                        transition: 'all 0.5s',
                        transform: `scale(${textVisible() ? 1 : 0.5})`
                      }}
                      position={[initialScenePosition.x + 4.25, initialScenePosition.y + 1.52, initialScenePosition.z + 3]}
                    >
                      <p>
                        <b>{`${birdCounter} oiseau${birdCounter > 1 ? 'x' : ''} capturé${birdCounter > 1 ? 's' : ''}` }</b>
                      </p>
                    </Html>
                  </Suspense>
                }
              </Suspense>
          
              :
              <Suspense fallback={<WaitingSceneToLoad />}>
                <Garden
                  visible={sceneRender === 2}
                  position={neutralGardenPosition}
                  moveAvatar={(pos) => moveAvatar([pos.x, pos.y, pos.z + 1.5])}
                  onObjectClick={(pos) => changeCameraProperties({
                    ...cameraOptions,
                    position: [pos.x, pos.y, pos.z +10],

                  })}
                  rotation={initialGardenRotation}
                  callback={() => setGardenLoaded(true)}
                  sceneLoaded={gardenLoaded}
                />
              </Suspense>
          }
         
          <Suspense fallback={null}>
            {CurrentAvatar && <CurrentAvatar
              ref={controller}
              finalPosition={avatarPosition as Vector3}
              reachedAvatarPositionCallback={() => setReachedAvatarPosition(true)}
              //position={avatarPosition as Vector3}
              scale={avatarScale}
              rotation={initialModelRotation}
            />} 
          </Suspense>


        </Suspense>
                
      

      </Canvas>
    </div>
  );
} 

