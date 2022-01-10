import styles from './Sidebar.module.scss';
import ptj_logo from '../../assets/png/logo.png';
import {Link, useLocation} from 'react-router-dom';
import UserData, {userGit} from "../leftside_data/leftside_data";

// import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Commit from '../Commit/Commit';
import Pullrequest from '../Pullrequest/Pullrequest';
import Settings from '../cognition/Settings';
import DashboardMain from '../Dashboard/Dashboard';
import Issue from '../Issue/Issue';

const sidebarNavLinks = ["home","commit","issue","pullrequest","settings"];

function Sidebar() {
    const location = useLocation();

    // function isAuth(){
    //     return null;
    // }

    return (
        <> 
            <aside className={styles.leftBar}>
                <img className={styles.ptjLogo} src={ptj_logo} alt="ptj_logo"/>
                <div className={styles.leftBarContent}>
                    <UserData />
                </div>

                <div className={styles.leftBarMenu}>
                    <nav>
                        <ul>
                            <li className={styles.sidebarNavItem}>
                                <Link 
                                    className={location.pathname === `/${sidebarNavLinks}`
                                        ? styles.sidebarNavLinkActive
                                        : styles.sidebarNavLink}
                                    to={`/`} 
                                    onClick={()=>{ return <DashboardMain/> }}>Home</Link>
                            </li>
                            <li className={styles.sidebarNavItem}>
                                <Link 
                                    className={location.pathname === `/${sidebarNavLinks}`
                                        ? styles.sidebarNavLinkActive
                                        : styles.sidebarNavLink}
                                    to={`/commit`}
                                    onClick={()=>{
                                        if(location.pathname === '/commit'){
                                            return <Commit/>;
                                        }
                                        else{
                                            return <DashboardMain/>
                                        }
                                    }}>Commit</Link>
                            </li>
                            <li className={styles.sidebarNavItem}>
                                <Link 
                                    className={location.pathname === `/${sidebarNavLinks}`
                                        ? styles.sidebarNavLinkActive
                                        : styles.sidebarNavLink}
                                    to={`/issue`}
                                    onClick={()=>{
                                        if(location.pathname === '/commit'){
                                            return <Issue/>;
                                        }
                                        else{
                                            return <DashboardMain/>
                                        }
                                    }}>Issue</Link>
                            </li>
                            <li className={styles.sidebarNavItem}>
                                <Link 
                                    className={location.pathname === `/${sidebarNavLinks}`
                                        ? styles.sidebarNavLinkActive
                                        : styles.sidebarNavLink}
                                    to={`/pullrequest`}
                                    onClick={()=>{
                                        if(location.pathname === '/pullrequest'){
                                            return <Pullrequest/>;
                                        }
                                        else{
                                            return <DashboardMain/>
                                        }
                                    }}>Pull Request</Link>
                            </li>
                            <li className={styles.sidebarNavItem}>
                                <p 
                                    className={location.pathname === `/${sidebarNavLinks}`
                                        ? styles.sidebarNavLinkActive
                                        : styles.sidebarNavLink}
                                    onClick={()=>{
                                        window.open(`${userGit}`, '_blank')
                                    }}>Github</p>
                            </li>
                            <li className={styles.sidebarNavItem}>
                                <Link 
                                    className={location.pathname === `/${sidebarNavLinks}`
                                        ? styles.sidebarNavLinkActive
                                        : styles.sidebarNavLink}
                                    to={`/settings`}
                                    onClick={()=>{
                                        if(location.pathname === '/settings'){
                                            return <Settings/>;
                                        }
                                        else{
                                            return <DashboardMain/>
                                        }
                                    }}>Settings</Link>
                            </li>

                        </ul>
                    </nav>
                </div>
            </aside>
            <DashboardMain/>
        </>
    );
}

export default Sidebar;