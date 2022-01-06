import styles from './Sidebar.module.scss';
import ptj_logo from '../../assets/png/logo.png';
import {Link, useLocation} from 'react-router-dom';
import UserLeftSide from '../leftside_data/leftside_data';


const sidebarNavLinks = [
    "home",
    "commit",
    "issue",
    "pullRequest",
    "github",
    "settings"
];

export default function Sidebar() {
    const location = useLocation();

    return (
        <> 
            <aside className={styles.sidebar}>
                <img className={styles.ptjLogo} src={ptj_logo} alt="ptj_logo"/>

                <div className={styles.sidebarContent}>
                    <UserLeftSide/>
                </div>

                <nav>
                    <ul>
                        {sidebarNavLinks.map(sidebarNavLinks => 
                        <li className={styles.sidebarNavItem} key={sidebarNavLinks}>
                            <Link
                                className={location.pathname === `/${sidebarNavLinks}`
                                ? styles.sidebarNavLinkActive
                                : styles.sidebarNavLink}
                                to={`/${sidebarNavLinks}`}>{sidebarNavLinks.charAt(0).toUpperCase() + sidebarNavLinks.slice(1)}</Link>
                        </li>)}
                    </ul>
                </nav>
            </aside> 
        </>
    );
}