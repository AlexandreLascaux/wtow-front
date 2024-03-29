/* eslint-disable react/prop-types */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: JoseDiaz (https://sketchfab.com/JoseDiaz)
license: SKETCHFAB Standard (https://sketchfab.com/licenses)
source: https://sketchfab.com/3d-models/deer-909fe8c4a70c4a9281e40ac7edd35441
title: Deer
*/

import * as THREE from 'three';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader, dispose, useFrame } from '@react-three/fiber';
import { animationInterface, customAvatarInterface, CustomAvatarProps, customProps } from './interfaces';
import { Quaternion, Vector3 } from 'three';

type GLTFResult = GLTF & {
  nodes: {
    Eye_Left_Eyes_0: THREE.Mesh
    Eye_Left_Eye_Shine_0: THREE.Mesh
    Eye_Right_Eyes_0: THREE.Mesh
    Eye_Right_Eye_Shine_0: THREE.Mesh
    Deer_Mesh_Deer_0: THREE.SkinnedMesh
    _rootJoint: THREE.Bone
  }
  materials: {
    Eyes: THREE.MeshStandardMaterial
    Eye_Shine: THREE.MeshStandardMaterial
    Deer: THREE.MeshStandardMaterial
  }
}

type ActionName =
  | 'Failure'
  | 'Fall'
  | 'Idle'
  | 'Idle_2'
  | 'Jump_Up'
  | 'Land'
  | 'Roll'
  | 'Roll_In_Place'
  | 'Run'
  | 'Run_In_Place'
  | 'Sleep'
  | 'Success'
  | 'Talk'
  | 'Walk'
  | 'Walk_In_Place'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

const baseAnimation = 'Idle';

const Lilia = React.forwardRef<customAvatarInterface, CustomAvatarProps>((props, ref) => {
  const group = useRef<THREE.Group>();
  const gltf = useLoader(GLTFLoader, '/mascotte/lilia.glb');
  const { nodes, materials, animations } = gltf as GLTFResult;
  const [pointer, setPointer] = useState<boolean>(false);
  const [reachedPosition, setReachedPosition] = useState<boolean>(false);

  const { actions, names } = useAnimations(animations, group);
  useImperativeHandle(ref, () => ({
    lookAt(position) {
      if(group.current){
        group.current.lookAt(new Vector3(position[0], position[1], position[2]));
      }
    },
    setAvatarRotation(position: number[]){
      if(group.current){
        group.current.rotation.x = position[0];
        group.current.rotation.y = position[1];
        group.current.rotation.z = position[2];
      }
    },
    getPosition(){
      return group.current?.position;
    },
    setAvatarPosition(position: number[]){
      if(group.current){
        group.current.position.x = position[0];
        group.current.position.y = position[1];
        group.current.position.z = position[2];
      }
    },
    setCurrentAnimation({value, sound}: animationInterface) {
      const defaultAnimation: ActionName = value !== '' ? value as ActionName : baseAnimation;
      const currentAnimation = actions[defaultAnimation];
      stopAnimations();
      if(currentAnimation) {
        currentAnimation.play();
      } 
    },
  }));

  useFrame((state, delta) => {
    if(group.current){
      const modifiedProps = props as unknown as customProps;
      const currentPosition = group.current.position;
      const avatarPosition = modifiedProps['finalPosition'];
      if(currentPosition){
        const [positionX, positionY, positionZ] = avatarPosition;

        const sameReachedPosition = (Math.abs(positionX - currentPosition.x) + Math.abs(positionY - currentPosition.y) + Math.abs(positionZ - currentPosition.z)) <= 0.2;
        const isReachedAvatarPosition = sameReachedPosition;
        
        const speedPositionX = 0.05;
        const speedPositionY = 0.05;
        const speedPositionZ = 0.075;


        // group.current.rotation.y = modifiedProps.rotation.y;

        if(!isReachedAvatarPosition){
          if(currentPosition.x < positionX) group.current.position.x += speedPositionX;
          if(currentPosition.x > positionX) group.current.position.x -= speedPositionX;
    
          if(currentPosition.y < positionY) group.current.position.y += speedPositionY;
          if(currentPosition.y > positionY) group.current.position.y -= speedPositionY;
   
          if(currentPosition.z < positionZ) group.current.position.z += speedPositionZ;
          if(currentPosition.z > positionZ) group.current.position.z -= speedPositionZ;  
        }
       
        if(!reachedPosition && isReachedAvatarPosition) {
          setReachedPosition(true);
          if(props.reachedAvatarPositionCallback) props.reachedAvatarPositionCallback();
        } else if (reachedPosition && !isReachedAvatarPosition) {
          setReachedPosition(false);
        }
      }

    }
  });
  function randomAnimation() {
    stopAnimations();
    startAnimation(actions[names[Math.floor(Math.random()*names.length)]]);
  }

  function stopAnimations(){
    const allActions = Object.entries(actions).map(([key]) => key);
    allActions.forEach((e) => {
      const action = actions[e];
      if(action) action.stop();
    });
  }

  function startAnimation(action: THREE.AnimationAction | null){
    if(action) {
      action.timeScale = 0.8;
      action.play();
    }
  }

  useEffect(() => {
    animations.forEach((animation, animationIndex) => {
      const firstKeyFrameSeconds = animation.tracks[0].times[0];
      animation.tracks.forEach((track, trackIndex) => {
        track.times.forEach((time, timesIndex) => {
          animations[animationIndex].tracks[trackIndex].times[timesIndex] = time - firstKeyFrameSeconds;
        });
      });
      animation.resetDuration();
    });
  }, [animations]);

  useEffect(() => {
    const currentAnimation = actions[baseAnimation];
    if(currentAnimation) {
      stopAnimations();
      currentAnimation.play();
    } 
  }, [actions]);

  useEffect(()=>{
    const element = document.querySelector('canvas');
    if(element){
      if(pointer)element.classList.add('cursor-pointer');
      if(!pointer)element.classList.remove('cursor-pointer');
    }
  }, [pointer]);
  return (
    <group
      ref={group}
      {...props}
      dispose={null}
    >
      <group
        scale={1.25}
        rotation={[Math.PI / 2, 0, 0]}
        onClick={(e) => {e.stopPropagation(); randomAnimation();}}
        onPointerEnter={() => {
          materials.Deer.setValues({emissive: 'rgb(25, 25, 25)'});
          setPointer(true);
        }}
        onPointerLeave={() => {
          materials.Deer.setValues({emissive: 'rgb(0, 0, 0)'});
          setPointer(false);
        }} 
      >
        <group rotation={[-Math.PI, 0, 0]}>
          <primitive object={nodes._rootJoint} />
          <skinnedMesh
            geometry={nodes.Deer_Mesh_Deer_0.geometry}
            material={materials.Deer}
            skeleton={nodes.Deer_Mesh_Deer_0.skeleton}
          />
        </group>
      </group>
    </group>
  );
});

Lilia.displayName = 'Lilia';
export default Lilia;
