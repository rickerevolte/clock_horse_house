import React from 'react';
import Clock from './components/Clock';
import Music from './components/Music';

const App = () => {
  return (
    <div className="App">
      <Clock />
      <br></br>
      <h4>add some fancy music</h4>
      <Music />
    </div>
  )
}
export default App;
