export interface birdInterface {
    props: JSX.IntrinsicElements['group'];
    callback: () => void;
    identifiant: string;
    birdSpeed: number;
    position: number[];
  }