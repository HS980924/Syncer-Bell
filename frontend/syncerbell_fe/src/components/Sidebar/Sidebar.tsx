import styles from './Sidebar.module.scss';
import ptj_logo from '../../assets/png/logo.png';
import {Link} from 'react-router-dom';
import UserData, {userGit} from "../leftside_data/leftside_data";

function Sidebar() {
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
                                    className={styles.sidebarNavLink}
                                    to={`/home`}>Home</Link>
                            </li>
                            <li className={styles.sidebarNavItem}>
                                <Link 
                                    className={styles.sidebarNavLink}
                                    to={`/commit`}>Commit</Link>
                            </li>
                            <li className={styles.sidebarNavItem}>
                                <Link 
                                    className={styles.sidebarNavLink}
                                    to={`/issue`}>Issue</Link>
                            </li>
                            <li className={styles.sidebarNavItem}>
                                <Link 
                                    className={styles.sidebarNavLink}
                                    to={`/pullrequest`}>Pull Request</Link>
                            </li>
                            <li className={styles.sidebarNavItem}>
                                <p 
                                    className={styles.sidebarNavLink}
                                    onClick={()=>{
                                        window.open(`${userGit}`, '_blank')
                                    }}>Github</p>
                            </li>
                            <li className={styles.sidebarNavItem}>
                                <Link 
                                    className={styles.sidebarNavLink}
                                    to={`/settings`}>Settings</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;