import * as React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Sidebar from "./components/Sidebar/Sidebar";
import Commit from './components/Commit/Commit';
import Pullrequest from './components/Pullrequest/Pullrequest';
import Issue from './components/Issue/Issue';
import Settings from './components/cognition/Settings';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <>
      <Router>
        <Sidebar/>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/commit" element={<Commit/>}/>
          <Route path="/issue" element={<Issue/>} />
          <Route path="/pullrequest" element={<Pullrequest/>} />
          <Route path="/settings" element={<Settings/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
