import * as React from 'react'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';

import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Sidebar/>
                <Route path="/home" element={<Dashboard/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
