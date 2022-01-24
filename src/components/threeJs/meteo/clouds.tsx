import React, { useMemo, useRef } from "react";
import { useFrame } from '@react-three/fiber';
// import { OrbitControls, MeshDistortMaterial, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

interface positionInterface{
    position: THREE.Vector3;
    isVisible: boolean;
    velocity: number;
}

interface cloudInterface{
    number: number;
    isVisible: boolean;
    velocity: number;
    position: THREE.Vector3;
}

const Cloud = ({ position, isVisible, velocity}: positionInterface) => {
  const group: React.MutableRefObject<any> = useRef<THREE.Group>()

  useFrame(({ clock }) => {
  if (group && group.current){
    if (group.current.position.x >= 70) {group.current.position.x = positionRand(0, -25)};
    group.current.position.x = (clock.getElapsedTime() * velocity) % 35;
  } 
  });

  return (
    <group ref={group} visible={isVisible}>
      <mesh castShadow receiveShadow position={position}>
        <icosahedronBufferGeometry attach="geometry" args={[2, 2]} />
        <meshBasicMaterial
    attach="material"
    color="#BFBEBE"
    opacity={0.9}
    transparent
   />
      </mesh>
      <mesh castShadow receiveShadow position={[position.x - 2, position.y, position.z]}>
        <icosahedronBufferGeometry attach="geometry" args={[1.5, 2]} />
        <meshBasicMaterial
    attach="material"
    color="#BFBEBE"
    opacity={0.9}
    transparent
   />
       </mesh>
      <mesh castShadow receiveShadow position={[position.x + 2, position.y, position.z]}>
        <icosahedronBufferGeometry attach="geometry" args={[1.5, 2]} />
        <meshBasicMaterial
    attach="material"
    color="#BFBEBE"
    opacity={0.9}
    transparent
   />
      </mesh>
    </group>
  );
};

  const positionRand = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

const Clouds = ({number, isVisible, velocity, position}: cloudInterface) => {

  const CloudSpawn = useMemo(() => {
    let cloudsDisplay = [];
  
    for(let i=0; i<number; i++){
      const x1 = positionRand(position.x, position.x - 25);
      const x2 = positionRand(position.x + 5, position.x - 20);
      const y1 = positionRand(position.y + 4, position.y + 7);
      const y2 = positionRand(position.y + 6, position.y + 9);
      const z = -6;
      const position1 = new THREE.Vector3( x1, y1, z );
      const position2 = new THREE.Vector3( x2, y2, z );

    cloudsDisplay.push(<Cloud key={i+velocity} isVisible={isVisible} velocity={velocity} position={position1} />);
    cloudsDisplay.push(<Cloud key={i-velocity} isVisible={isVisible} velocity={velocity} position={position2} />);
    };
    return cloudsDisplay;
  }, [number, position.x, position.y, velocity, isVisible]);

  return (
    <group key={number}>
    {CloudSpawn.map((cloud) => {
      return (cloud)
    })}
    </group>
  );
};


export default Clouds;
