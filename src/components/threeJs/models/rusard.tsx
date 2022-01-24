/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: JoseDiaz (https://sketchfab.com/JoseDiaz)
license: SKETCHFAB Standard (https://sketchfab.com/licenses)
source: https://sketchfab.com/3d-models/forest-animal-fox-abf5788c354f4d4b9ff5ea1fd10c6496
title: Forest Animal: Fox
*/

import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader, dispose } from '@react-three/fiber';

type GLTFResult = GLTF & {
  nodes: {
    Eye_Left_Eyes_0: THREE.Mesh
    Eye_Left_Eye_Shine_0: THREE.Mesh
    Eye_Right_Eyes_0: THREE.Mesh
    Eye_Right_Eye_Shine_0: THREE.Mesh
    Fox_Mesh_Fox_0: THREE.SkinnedMesh
    _rootJoint: THREE.Bone
  }
  materials: {
    Eyes: THREE.MeshStandardMaterial
    Eye_Shine: THREE.MeshStandardMaterial
    material: THREE.MeshStandardMaterial
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

export default function Rusard(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>();
  const gltf = useLoader(GLTFLoader, '/mascotte/rusard.glb');
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
    if(actions['Idle']) {
      actions['Idle'].play();
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
        scale={1.5}
        rotation={[Math.PI / 2, 0, 0]}
        onClick={(e) => {e.stopPropagation(); randomAnimation();}}
        onPointerEnter={() => setPointer(true)}
        onPointerLeave={() => setPointer(false)} 
      >
        <group rotation={[-Math.PI, 0, 0]}>
          <primitive object={nodes._rootJoint} />
          <skinnedMesh
            geometry={nodes.Fox_Mesh_Fox_0.geometry}
            material={materials.material}
            skeleton={nodes.Fox_Mesh_Fox_0.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/rusard.glb');
