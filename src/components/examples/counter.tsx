import React from 'react';

interface counterInterface {
    text: string;
    counter: number;
}

export default function Counter({text, counter}: counterInterface){

  return (
    <>
      <div>
            Vous avez cliqué {counter} fois
      </div>
      <p>{text}</p>
    </>
  );
}