import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { defaultCameraPosition, defaultCameraRotation, defaultFov } from '../camera/CustomCamera';
import { cameraOptionsInferface } from '..';
import { useAnimations } from '@react-three/drei';

type GLTFResult = GLTF & {
  nodes: {
    Mesh_4: THREE.Mesh
    Mesh_3: THREE.Mesh
    Mesh_2: THREE.Mesh
    Mesh_5: THREE.Mesh
    Mesh_6: THREE.Mesh
    Leaf001: THREE.Mesh
    Leaf002: THREE.Mesh
    Leaf003: THREE.Mesh
    Leaf004: THREE.Mesh
    Leaf005: THREE.Mesh
    Leaf006: THREE.Mesh
    Leaf007: THREE.Mesh
    Leaf008: THREE.Mesh
    Leaf009: THREE.Mesh
    Leaf010: THREE.Mesh
    Leaf011: THREE.Mesh
    Leaf012: THREE.Mesh
    Tree: THREE.SkinnedMesh
    Plane_1: THREE.Mesh
    Plane_2: THREE.Mesh
    Plane001_1: THREE.Mesh
    Plane001_2: THREE.Mesh
    Cylinder: THREE.Mesh
    Circle: THREE.Mesh
    Circle001: THREE.Mesh
    Cube: THREE.Mesh
    Plane002: THREE.Mesh
    Plane003: THREE.Mesh
    Plane004: THREE.Mesh
    Plane005: THREE.Mesh
    Plane006: THREE.Mesh
    Cube001: THREE.Mesh
    Plane007: THREE.Mesh
    Plane008: THREE.Mesh
    Plane009: THREE.Mesh
    Plane010: THREE.Mesh
    Plane011: THREE.Mesh
    Plane012: THREE.Mesh
    Plane013: THREE.Mesh
    Cube010: THREE.Mesh
    Cube002: THREE.Mesh
    Cube003: THREE.Mesh
    Cube004: THREE.Mesh
    Cube011: THREE.Mesh
    Plane014: THREE.Mesh
    Cube006: THREE.Mesh
    Cube005: THREE.Mesh
    Sphere: THREE.Mesh
    Plane021: THREE.Mesh
    Plane016: THREE.Mesh
    Plane017: THREE.Mesh
    Plane018: THREE.Mesh
    Plane019: THREE.Mesh
    Plane020: THREE.Mesh
    Plane022: THREE.Mesh
    Plane023: THREE.Mesh
    Plane024: THREE.Mesh
    Plane025: THREE.Mesh
    Cube007: THREE.Mesh
    Cube008: THREE.Mesh
    Cylinder001: THREE.Mesh
    Cube009: THREE.Mesh
    Plane026: THREE.Mesh
    Cube015: THREE.Mesh
    Cube012: THREE.Mesh
    Cube013: THREE.Mesh
    Cube014: THREE.Mesh
    Cube016: THREE.Mesh
    Cube017: THREE.Mesh
    Cube018: THREE.Mesh
    Cube019: THREE.Mesh
    Cube020: THREE.Mesh
    Cube021: THREE.Mesh
    Cube022: THREE.Mesh
    Cube024: THREE.Mesh
    Plane055: THREE.Mesh
    Plane055_1: THREE.Mesh
    Plane015: THREE.Mesh
    Bone: THREE.Bone
  }
  materials: {
    ['Material.003']: THREE.MeshStandardMaterial
    ['Material.003']: THREE.MeshStandardMaterial
    ['Material.004']: THREE.MeshStandardMaterial
    ['Material.004']: THREE.MeshStandardMaterial
    ['Material.001']: THREE.MeshStandardMaterial
    ['Material.002']: THREE.MeshStandardMaterial
    ['Material.006']: THREE.MeshStandardMaterial
    ['Material.008']: THREE.MeshStandardMaterial
    ['Material.007']: THREE.MeshStandardMaterial
    ['Material.009']: THREE.MeshStandardMaterial
  }
}

