import * as React from 'react';
import { BrowserRouter as RouterWrap, Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import Settings from './components/cognition/Settings';
import Commit from './components/Commit/Commit';
import Dashboard from './components/Dashboard/Dashboard';
import Issue from './components/Issue/Issue';
import Pullrequest from './components/Pullrequest/Pullrequest';
import Load from './view/Loading';
import Welcome from './view/Welcome';

function App() {
  return (
    <div className={styles.container}>
        <RouterWrap>
            <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/loading" element={<Load/>}/>
                <Route path="/home" element={<Dashboard/>}/>
                <Route path="/commit" element={<Commit/>}/>
                <Route path="/issue" element={<Issue/>}/>
                <Route path="/pullrequest" element={<Pullrequest/>}/>
                <Route path="/settings" element={<Settings/>}/>
            </Routes>
        </RouterWrap>
    </div>
  );
}

export default App;
