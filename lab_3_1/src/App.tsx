import './App.css';
import React from 'react';
import Buttons from './components/Buttons';

function App() {
  return (
    <div className="App">
      <h1>Кнопки-счетчики</h1>
      <Buttons count={3} />
    </div>
  );
}

export default App;