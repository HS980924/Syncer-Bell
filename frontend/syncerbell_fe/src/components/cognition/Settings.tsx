import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCog } from 'react-icons/fa';
import {GithubPicker} from 'react-color';

import styles from './Settings.module.scss';
import RightSide from '../RightSide/RightSide';
import Sidebar from '../Sidebar/Sidebar';

export let userColor = {mainColor:"", hoverColor:""};
export let changeNumber = 5;
export let barColor="#00ff45";
export let barColor_hover="#97ffb3";

const Settings = () => {
    // let countNumber = parseInt(window.localStorage.getItem("countNumber"));
    const [showCount, setShowCount] = useState(5);
    const [toggleCommit, setToggleCommit] = useState(false);
    const [toggleIssue, setToggleIssue] = useState(false);
    const [togglePulls, setTogglePulls] = useState(false);
    
    function addCount(){
        changeNumber = showCount+1;
        if(changeNumber >= 6){
            window.localStorage.setItem("countNumber", "5");
            setShowCount(5);
            changeNumber = 5;
        }
        else {
            const nextNumber = showCount+1;
            window.localStorage.setItem("countNumber", nextNumber.toString());
            setShowCount(nextNumber);
        }
    }

    function minusCount(){
        changeNumber = showCount-1;
        if(changeNumber <= 1){
            window.localStorage.setItem("countNumber", "1");
            setShowCount(1);
            changeNumber = 1;
        }
        else {
            const nextNumber = showCount-1;
            window.localStorage.setItem("countNumber", nextNumber.toString());
            setShowCount(nextNumber)
        }
    }

    function toggleCommitFunction(){
        setToggleCommit(prevStatus => prevStatus ? false : true);
    }

    function toggleIssueFunction(){
        setToggleIssue(prevStatus => prevStatus ? false : true);
    }

    function togglePullsFunction(){
        setTogglePulls(prevStatus => prevStatus ? false : true);
    }

    useEffect(()=>{
        setShowCount(changeNumber);
    }, [])

    return (
        <>
            <Sidebar/>
            <main className={styles.dashBoard}>
                <div className={styles.dashBoardMain}>
                    <section className={styles.dashBoardCenterArea}>
                        <Link to="/home">
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
                            <div className={styles.developerArea}>
                                <div className={styles.projectArea}>
                                    <div className={styles.developerDetail}>
                                        <p className={styles.projectTitle}>SyncerBell</p>
                                        <p className={styles.developTeam}>Team. Devlll</p>
                                        <p className={styles.developerList}><i>Ash ⚔️ choiHS</i></p>
                                    </div>
                                    <div className={styles.bottomLine}></div>
                                    <p className={styles.projectBio}>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas eaque quo officia accusamus est cumque deleniti, rerum voluptatum fuga minus. Dolore praesentium atque ipsa officia asperiores reprehenderit repudiandae quam repellendus!
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas eaque quo officia accusamus est cumque deleniti, rerum voluptatum fuga minus. Dolore praesentium atque ipsa officia asperiores reprehenderit repudiandae quam repellendus!
                                    </p>
                                </div>
                            </div>

                            {/* <!--- Project Function ---> */}
                            <div className={styles.functionArea}>
                                <div className={styles.logoutForm}>
                                    <h3 className={styles.functionTitle}>👉 Account</h3>
                                    <div className={styles.buttonWrapper}>
                                        <button className={styles.logoutBtn} onClick={()=>{
                                            window.open("http://localhost:5000/auth/logout", "_self");
                                        }}>Logout</button>
                                    </div>
                                </div>
                                <div className={styles.barColor}>
                                    <h3 className={styles.functionTitle}>👉 Select Bar Color</h3>
                                    <GithubPicker className={styles.colorPicker}/>
                                </div>
                                <div className={styles.showDetails}>
                                    <h3 className={styles.functionTitle}>👉 Show Item Count</h3>
                                    <div className={styles.controlForm}>
                                        <div className={styles.buttonArea}>
                                            <p>{showCount} : </p>
                                            <button className={styles.toggleButton} onClick={addCount}>+</button>
                                            <button className={styles.toggleButton} onClick={minusCount}>-</button>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.selectMailing}>
                                    <h3 className={styles.functionTitle}>👉 Select Mailing</h3>
                                    <div className={styles.mailingBigWrapper}>
                                        <div className={styles.checkboxWrapper}>
                                            <p 
                                                className={styles.itemTitle}
                                                style={
                                                    (toggleCommit === true)?
                                                        {color:"green"}:
                                                        {color:"red"}
                                                    }
                                            >Commit</p>
                                            <input className={styles.itemChecking} type="checkbox" onClick={toggleCommitFunction}/>
                                        </div>
                                        <div className={styles.checkboxWrapper}>
                                            <p 
                                                className={styles.itemTitle}
                                                style={
                                                    (toggleIssue === true)?
                                                        {color:"green"}:
                                                        {color:"red"}
                                                    }
                                            >Issue</p>
                                            <input className={styles.itemChecking} type="checkbox" onClick={toggleIssueFunction}/>
                                        </div>
                                        <div className={styles.checkboxWrapper}>
                                            <p 
                                                className={styles.itemTitle}
                                                style={
                                                    (togglePulls === true)?
                                                        {color:"green"}:
                                                        {color:"red"}
                                                    }
                                            >Pull Request</p>
                                            <input className={styles.itemChecking} type="checkbox" onClick={togglePullsFunction}/>
                                        </div>
                                    </div>
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
