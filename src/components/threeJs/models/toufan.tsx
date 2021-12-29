/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: JoseDiaz (https://sketchfab.com/JoseDiaz)
license: SKETCHFAB Standard (https://sketchfab.com/licenses)
source: https://sketchfab.com/models/52401c7067f54ff3813da84df073b5f6
title: Jungle Animal: Cartoon Elephant
*/

import * as THREE from 'three';
import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { MeshStandardMaterial } from 'three';
import { time } from 'console';

type GLTFResult = GLTF & {
  nodes: {
    Teeth_Lower_Elephant_0: THREE.Mesh
    Teeth_Upper_Elephant_0: THREE.Mesh
    Eye_Left_Eye_0: THREE.Mesh
    Eye_Left_Eye_Shine_0: THREE.Mesh
    Eye_Right_Eye_0: THREE.Mesh
    Eye_Right_Eye_Shine_0: THREE.Mesh
    Tongue_Elephant_0: THREE.SkinnedMesh
    Elephant_Elephant_0: THREE.SkinnedMesh
    _rootJoint: THREE.Bone
  }
  materials: {
    Elephant: THREE.MeshStandardMaterial
    material: THREE.MeshStandardMaterial
    Eye_Shine: THREE.MeshStandardMaterial
  }
}

type ActionName =
  | 'Take 001'
  | 'Failure.FBX_0'
  | 'Fall.FBX_0'
  | 'Idle.FBX_0'
  | 'Idle_2.FBX_0'
  | 'Jump_Up.FBX_0'
  | 'Land.FBX_0'
  | 'Roll.FBX_0'
  | 'Run.FBX_0'
  | 'Sleep.FBX_0'
  | 'Success.FBX_0'
  | 'Talk.FBX_0'
  | 'Walk.FBX_0'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export function getRandomColor(material: MeshStandardMaterial) {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  material.setValues({color});
}

export default function Toufan(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>();
  const gltf = useLoader(GLTFLoader, '/mascotte/toufan.glb');
  const { nodes, materials, animations } = gltf as GLTFResult;
  const [pointer, setPointer] = useState<boolean>(false);

  const { actions, names } = useAnimations(animations, group);
  
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
    if(actions['Idle.FBX_0']) {
      actions['Idle.FBX_0'].play();
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
      onClick={(e) => {e.stopPropagation(); randomAnimation();}}
      onPointerEnter={() => setPointer(true)}
      onPointerLeave={() => setPointer(false)} 
    >
      <group scale={1.10} rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[-3.13, 0, 0]}>
          <group rotation={[-Math.PI, 0, 0]}>
            <primitive object={nodes._rootJoint} />
            <skinnedMesh
              geometry={nodes.Tongue_Elephant_0.geometry}
              material={materials.Elephant}
              skeleton={nodes.Tongue_Elephant_0.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Elephant_Elephant_0.geometry}
              material={materials.Elephant}
              skeleton={nodes.Elephant_Elephant_0.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/mascotte/toufan.glb');
