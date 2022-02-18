export interface birdInterface {
    props: JSX.IntrinsicElements['group'];
    callback: () => void;
    key: string;
    birdSpeed: number;
    position: number[];
  }