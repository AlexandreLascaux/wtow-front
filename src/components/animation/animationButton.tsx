import React, { lazy, Suspense } from 'react';


export interface animationButtonInterface{
    value: string;
    icon: string;
    onIconClick: (value: string) => void;
}

export default function AnimationButton({value, icon, onIconClick}: animationButtonInterface): React.ReactElement{
  const Icon = lazy(() => import(`./icons/${icon}`).catch((e) => console.error(e)));
  return (
    <div onClick={() => onIconClick(value)}>
      <Suspense fallback={null}>
        <Icon />
      </Suspense>
      {
        value
      }
    </div>
  );
}

