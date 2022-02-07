import * as React from 'react'
import { BrowserRouter as RouterWrap, Route, Routes } from 'react-router-dom';

import Dashboard from './components/Dashboard/Dashboard';
import Commit from './components/Commit/Commit';
import Issue from './components/Issue/Issue';
import Pullrequest from './components/Pullrequest/Pullrequest';
import Settings from './components/cognition/Settings';
import Welcome from './view/Welcome';

const Router = () => {
    return (
        <RouterWrap>
            <Welcome/>
            <Routes>
                <Route path="/home" element={<Dashboard/>}/>
                <Route path="/commit" element={<Commit/>}/>
                <Route path="/issue" element={<Issue/>}/>
                <Route path="/pullrequest" element={<Pullrequest/>}/>
                <Route path="/settings" element={<Settings/>}/>
            </Routes>
        </RouterWrap>
    )
}

export default Router
