import React, { useLayoutEffect, useRef } from 'react';
import { PerspectiveCamera } from 'three';
import { useFrame, useThree } from '@react-three/fiber';

export const defaultCameraPosition = [0, 0, 8];
export const defaultCameraRotation = [0,0,0];
export const defaultFov = 40;

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
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            cameraRef.current!.aspect! = size.width / size.height;
            
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
      //cameraRef.current.position.x += 0.01
      //set({ camera: cameraRef.current as unknown as PerspectiveCamera })
     
      cameraRef.current.rotation.y = rotation[1];
    }
  });


  return <perspectiveCamera ref={cameraRef} />;
}