type ActionName =
  | 'Take 001'
  | 'KeyAction'
  | 'Key.001Action'
  | 'ArmatureAction'
  | 'Leaf.001Action'
  | 'Leaf.002Action'
  | 'Leaf.003Action'
  | 'Leaf.004Action'
  | 'Leaf.005Action'
  | 'Leaf.006Action'
  | 'Leaf.001Action.001'
  | 'Leaf.002Action.001'
  | 'Leaf.003Action.001'
  | 'Leaf.004Action.001'
  | 'Leaf.005Action.001'
  | 'Leaf.006Action.001'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

interface callbackInterface {
  callback: () => void;
  onElementClick: (camera: cameraOptionsInferface) => void;
  sceneLoaded: boolean;
  onWindowsMode: () => void;
  windowsMode: boolean;
}

const listLeafAnimations = ['Leaf.001Action', 'Leaf.003Action', 'Leaf.004Action', 'Leaf.005Action', 'Leaf.006Action'];

export default function Model(props: JSX.IntrinsicElements['group'] & callbackInterface): React.ReactElement {
  const group = useRef<THREE.Group>();
  const gltf = useLoader(GLTFLoader, '/scene/test.glb');
  const { nodes, materials, animations } = gltf as GLTFResult;
  const { actions, names } = useAnimations(animations, group);

  const filteredNames: string[] = names.filter((name) => name !== 'Take 001');

  const [windowsPointer, setWindowsPointer] = useState<boolean>(false);

  const [screenColor, setScreenColor] = useState<string>('#BFBEBE');
  const [screenPointer, setScreenPointer] = useState<boolean>(false);

  const [fanColor, setFanColor] = useState<string>('#BFBEBE');
  const [fanPointer, setFanPointer] = useState<boolean>(false);

  const materialWall = materials['Material.009'].clone();
  materialWall.setValues({transparent: true});
  materialWall.setValues({opacity: 0.15});

  const materialWindows = materials['Material.009'].clone();
  materialWindows.setValues({transparent: true});
  materialWindows.setValues({opacity: 0});


  const materialScreen =  materials['Material.003'].clone();
  const materialFan = materials['Material.003'].clone();


  function dropLeaf(){
    const leafAnimationsNames = filteredNames.filter((name) => listLeafAnimations.includes(name));
    leafAnimationsNames.forEach((name) => {
      const leafAction = actions[name];
      if (leafAction){
        if(leafAction.isRunning()) leafAction.stop();
      }
    });

    const randomLeaf = leafAnimationsNames[Math.floor(Math.random()*leafAnimationsNames.length)];
    const actionLeaf = actions[randomLeaf];
    if(actionLeaf) {
      actionLeaf.setLoop(1, 1);
      actionLeaf.play();
    } 
  }

  useLayoutEffect(() => {
    if(!props.sceneLoaded) props.callback?.();
  }, []);


  useEffect(()=>{
    if(windowsPointer){
      materialWindows.setValues({color: 'rgb(66, 198, 255)'});
      materialWindows.setValues({opacity: 0.5});
    }else {
      materialWindows.setValues({opacity: 0});
    }
  }, [windowsPointer]);

  useEffect(()=>{
    if(screenPointer){
      materialScreen.setValues({color: 'rgb(66, 198, 255)'});
    }else {
      setScreenColor(materials['Material.003'].color.getStyle());
    }
  }, [screenPointer]);

  useEffect(()=>{
    if(fanPointer){
      materialFan.setValues({color: 'rgb(66, 198, 255)'});
    } else {
      materialFan.setValues({color: materials['Material.003'].color.getStyle()});
    }
  }, [fanPointer]);



  useEffect(()=>{
    const element = document.querySelector('canvas');
    if(element){
      if(screenPointer  || windowsPointer || fanPointer)element.classList.add('cursor-pointer');
      if(!screenPointer && !windowsPointer && !fanPointer)element.classList.remove('cursor-pointer');
    }
  }, [screenPointer, windowsPointer, fanPointer]);

  function randomAnimation() {
    stopAnimations();

    // startAnimation(actions[filteredNames[Math.floor(Math.random()*filteredNames.length)]]);
  }

  function stopAnimations(){
    const allActions = Object.entries(actions).map(([key]) => key);
    allActions.forEach((e) => {
      const action = actions[e];
      if(action) action.stop();
    });
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

  function playTree(){
    const treeAnimation = actions['ArmatureAction'];
    if(treeAnimation){
      treeAnimation.play();
    }
  }

  function playPlants(){
    const plantsAnimation = actions['Key.001Action'];
    if(plantsAnimation){
      plantsAnimation.play();
    }
  }

  
  function playFan(){
    const currentAnimation = actions['KeyAction'];

    if(currentAnimation) {
      if(currentAnimation.isRunning()){
        currentAnimation.stop();
      } else {
        currentAnimation.play();
      }
    } 
  }

  useEffect(() => {
    playPlants();
    playTree();
    playFan();

    const interval = setInterval(() => {
      dropLeaf();
    }, 3000);
    return () => clearInterval(interval);

  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      {
        // fan
      }
      <group
        onClick={() => playFan()}
        position={[-1.51, 1.36, 4.49]}
        rotation={[-Math.PI / 2, 0, 1.6]}
        scale={[0.02, 0.02, 0.02]}
        onPointerEnter={(e) => {e.stopPropagation(); setFanPointer(true);}}
        onPointerLeave={(e) => {e.stopPropagation(); setFanPointer(false);}}
      >
        <group position={[0, -0.52, 19.01]} rotation={[Math.PI / 2, -Math.PI / 4, 0]}>
          <group name="Fan_Blades7" position={[0, 1.75, 7.44]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
            <mesh
              geometry={nodes.Mesh_4.geometry}
              material={materialFan}
              rotation={[0, 0, -Math.PI / 4]}
            />
          </group>
          <group position={[-1.15, 3.73, -5.37]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.71, 0.71, 0.71]}>
            <mesh geometry={nodes.Mesh_3.geometry} material={materialFan} />
          </group>
          <group position={[-8.35, 10.11, 10.54]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              name="Mesh_2"
              geometry={nodes.Mesh_2.geometry}
              material={materialFan}
              morphTargetDictionary={nodes.Mesh_2.morphTargetDictionary}
              morphTargetInfluences={nodes.Mesh_2.morphTargetInfluences}
              position={[0, -11.22, 0]}
            />
          </group>
          <mesh geometry={nodes.Mesh_5.geometry} material={materialFan} position={[0, 1.73, 7.62]} />
        </group>
        <mesh geometry={nodes.Mesh_6.geometry} material={materialFan} />
      </group>
      <primitive object={nodes.Bone} />
      {
        // LEAFS
      }
      <group position={[-3.44, 0.4, 0.22]} rotation={[0, 1.51, 0]} scale={[0.52, 0.6, 0.52]}>
        <mesh
          name="Leaf001"
          geometry={nodes.Leaf001.geometry}
          material={materials['Material.004']}
          position={[1.26, 4.38, 1.8]}
        />
        <mesh
          name="Leaf002"
          geometry={nodes.Leaf002.geometry}
          material={materials['Material.004']}
          position={[-1.2, 1.76, -1.49]}
        />
        <mesh
          name="Leaf003"
          geometry={nodes.Leaf003.geometry}
          material={materials['Material.004']}
          position={[-0.75, 5.45, 2.54]}
        />
        <mesh
          name="Leaf004"
          geometry={nodes.Leaf004.geometry}
          material={materials['Material.004']}
          position={[0.31, 5.59, -0.2]}
        />
        <mesh
          name="Leaf005"
          geometry={nodes.Leaf005.geometry}
          material={materials['Material.004']}
          position={[-3.23, 3.76, 1.93]}
        />
        <mesh
          name="Leaf006"
          geometry={nodes.Leaf006.geometry}
          material={materials['Material.004']}
          position={[-3.72, 5.68, -1]}
        />
        <mesh
          name="Leaf007"
          geometry={nodes.Leaf007.geometry}
          material={materials['Material.004']}
          position={[1.26, 4.38, 1.8]}
        />
        <mesh
          name="Leaf008"
          geometry={nodes.Leaf008.geometry}
          material={materials['Material.004']}
          position={[-1.2, 1.76, -1.49]}
        />
        <mesh
          name="Leaf009"
          geometry={nodes.Leaf009.geometry}
          material={materials['Material.004']}
          position={[-0.75, 5.45, 2.54]}
        />
        <mesh
          name="Leaf010"
          geometry={nodes.Leaf010.geometry}
          material={materials['Material.004']}
          position={[0.31, 5.59, -0.2]}
        />
        <mesh
          name="Leaf011"
          geometry={nodes.Leaf011.geometry}
          material={materials['Material.004']}
          position={[-3.23, 3.76, 1.93]}
        />
        <mesh
          name="Leaf012"
          geometry={nodes.Leaf012.geometry}
          material={materials['Material.004']}
          position={[-3.72, 5.68, -1]}
        />

      </group>
      <skinnedMesh
        geometry={nodes.Tree.geometry}
        material={materials['Material.004']}
        skeleton={nodes.Tree.skeleton}
      />
      {
        // MURS
      }
      <group
        position={[-0.05, 2.28, 3.62]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <mesh geometry={nodes.Plane_1.geometry} material={materials['Material.001']} />
        <mesh geometry={nodes.Plane_2.geometry} material={materials['Material.002']} />
      </group>
      <group position={[-3.18, 4.01, 3.92]}>
        <mesh geometry={nodes.Plane001_1.geometry} material={materials['Material.001']} />
        <mesh geometry={nodes.Plane001_2.geometry} material={materials['Material.006']} />
      </group>
      <mesh
        geometry={nodes.Cylinder.geometry}
        material={materials['Material.001']}
        position={[-3.94, 3.6, 4.14]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.3, 0.3, 0.3]}
      />
      <mesh
        geometry={nodes.Circle.geometry}
        material={materials['Material.001']}
        position={[-3.96, 3.59, 3.89]}
        rotation={[Math.PI / 2, -1.57, 0]}
        scale={[0.02, 0.02, 0.02]}
      />
      <mesh
        geometry={nodes.Circle001.geometry}
        material={materials['Material.001']}
        position={[-3.96, 3.59, 3.88]}
        rotation={[Math.PI / 2, -0.91, 0]}
        scale={[0.02, 0.02, 0.02]}
      />
      <mesh
        geometry={nodes.Cube.geometry}
        material={materials['Material.001']}
        position={[-4.1, 2.41, 3.07]}
        scale={[0.82, 0.82, 0.82]}
      />
      <mesh
        geometry={nodes.Plane002.geometry}
        material={materials['Material.002']}
        position={[-4.12, 1.19, 3.85]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.03, 0.03, 0.03]}
      />
      <mesh
        geometry={nodes.Plane003.geometry}
        material={materials['Material.001']}
        position={[-4.35, 2.73, 3.93]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.05, 0.05, 0.05]}
      />
      <mesh
        geometry={nodes.Plane004.geometry}
        material={materials['Material.001']}
        position={[-4.36, 2.41, 3.93]}
        rotation={[Math.PI / 2, -0.12, 0]}
        scale={[0.05, 0.05, 0.05]}
      />
      <mesh
        geometry={nodes.Plane005.geometry}
        material={materials['Material.001']}
        position={[-4.35, 2.06, 3.93]}
        rotation={[Math.PI / 2, -0.1, 0]}
        scale={[0.05, 0.05, 0.05]}
      />
      <mesh
        geometry={nodes.Plane006.geometry}
        material={materials['Material.001']}
        position={[-4.35, 1.71, 3.93]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.05, 0.05, 0.05]}
      />
      <mesh
        geometry={nodes.Cube001.geometry}
        material={materials['Material.001']}
        position={[3.8, 2.41, 3.07]}
        scale={[0.82, 0.82, 0.82]}
      />
      <mesh
        geometry={nodes.Plane007.geometry}
        material={materials['Material.002']}
        position={[3.77, 1.19, 3.85]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.03, 0.03, 0.03]}
      />
      <mesh
        geometry={nodes.Plane008.geometry}
        material={materials['Material.001']}
        position={[3.67, 2.46, 3.93]}
        rotation={[Math.PI / 2, 0.02, 0]}
        scale={[0.06, 0.05, 0.05]}
      />
      <mesh
        geometry={nodes.Plane009.geometry}
        material={materials['Material.001']}
        position={[4.23, 2.44, 3.93]}
        rotation={[Math.PI / 2, -0.13, 0]}
        scale={[0.06, 0.05, 0.05]}
      />
      <mesh
        geometry={nodes.Plane010.geometry}
        material={materials['Material.001']}
        position={[4.09, 1.69, 3.93]}
        rotation={[Math.PI / 2, -0.09, 0]}
        scale={[0.05, 0.05, 0.05]}
      />
      <mesh
        geometry={nodes.Plane011.geometry}
        material={materials['Material.001']}
        position={[3.98, 2.08, 3.93]}
        rotation={[Math.PI / 2, -0.02, 0]}
        scale={[0.05, 0.05, 0.05]}
      />
      <mesh
        geometry={nodes.Plane012.geometry}
        material={materials['Material.001']}
        position={[3.97, 2.45, 3.93]}
        rotation={[Math.PI / 2, -0.14, 0]}
        scale={[0.05, 0.05, 0.05]}
      />
      <mesh
        geometry={nodes.Plane013.geometry}
        material={materials['Material.001']}
        position={[3.87, 1.69, 3.93]}
        rotation={[Math.PI / 2, -0.12, 0]}
        scale={[0.06, 0.05, 0.05]}
      />
      {
        // windows
        /*
                material={materialWindows}
        position={[-2.845, 1.88, 2.75]}
        scale={[0.0425, 0.0228, 0.01]}
        onPointerEnter={(e) => {e.stopPropagation(); setWindowsPointer(true);}}
        onPointerLeave={(e) => {e.stopPropagation(); setWindowsPointer(false);}}
        onClick={(e) => {e.stopPropagation(); props.onElementClick({
          position: defaultCameraPosition,
          rotation: defaultCameraRotation,
          fov: defaultFov,
        });}}
        */
      }

      <mesh
        geometry={nodes.Cube010.geometry}
        material={materials['Material.002']}
        position={[-2.845, 1.88, 2.75]}
        scale={[0.0425, 0.0228, 0.01]}
      />
      <mesh
        geometry={nodes.Cube002.geometry}
        material={materials['Material.001']}
        position={[-0.02, 3.8, 6.12]}
        scale={[0.03, 0.03, 0.27]}
      />
      <mesh
        geometry={nodes.Cube003.geometry}
        material={materials['Material.001']}
        position={[-3.56, 0.85, 5.06]}
        scale={[0.26, 0.29, 0.26]}
      />
      <mesh
        geometry={nodes.Cube004.geometry}
        material={materials['Material.001']}
        position={[-2.59, 0.87, 3.52]}
        rotation={[0, -0.2, 0]}
        scale={[0.27, 0.31, 0.27]}
      />
      <mesh
        geometry={nodes.Cube011.geometry}
        material={materials['Material.001']}
        position={[-1.45, 0.85, 4.49]}
        rotation={[0, 0.37, 0]}
        scale={[0.0365, 0.0365, 0.04]}
      />
      <mesh geometry={nodes.Plane014.geometry} material={materials['Material.008']} position={[-3.18, 0.54, 3.92]} />
      <mesh
        geometry={nodes.Cube006.geometry}
        material={materials['Material.003']}
        position={[-0.6, 1.42, 4.8]}
        rotation={[0, 0.24, 0]}
        scale={[0.003, 0.05, 0.05]}
      />
      <mesh
        geometry={nodes.Cube005.geometry}
        material={materials['Material.003']}
        position={[1.52, 0.7, 4.22]}
        rotation={[0, 0.25, 0]}
        scale={[0.16, 0.16, 0.16]}
      />
      <mesh
        geometry={nodes.Sphere.geometry}
        material={materials['Material.003']}
        position={[0.44, 1.01, 5.15]}
        rotation={[0, -1.04, 0]}
        scale={[0.04, 0.04, 0.04]}
      />
      <mesh
        geometry={nodes.Plane021.geometry}
        material={materials['Material.003']}
        position={[1.02, 1.72, 4.16]}
        rotation={[0, 0.24, 0]}
      />
      <mesh
        geometry={nodes.Plane016.geometry}
        material={materials['Material.003']}
        position={[-0.68, 1.64, 4.4]}
        rotation={[0, -0.36, 0]}
      />
      <mesh
        geometry={nodes.Plane017.geometry}
        material={materials['Material.003']}
        position={[-0.69, 1.58, 4.4]}
        rotation={[0, -0.36, 0]}
      />
      <mesh
        geometry={nodes.Plane018.geometry}
        material={materials['Material.003']}
        position={[1.63, 1.8, 4.16]}
        rotation={[1.49, -0.32, -1.83]}
      />
      <mesh
        geometry={nodes.Plane019.geometry}
        material={materials['Material.003']}
        position={[1.71, 1.79, 4.17]}
        rotation={[1.49, -0.3, -1.83]}
      />
      <mesh
        geometry={nodes.Plane020.geometry}
        material={materials['Material.003']}
        position={[1.6, 1.32, 4.21]}
        rotation={[-Math.PI, 1.06, -Math.PI]}
        scale={[0.89, 1.07, 0.89]}
      />
      <mesh
        geometry={nodes.Plane022.geometry}
        material={materials['Material.003']}
        position={[1.58, 1.07, 4.19]}
        rotation={[0, 0.25, 0]}
      />
      <mesh
        geometry={nodes.Plane023.geometry}
        material={materials['Material.003']}
        position={[1.59, 0.72, 4.22]}
        rotation={[1.54, -0.11, -1.82]}
        scale={[0.84, 1, 0.84]}
      />
      <mesh
        geometry={nodes.Plane024.geometry}
        material={materials['Material.003']}
        position={[1.67, 0.72, 4.25]}
        rotation={[1.55, -0.09, -1.82]}
        scale={[0.84, 0.77, 0.84]}
      />
      <mesh
        geometry={nodes.Plane025.geometry}
        material={materials['Material.003']}
        position={[1.72, 0.69, 4.19]}
        rotation={[1.55, -0.07, -1.82]}
        scale={[0.71, 0.96, 0.71]}
      />
      {
        // fix table droite
      }
      <mesh
        geometry={nodes.Cube007.geometry}
        material={materials['Material.001']}
        position={[3.5, 0.85, 4.6]}
        rotation={[0, 0, 0]}
        scale={[0.03, 0.035, 0.04]}
      />
      <mesh
        geometry={nodes.Cube008.geometry}
        material={materials['Material.003']}
        position={[3.21, 1.38, 4.72]}
        rotation={[0, -0.01, 0]}
        scale={[0.03, 0.03, 0.03]}
      />
      <mesh
        geometry={nodes.Cylinder001.geometry}
        material={materials['Material.003']}
        position={[2.37, 0.72, 4.08]}
        scale={[0.18, 0.18, 0.18]}
      />
      {
        //screen
      }
      <mesh
        geometry={nodes.Cube009.geometry}
        material={materialScreen} 
        onPointerEnter={(e) => {e.stopPropagation(); setScreenPointer(true);}}
        onPointerLeave={(e) => {e.stopPropagation(); setScreenPointer(false);}}
        onClick={(e) => {e.stopPropagation(); props.onElementClick({
          position: [0.55, 0.42, 1.62],
          rotation: [defaultCameraRotation[0] - 0.21, defaultCameraRotation[1] + 0.48, defaultCameraRotation[2] + 0.1],
          fov: defaultFov,
        });}}
        position={[-0.09, 1.93, 4.18]}
        rotation={[-0.3, 0.48, 0.14]}
      />

      <meshBasicMaterial
        attach="material"
        color={screenColor}
        opacity={1}
      />
      {
        // background issue
      }
      <mesh
        geometry={nodes.Plane026.geometry}
        material={materials['Material.007']}
        position={[0.41, 1.24, -8.93]}
        scale={[5.,5.,5.]}
      />
      <mesh
        geometry={nodes.Cube015.geometry}
        material={materials['Material.006']}
        position={[-0.14, 0.65, -6.36]}
        rotation={[0, -0.51, 0]}
        scale={[0.28, 0.28, 0.28]}
      />
      {
        // fenetre gauche
      }
      <mesh
        geometry={nodes.Cube012.geometry}
        material={materials['Material.002']}
        position={[-7.37, 1.86, 2.75]}
        scale={[0.043, 0.0231, 0.033]}
      />
      {
        // fenetre droite 
      }
      <mesh
        geometry={nodes.Cube013.geometry}
        material={materials['Material.002']}
        position={[4.97, 1.86, 2.75]}
        scale={[0.043, 0.0231, 0.033]}
      />
      <mesh
        geometry={nodes.Cube014.geometry}
        material={materials['Material.001']}
        position={[-7, 4.16, 3.25]}
        scale={[0.64, 0.12, 0.64]}
      />
      <mesh
        geometry={nodes.Cube016.geometry}
        material={materials['Material.001']}
        position={[-7, 0.34, 3.25]}
        scale={[0.64, 0.12, 0.64]}
      />
      <mesh
        geometry={nodes.Cube017.geometry}
        material={materials['Material.001']}
        position={[7.71, 4.16, 8.21]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0.64, 0.12, 0.64]}
      />
      <mesh
        geometry={nodes.Cube018.geometry}
        material={materials['Material.001']}
        position={[-7.76, 4.16, 8.21]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0.64, 0.12, 0.64]}
      />
      <mesh
        geometry={nodes.Cube019.geometry}
        material={materials['Material.006']}
        position={[7.56, 0.65, -6.36]}
        rotation={[0, -0.51, 0]}
        scale={[0.28, 0.28, 0.28]}
      />
      <mesh
        geometry={nodes.Cube020.geometry}
        material={materials['Material.006']}
        position={[-8.08, 0.65, -6.36]}
        rotation={[0, -0.51, 0]}
        scale={[0.28, 0.28, 0.28]}
      />
      <mesh
        geometry={nodes.Cube021.geometry}
        material={materials['Material.006']}
        position={[-15.97, 0.65, -6.36]}
        rotation={[0, -0.51, 0]}
        scale={[0.28, 0.28, 0.28]}
      />
      <mesh
        geometry={nodes.Cube022.geometry}
        material={materials['Material.006']}
        position={[16.56, 0.65, -6.36]}
        rotation={[0, -0.51, 0]}
        scale={[0.28, 0.28, 0.28]}
      />
      {
        //MUR FOND
      }
      <mesh
        geometry={nodes.Cube024.geometry}
        material={materialWall}
        position={[0.39, 0.60, 2.75]}
        scale={[0.023, 0.028, 0.03]}
      />

      {
        // WINDOWS FENETRE
      }
      <mesh
        visible={!props.windowsMode}
        onPointerEnter={(e) => {if(!props.windowsMode) {e.stopPropagation(); setWindowsPointer(true);}}}
        onPointerLeave={(e) => {if(!props.windowsMode) {e.stopPropagation(); setWindowsPointer(false);}}}
        onClick={(e) => {if(!props.windowsMode) {e.stopPropagation(); props.onWindowsMode(); setWindowsPointer(false); materialWindows.setValues({opacity: 0}); props.onElementClick({
          position: [-0.77, 0.85, 0.93],
          rotation: [defaultCameraRotation[0] - 0.080, defaultCameraRotation[1] - 0.15, defaultCameraRotation[2]],
          fov: defaultFov,
        });}}}
        geometry={nodes.Cube024.geometry}
        material={materialWindows}
        position={[-0.77, 1.88, 2.8]}
        scale={[0.0025, 0.0075, 0.02]}
      />

      <group position={[3.13, 0.54, 13.78]} rotation={[-Math.PI, 0, -Math.PI]}>
        <mesh geometry={nodes.Plane055.geometry} material={materials['Material.008']} />
        <mesh geometry={nodes.Plane055_1.geometry} material={materials['Material.006']} />
      </group>
      <mesh
        name="Plane015"
        geometry={nodes.Plane015.geometry}
        material={materials['Material.003']}
        morphTargetDictionary={nodes.Plane015.morphTargetDictionary}
        morphTargetInfluences={nodes.Plane015.morphTargetInfluences}
        position={[1.51, 2.25, 3.9]}
        rotation={[Math.PI / 2, 0.02, 1.19]}
        scale={[0.03, 0.12, 0.03]}
      />
    </group>
  );
}
