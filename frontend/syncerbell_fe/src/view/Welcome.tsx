import React from 'react';
import styles from './Welcome.module.scss';
import component from '../assets/png/component.png';
import ProjectTitle from '../assets/png/ProjectTitle.png';

const Welcome = () => {
    const onLogin = () => {
        window.open("http://localhost:5000/auth/github", "_self");
    }

    return (
        <> 
            <div className={styles.introWrap}>
                <img className={styles.logo} src={component} alt={component}/>
                <img className={styles.logoWriting} src={ProjectTitle} alt={ProjectTitle}/>
                <button className={styles.enterBtn} onClick={onLogin}>Enter</button>
            </div>
        </>
    );
};

export default Welcome;