import React from 'react'
import {IoStatsChartSharp} from 'react-icons/io5';
import {HiMusicNote} from 'react-icons/hi';
import {FiUsers, FiSettings} from 'react-icons/fi';
import {SiDatacamp, Si1001Tracklists} from 'react-icons/si';
/*import Logo from "../assets/logo.png"*/

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="upper__container">
                <div className="brand">
                    <img src="#" alt=""/>
                </div>
                <div className="links">
                    <ul>
                        <li>
                            <IoStatsChartSharp />
                            <a href="#">Overview</a>
                        </li>
                        <li>
                            <SiDatacamp />
                            <a href="#">A&R data</a>
                        </li>
                        <li>
                            <Si1001Tracklists />
                            <a href="#">Challenges</a>
                        </li>
                        <li>
                            <HiMusicNote />
                            <a href="#">Songs</a>
                        </li>
                        <li>
                            <FiUsers />
                            <a href="#">Users</a>
                        </li>
                        <li>
                            <FiSettings />
                            <a href="#">Settings</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="lower__containers">
                <div className="music__containers">
                    
                </div>
            </div>
        </div>
    )
}

export default Sidebar
