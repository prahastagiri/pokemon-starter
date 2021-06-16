import React from 'react';
import Pokemon from './components/Pokemon_mainContent.js';
import './App.css';
function App() {
  return (
    <div className="App">
      <div className="desktop">
        <Pokemon/>
      </div>
      <div className="mobile funny">
        <img style={{width:'80%',boxShadow:'10px 10px 5px -6px rgba(0,0,0,0.39)',borderRadius:'10px'}} src={process.env.PUBLIC_URL + '/background/masahiro.png'}/>
        <p className="text">HOW</p>
      </div>
    </div>
  );
}

export default App;
