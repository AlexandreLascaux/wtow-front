import React, { useLayoutEffect, useRef } from 'react';
import { PerspectiveCamera } from 'three';
import { useFrame, useThree } from '@react-three/fiber';

export const defaultCameraPosition = [0, 0, 8];
export const defaultCameraRotation = [0,0,0];
export const defaultFov = 45;

interface cameraOptionsInferface{
    position: number[];
    rotation: number[];
    fov: number;
  }

export default function CustomCamera({position, rotation, fov}: cameraOptionsInferface) {
  const cameraRef: React.MutableRefObject<PerspectiveCamera | undefined>= useRef();
  const set = useThree(({ set }) => set);
  const size = useThree(({ size }) => size);

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
      /*const {x,y,z} = cameraRef.current.position
            const [x2, y2, z2] = position
            if(x > x2)*/
   

      //cameraRef.current.position.y += 0.01;
      
      //set({ camera: cameraRef.current as unknown as PerspectiveCamera })
      
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

    }
  });


  return <perspectiveCamera ref={cameraRef} />;
}