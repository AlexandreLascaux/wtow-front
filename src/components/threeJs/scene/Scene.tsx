import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function Room(props: any): React.ReactElement {
  const gltf = useLoader(GLTFLoader, '/scene/scene.glb');

  return (
    <mesh
      {...props}
    >
      <primitive object={gltf.scene} />
    </mesh>
  );
}
export default Room;
