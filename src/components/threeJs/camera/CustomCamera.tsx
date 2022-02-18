import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { PerspectiveCamera } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { isEqual } from 'lodash';

export const defaultCameraPosition = [0, 0, 8];
export const defaultCameraRotation = [0,0,0];
export const defaultFov = 42;

interface cameraOptionsInferface{
    position: number[];
    rotation: number[];
    fov: number;
    baseCameraPositionCallback: () => void;
    reachedCameraPositionCallback: () => void;
  }

export default function CustomCamera({position, rotation, fov, baseCameraPositionCallback, reachedCameraPositionCallback}: cameraOptionsInferface) {
  const cameraRef: React.MutableRefObject<PerspectiveCamera | undefined>= useRef();
  const set = useThree(({ set }) => set);
  const size = useThree(({ size }) => size);
  const [defaultPosition, setDefaultPosition] = useState<boolean>(false);
  const [reachedPosition, setReachedPosition] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.aspect = size.width / size.height;
            
      cameraRef.current.position.x = defaultCameraPosition[0];
      cameraRef.current.position.y = defaultCameraPosition[1];
      cameraRef.current.position.z = defaultCameraPosition[2];

      cameraRef.current.fov = defaultFov;
      cameraRef.current.updateProjectionMatrix();

      set({ camera: cameraRef.current as unknown as PerspectiveCamera });
    }
  }, [set, size.height, size.width]);


  useFrame((state, delta) => {
    if (cameraRef.current) {
      
      const {0: positionX, 1: positionY, 2: positionZ} = position;
    
      const speedPositionX = Math.abs(cameraRef.current.position.x - positionX) >= 0.5 ? 0.1 : 0.01;
      const speedPositionY = Math.abs(cameraRef.current.position.y - positionY) >= 0.5 ? 0.1 : 0.01;
      const speedPositionZ = Math.abs(cameraRef.current.position.z - positionZ) >= 0.5 ? 0.1 : 0.01;


      if(cameraRef.current.position.x < positionX) cameraRef.current.position.x += speedPositionX;
      if(cameraRef.current.position.x > positionX) cameraRef.current.position.x -= speedPositionX;

      if(cameraRef.current.position.y < positionY) cameraRef.current.position.y += speedPositionY;
      if(cameraRef.current.position.y > positionY) cameraRef.current.position.y -= speedPositionY;

      if(cameraRef.current.position.z < positionZ) cameraRef.current.position.z += speedPositionZ;
      if(cameraRef.current.position.z > positionZ) cameraRef.current.position.z -= speedPositionZ;

      const {0: rotationX, 1: rotationY, 2: rotationZ} = rotation;

      const speedRotationX = Math.abs(cameraRef.current.position.x - positionX) >= 0.05 ? 0.01 : 0.005;
      const speedRotationY = Math.abs(cameraRef.current.position.y - positionY) >= 0.05 ? 0.01 : 0.005;
      const speedRotationZ = Math.abs(cameraRef.current.position.z - positionZ) >= 0.05 ? 0.01 : 0.005;

      if(cameraRef.current.rotation.x < rotationX) cameraRef.current.rotation.x += speedRotationX;
      if(cameraRef.current.rotation.x > rotationX) cameraRef.current.rotation.x -= speedRotationX;

      if(cameraRef.current.rotation.y < rotationY) cameraRef.current.rotation.y += speedRotationY;
      if(cameraRef.current.rotation.y > rotationY) cameraRef.current.rotation.y -= speedRotationY;

      if(cameraRef.current.rotation.z < rotationZ) cameraRef.current.rotation.z += speedRotationZ;
      if(cameraRef.current.rotation.z > rotationZ) cameraRef.current.rotation.z -= speedRotationZ;

      if(cameraRef.current.fov < fov) cameraRef.current.fov += 1;
      if(cameraRef.current.fov > fov) cameraRef.current.fov -= 1;

      const samePosition = (Math.abs(defaultCameraPosition[0] - cameraRef.current.position.x) + Math.abs(defaultCameraPosition[1] - cameraRef.current.position.y) + Math.abs(defaultCameraPosition[2] - cameraRef.current.position.z)) <= 0.3;
      const sameRotation = (Math.abs(defaultCameraRotation[0] - cameraRef.current.rotation.x) + Math.abs(defaultCameraRotation[1] - cameraRef.current.rotation.y) + Math.abs(defaultCameraRotation[2] - cameraRef.current.rotation.z)) <= 0.3;
      const sameFov = Math.abs(cameraRef.current.fov - defaultFov) <= 1;
      const isDefaultCameraPosition = samePosition && sameRotation && sameFov;

      const sameReachedPosition = (Math.abs(position[0] - cameraRef.current.position.x) + Math.abs(position[1] - cameraRef.current.position.y) + Math.abs(position[2] - cameraRef.current.position.z)) <= 0.3;
      const sameReachedRotation = (Math.abs(rotation[0] - cameraRef.current.rotation.x) + Math.abs(rotation[1] - cameraRef.current.rotation.y) + Math.abs(rotation[2] - cameraRef.current.rotation.z)) <= 0.3;
      const sameReachedFov = Math.abs(cameraRef.current.fov - fov) <= 1;
      const isReachedCameraPosition = sameReachedPosition && sameReachedRotation && sameReachedFov;

      if(!defaultPosition && isDefaultCameraPosition) {
        setDefaultPosition(true);
        baseCameraPositionCallback();
      } else if (defaultPosition && !isDefaultCameraPosition) {
        setDefaultPosition(false);
      }
      
      if(!isDefaultCameraPosition && !reachedPosition && isReachedCameraPosition) {
        setReachedPosition(true);
        reachedCameraPositionCallback();
      } else if (reachedPosition && !isReachedCameraPosition) {
        setReachedPosition(false);
      }
      cameraRef.current.updateProjectionMatrix();

  
    }
  });


  return <perspectiveCamera ref={cameraRef} />;
}