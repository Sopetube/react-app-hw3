import React from 'react';
import './App.css';
import Timer from './components/Timer';

function App() {
  const handleTimeEnd = () => {
    console.log("Done!");
  };

  const handleTimeStart = (timeLeft) => {
    console.log("Stared:", timeLeft);
  };

  const handleTimePause = (timeLeft) => {
    console.log("On pause:", timeLeft);
  };

  return (
    <div className="App">
      <h1>Timer</h1>
      <Timer
        initialTime={''}
        tickInterval={1000}
        autoStart={false}
        onTimeEnd={handleTimeEnd}
        onTimeStart={handleTimeStart}
        onTimePause={handleTimePause}
      />
    </div>
  );
}

export default App;

