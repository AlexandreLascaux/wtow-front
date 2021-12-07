import React, { useState } from "react"
import logo from './logo.svg';
import './App.css';
import useWindowDimensions from './components/setup/useWindowDimensions';
import Home from './components/landing/home';

function App() {
  const { height, width } = useWindowDimensions();
  
  const realHeight = height > window.screen.availHeight ? window.screen.availHeight : height;
  const realWidth = width > window.screen.availWidth ? window.screen.availWidth : width;

  return (
    <div className="App">
      <header className="App-header" style={{width: `${realWidth}px`, height: realHeight}}>
        <Home/>
      </header>
    </div>
  );
}

export default App;
