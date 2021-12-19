import styles from './Sidebar.module.scss';
import user from '../../assets/png/jh.jpg';
import {Link, useLocation} from 'react-router-dom';

const sidebarNavLinks = [
    "dashboard",
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
            <div className={styles.sidebarContent}>
                <div className={styles.profileDetails}>
                    <div className={styles.profileImageDiv}>
                        <img src={user} alt="user"/>
                        <p className={styles.notifications}>4</p>
                    </div>
                    <p className={styles.userName}>JH9892</p>
                    <p className={styles.userEmail}>diadiahun0902@email.com</p>
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
            </div>
        </aside> 
    </>
    );
}