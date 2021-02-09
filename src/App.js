import logo from './logo.svg';
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <FirstComponent />
      </header>
    </div>
  );
}

class FirstComponent extends React.Component {
  render() {
    return (
    <div className="App">
    <header className="App-header">
        First Component
    </header>
  </div>
    )
  }
}

export default App;
