import React from 'react';
import styles from './Settings.module.scss';
import RightSide from '../RightSide/RightSide';
import { userData } from '../leftside_data/leftside_data';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCog } from 'react-icons/fa';

export let userColor = {mainColor:"", hoverColor:""};

const Settings = () => {
    
    return (
        <>
            <main className={styles.dashBoard}>
                <div className={styles.dashBoardMain}>
                    <section className={styles.dashBoardCenterArea}>
                        <Link to="/">
                            <FaArrowLeft className={styles.backArrowBtn}/>
                        </Link>
                        {/*<!-------------------------- 
                                    Head Area 
                            ---------------------------->*/}
                        <div className={styles.headerArea}>
                            <div className={styles.headTitleArea}>
                                <FaCog className={styles.cogIcon}/>
                                <p className={styles.title}>Settings</p>
                            </div>
                        </div>

                        {/*<!-------------------------- 
                                    Settings Area 
                            ---------------------------->*/}
                        <div className={styles.settingArea}>
                            <div className={styles.userArea}>
                                <img className={styles.userImage} src={userData.image} alt={userData.image}/>
                                <div className={styles.userDetailArea}>
                                    <div className={styles.userData}>
                                        <p className={styles.userName}>{userData.name}</p>
                                        <p className={styles.userlogin}>{userData.login}</p>
                                    </div>
                                    <p className={styles.userGithub}>{userData.url}</p>
                                </div>
                                <div className={styles.btnForm}>
                                    <button className={styles.logoutBtn}>👉 Logout</button>
                                </div>
                            </div>
                        </div>
                    </section>
                    <RightSide/>
                </div>
            </main> 
        </>
    )
}

export default Settings
