import { Euler } from 'three';

export interface CustomAvatarProps{
    props: JSX.IntrinsicElements['group'];
    reachedAvatarPositionCallback?: () => void;
  }
export interface customProps {
    rotation: Euler;
    finalPosition: number[]
  }
export interface customAvatarInterface {
    setCurrentAnimation: (animation: animationInterface) => void;
    getPosition: () => THREE.Vector3 | undefined;
    getRotation?: () => THREE.Euler | undefined;
    setAvatarPosition: (position: number[]) => void;
    setAvatarRotation?: (position: number[]) => void;
    setUnitsVectors?: (position: number[]) => void;
    lookAt?: (position: number[]) => void;
}

export interface animationInterface {
  value: string
  sound?: string
}