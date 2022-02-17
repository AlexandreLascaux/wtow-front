export interface CustomAvatarProps{
    props: JSX.IntrinsicElements['group'];
  }
  
export interface customAvatarInterface {
    setCurrentAnimation: (animation: animationInterface) => void;
}

export interface animationInterface {
  value: string
  sound?: string
}