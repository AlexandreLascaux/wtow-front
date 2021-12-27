/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: JoseDiaz (https://sketchfab.com/JoseDiaz)
license: SKETCHFAB Standard (https://sketchfab.com/licenses)
source: https://sketchfab.com/3d-models/jungle-animal-cartoon-crocodile-3276eba3706c4df3b9e2ba1e93a1b79a
title: Jungle Animal: Cartoon Crocodile
*/

import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader, dispose } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    Eye_Left_Eye_0: THREE.Mesh
    Eye_Left_Transparent_0: THREE.Mesh
    Eye_Right_Eye_0: THREE.Mesh
    Eye_Right_Transparent_0: THREE.Mesh
    Tongue_Crocodile_0: THREE.SkinnedMesh
    Crocodile_Crocodile_0: THREE.SkinnedMesh
    _rootJoint: THREE.Bone
  }
  materials: {
    material: THREE.MeshStandardMaterial
    Transparent: THREE.MeshStandardMaterial
    Crocodile: THREE.MeshStandardMaterial
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

export default function Crocmou(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const gltf = useLoader(GLTFLoader, "/mascotte/crocmou.glb");
  const { nodes, materials, animations } = gltf as GLTFResult
  const [pointer, setPointer] = useState<boolean>(false);

  const { actions, names } = useAnimations(animations, group)
  
  function randomAnimation() {
    stopAnimations();
    startAnimation(actions[names[Math.floor(Math.random()*names.length)]])
  }

  function stopAnimations(){
    const allActions = Object.entries(actions).map(([key]) => key);
    allActions.forEach((e) => {
      const action = actions[e]
      if(action) action.stop()
    });
  }

  function startAnimation(action: THREE.AnimationAction | null){
    if(action) {
      action.timeScale = 0.8
      action.play();
    }
  }

  useEffect(() => {
    animations.forEach((animation, animationIndex) => {
      let firstKeyFrameSeconds = animation.tracks[0].times[0];
      animation.tracks.forEach((track, trackIndex) => {
        track.times.forEach((time, timesIndex) => {
          animations[animationIndex].tracks[trackIndex].times[timesIndex] = time - firstKeyFrameSeconds
        })
      })
      animation.resetDuration()
    })
  }, [animations])

  useEffect(() => {
    if(actions["Idle"]) {
      actions["Idle"].play()
    } 
  }, [actions])

  useEffect(()=>{
    const element = document.querySelector("canvas");
    if(element){
      if(pointer)element.classList.add("cursor-pointer");
      if(!pointer)element.classList.remove("cursor-pointer");
    }
  }, [pointer])
  return (
    <group
      ref={group}
      {...props}
      dispose={null}
    >
      <group
      scale={1.5}
      rotation={[Math.PI / 2, 0, 0]}
      onClick={(e) => {e.stopPropagation(); randomAnimation()}}
      onPointerEnter={() => setPointer(true)}
      onPointerLeave={() => setPointer(false)} 
      >
        <group rotation={[-Math.PI, 0, 0]}>
            <primitive object={nodes._rootJoint} />
            <skinnedMesh
              geometry={nodes.Tongue_Crocodile_0.geometry}
              material={materials.Crocodile}
              skeleton={nodes.Tongue_Crocodile_0.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Crocodile_Crocodile_0.geometry}
              material={materials.Crocodile}
              skeleton={nodes.Crocodile_Crocodile_0.skeleton}
            />
          </group>
        </group>
    </group>
  )
}

useGLTF.preload('/crocmou.glb')
