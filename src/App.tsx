import React from 'react';
import './App.css';
import Home from './components/landing/home';
import { AppProvider } from './components/reducers/context';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <header className="App-header">
          <Home />
        </header>
      </div>
    </AppProvider>
  );
}

export default App;
