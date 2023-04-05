import React, { useState } from 'react';
import './reset.css';
import './App.css';
import background from './assets/background.jpg';
import Header from './components/Header/Header';
import Info from './components/Info/Info';
import { Context } from './context';

function App() {
  const [stateWeather, setStateWeather] = useState(background);
  
  return (
    <Context.Provider value={{ stateWeather, setStateWeather }}>
      <div style={{ backgroundImage: `url(${stateWeather})` }} className='app'>
        <Header />
        <Info />
      </div>
    </Context.Provider>
  );
};

export default App;