import React from 'react';
import './App.css';
import Comp from './components/Comp';
import About from './components/About';
import Terms from './components/Terms';
import crinniu from './img/crinniu.svg';
import ywig from './img/ywig.svg';

function App() {
  return (
    <div className="App">
      <header className="Header">
        <div className="Logos">
          <div className="YwigWrap">
            <img className="Ywig" src={ywig} />
          </div>
          <div className="CrinniuWrap">
            <img className="Crinniu" src={crinniu} />
          </div>
        </div>
        <h1>Photo Competition</h1>
      </header>
      <main>
        <About />
        <Comp />
        <Terms />
      </main>
    </div>
  );
}

export default App;
