export interface CustomAvatarProps{
    props: JSX.IntrinsicElements['group'];
    reachedAvatarPositionCallback?: () => void;
  }
export interface customProps {
    finalPosition: number[]
  }
export interface customAvatarInterface {
    setCurrentAnimation: (animation: animationInterface) => void;
    getPosition: () => THREE.Vector3 | undefined;
    setAvatarPosition: (position: number[]) => void;
}

export interface animationInterface {
  value: string
  sound?: string
}