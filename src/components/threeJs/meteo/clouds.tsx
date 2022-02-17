import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
// import { OrbitControls, MeshDistortMaterial, shaderMaterial } from "@react-three/drei";
import * as THREE from 'three';
import { uniqueId } from 'lodash';
import { randFloat } from 'three/src/math/MathUtils';

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
  const group: React.MutableRefObject<any> = useRef<THREE.Group>();

  useFrame(({ clock }) => {
    if (group && group.current){
      if (group.current.position.x >= 5) {group.current.position.x = positionRand(position.x - 30, position.x - 40);}
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

function Clouds({number, isVisible, velocity, position}: cloudInterface): React.ReactElement {
  const uniqId = parseInt(uniqueId(), 10);
  const CloudSpawn = useMemo(() => {
    const cloudsDisplay = [];
  
    for(let i=0; i<number; i++){
      const uniqId1 = parseInt(uniqueId(), 10);
      const uniqId2 = parseInt(uniqueId(), 10);

      const x1 = positionRand(position.x, position.x - 25);
      const x2 = positionRand(position.x + 5, position.x - 20);
      const y1 = positionRand(position.y, position.y + 1.25);
      const y2 = positionRand(position.y + 0.5, position.y + 2);
      const position1 = new THREE.Vector3( x1, y1, position.z );
      const position2 = new THREE.Vector3( x2, y2, position.z );

      cloudsDisplay.push(<Cloud key={uniqId1} isVisible={isVisible} velocity={velocity} position={position1} />);
      cloudsDisplay.push(<Cloud key={uniqId2} isVisible={isVisible} velocity={velocity} position={position2} />);
    }
    return cloudsDisplay;
  }, [number, position.x, position.y, velocity, isVisible]);

  return (
    <group key={uniqId}>
      {CloudSpawn.map((cloud) => {
        return (cloud);
      })}
    </group>
  );
}


export default Clouds;
