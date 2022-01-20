import * as React from 'react'
import { BrowserRouter as RouterWrap, Route, Routes } from 'react-router-dom';

import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import Commit from './components/Commit/Commit';
import Issue from './components/Issue/Issue';
import Pullrequest from './components/Pullrequest/Pullrequest';
import Settings from './components/cognition/Settings';

const Router = () => {
    return (
        <RouterWrap>
            <Sidebar/>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/commit" element={<Commit/>}/>
                <Route path="/issue" element={<Issue/>}/>
                <Route path="/pullrequest" element={<Pullrequest/>}/>
                <Route path="/settings" element={<Settings/>}/>
            </Routes>
        </RouterWrap>
    )
}

export default Router
