import React, {Suspense, useEffect, useRef, useState} from "react";
import * as THREE from "three";
import { Canvas } from '@react-three/fiber';
import Rain from "./meteo/rain";
import Room from "./scene/Scene";
import Toufan from "./models/Toufan";
import CustomCamera, { defaultCameraPosition, defaultCameraRotation, defaultFov } from "./camera/CustomCamera";
import { Html, OrbitControls } from "@react-three/drei";
import Snow from "./meteo/snow";
import { AppContext } from "./reducers/context";

interface SceneInterface {
    user: string | null;
}

interface cameraOptionsInferface{
    position: number[];
    rotation: number[];
    fov: number;
  }


export default function Scene({user}: SceneInterface){
    const initialScenePosition = new THREE.Vector3( 0.3, -1.65, -3.2 );
    const initialSceneRotation = new THREE.Euler( 0, 0, 0, 'XYZ' );
    const initialMeteoPosition = new THREE.Vector3( 10., -2., -10.8 );
    const initialElephantRotation = new THREE.Euler( -0.03, 0.6, 0.0, 'XYZ' );
    const scrollArea = useRef(null)
    const [scroll, setScroll] = useState<number>(0.5);
    const { state, dispatch } = React.useContext(AppContext);


    const [cameraOptions, setCameraOptions] = useState<cameraOptionsInferface>({
        position: defaultCameraPosition,
        rotation: defaultCameraRotation,
        fov: defaultFov,
      });

      useEffect(() => {
        setCameraOptions((cameraOptions) => {
            const {0: rx, 2: rz} = cameraOptions.rotation;
            return {...cameraOptions, rotation: [rx, Math.cos(Math.PI * scroll)*0.15, rz]}
        })
      }, [scroll])

      function setRotationOnWheel(e: React.WheelEvent<HTMLDivElement>){
          const {deltaY} = e
          if(deltaY >= 0 && scroll > 1) setScroll(1);
          if(deltaY >= 0 && scroll < 1) setScroll(scroll+0.05);
          if(deltaY < 0 && scroll > 0) setScroll(scroll-0.05);
          if(deltaY < 0 && scroll <= 0) setScroll(0);
      }

    return (
        
            <div ref={scrollArea} style={{height: "100%", width: "100%"}} onWheel={setRotationOnWheel}>
      
                <Canvas>
                <CustomCamera position={cameraOptions.position} rotation={cameraOptions.rotation} fov={cameraOptions.fov} />
        {
                   //<OrbitControls />
        }
            <Html 
              transform
              style={{color: "black", fontSize:"0.070em"}}
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
              style={{color: "black", fontSize:"0.05em"}}
              position={[initialScenePosition.x-3.3975, initialScenePosition.y + 1.975, initialScenePosition.z + 5.6]}
            >
                <p
                  className="cursor-pointer"
                  onClick={() => dispatch({type: 'setSnow', value: !state.meteo.snowProperties.snow})}>
                    <b>Snow</b>
                </p>
            </Html>
        
                    <ambientLight intensity={0.5} />
                    <pointLight color="white" intensity={0.25} position={[10, 10, 10]} />
        
                    <Suspense fallback={null}>
                        <Toufan
                        position={[initialScenePosition.x-2, initialScenePosition.y + 1.920, initialScenePosition.z + 5.6]}
                        scale={[0.0075,0.0075,0.0075]}
                        rotation={initialElephantRotation}
                        />
                        
                    </Suspense>
              
                    <Suspense fallback={null}>
                        <Room position={initialScenePosition} rotation={initialSceneRotation} />
        
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
                    </Suspense>
        
                </Canvas>
            </div>
        )
} 

