import React from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import MAIN from './components/Main/main';

function App() {
  return (
    <>
    <Router>
      <MAIN />
    </Router>
    </>
  );
}

export default App;
