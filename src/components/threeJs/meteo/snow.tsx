import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface snowInterface{
    snowCount: number;
    isVisible: boolean;
    position: THREE.Vector3;
}

const setInitialPositions = (snowCount: number, position: THREE.Vector3) => {
  const initialPositions = [];
  const initialVelocities = [];
  const initialAccelerations = [];
  for (let i = 0; i < snowCount; i++) {
    initialPositions.push(position.x + Math.random() * 20);
    initialPositions.push(position.y + Math.random() * 10);
    initialPositions.push(position.z + Math.random() * 10);
    initialVelocities.push(0);
    initialVelocities.push(-0.5);
    initialVelocities.push(0);
    initialAccelerations.push(0);
    initialAccelerations.push(2);
    initialAccelerations.push(0);
  }
  return [initialPositions, initialVelocities, initialAccelerations];
};

const Snow = ({ snowCount, isVisible, position}: snowInterface) => {
  const [positions, velocities, accelerations] = useMemo(() => {
    const [
      initialPositions,
      initialVelocities,
      initialAccelerations
    ] = setInitialPositions(snowCount, position);
    const positions = new Float32Array(initialPositions);
    const velocities = new Float32Array(initialVelocities);
    const accelerations = new Float32Array(initialAccelerations);
    return [positions, velocities, accelerations];
  }, [position, snowCount]);
  const uniforms = useMemo(() => ({ time: { value: 1.0 } }), []);
  
  const geom: React.MutableRefObject<any> = useRef<THREE.Group>();
  const vert = `uniform float time;
      attribute vec3 velocity;
      attribute vec3 acceleration;
      varying float curY;
      void main() {
          vec3 pos = position;
          
          gl_Position = projectionMatrix 
              * modelViewMatrix
              * vec4(
                  vec3(
                    mod(pos[0],-20.)+10.,
                    mod(pos[1] + (time * velocity[1] * acceleration[1]),7.)-2.,
                    pos[2]), 1.0);
          gl_PointSize = 5.0;
      }`;
  
  const frag = `uniform float time;
      void main() {
          float z = 1.0 - gl_FragCoord.z;
          gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
      }`;
  
  useFrame(({ clock }) => {
    if (geom.current) {
      geom.current.material.uniforms.time.value = clock.getElapsedTime();
      geom.current.geometry.verticesNeedUpdate = true;
    }
  });
  
  return (
    <points key={snowCount} ref={geom} visible={isVisible}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'velocity']}
          count={velocities.length / 3}
          array={velocities}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'acceleration']}
          count={accelerations.length / 3}
          array={accelerations}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        attach="material"
        uniforms={uniforms}
        vertexShader={vert}
        fragmentShader={frag}
        vertexColors
      />
    </points>
  );
};
export default Snow;