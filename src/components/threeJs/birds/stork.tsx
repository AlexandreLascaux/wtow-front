/*
auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import React, { useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { birdInterface } from './utils';

type GLTFResult = GLTF & {
  nodes: {
    Object_0: THREE.Mesh
  }
  materials: {
    Material_0_COLOR_0: THREE.MeshStandardMaterial
  }
}

type ActionName = 'KeyAction'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Stork({props, callback, birdSpeed, position, key}: birdInterface): React.ReactElement {
  const group: React.MutableRefObject<any> = useRef<THREE.Group>();
  const gltf = useLoader(GLTFLoader, '/birds/Stork.glb');
  const { nodes, materials, animations } = gltf as GLTFResult;
  const factor = 3.5 + birdSpeed/15;
  const speed = 1.25 + birdSpeed/50;
  const actions = useRef<GLTFActions>();
  const [yRatio, setYRatio] = useState<boolean>(false);
  const [endCourse, setEndCourse] = useState<boolean>(false);
  const [pointer, setPointer] = useState<boolean>(false);
  const positions = useMemo(() => new THREE.Vector3(position[0], position[1], position[2]), [position]);

  const [mixer] = useState(() => new THREE.AnimationMixer(null as any));
  useFrame((state, delta) => {
    const x = Math.sin((delta * factor) / 2) * Math.cos((delta * factor) / 2) * 1.5;

    if(!endCourse){
      if (group.current.position.x <= (position[0] - 30)) {
        group.current.rotation.y = Math.PI;
        setEndCourse(true);
      }
      group.current.position.x -= x;
    } else {
      if (group.current.position.x >= position[0] + 5) {
        group.current.rotation.y = 0;
        setEndCourse(false);
      }
      group.current.position.x += x;
    }

    if(yRatio){
      group.current.position.y -= x;
      group.current.rotation.y += x;
    }
    if (group.current.position.y <= (position[1] - 8)){
      const newDirection = Math.random() < 0.5;
      group.current.position.x = newDirection ? position[0] - 30 : position[0]; 
      group.current.position.y = position[1];
      group.current.position.z = position[2];
      setYRatio(false);
      setEndCourse(newDirection);
    }
    mixer.update(delta * speed);
  });

  useEffect(() => {
    actions.current = {
      KeyAction: mixer.clipAction(animations[0], group.current).play(),
    };
    if(yRatio){
      actions.current = {
        KeyAction: mixer.clipAction(animations[0], group.current).stop(),
      };
      group.current.rotation.z = 1.5;
    } else {
      group.current.rotation.y = endCourse ? Math.PI : 0;
      group.current.rotation.z = -0.4;
    }
    return () => animations.forEach((clip) => mixer.uncacheClip(clip));
  }, [animations, mixer, yRatio]);

  useEffect(()=>{
    const element = document.querySelector('canvas');
    if(element){
      if(pointer)element.style.cursor = 'crosshair';
      if(!pointer)element.style.cursor = 'auto';
    }
  }, [pointer]);

  const BirdSpawn = useMemo(() => {

    return <group
      onClick={() => {setYRatio(true); callback();}}
      onPointerEnter={() => setPointer(true)}
      onPointerLeave={() => setPointer(false)}
      ref={group}
      position={positions}
      {...props}
    >
      <mesh
        material={materials.Material_0_COLOR_0}
        geometry={nodes.Object_0.geometry}
        name="Object_0"
        morphTargetDictionary={nodes.Object_0.morphTargetDictionary}
        morphTargetInfluences={nodes.Object_0.morphTargetInfluences}
        rotation={[1.5707964611537577, 0.5, 1.5]}
      />
    </group>;
  }, [key]);

  return (
    <group>
      {
        BirdSpawn
      } 
    </group>
  );
}


