import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCog } from 'react-icons/fa';
import {GithubPicker} from 'react-color';

import styles from './Settings.module.scss';
import RightSide from '../RightSide/RightSide';
import Sidebar from '../Sidebar/Sidebar';
import { userNAME } from '../leftside_data/leftside_data';
import axios from 'axios';

export let userColor = {mainColor:"", hoverColor:""};
export let changeNumber = 5;
export let barColor="#00ff45";
export let barColor_hover="#97ffb3";

const Settings = () => {

    let setting_Cnt = JSON.stringify(window.localStorage.getItem("countNumber"));
    console.log(setting_Cnt)
    function createDefault(target:string){
        const defaultValue = window.localStorage.getItem(target);
        if(defaultValue !== null){//target값이 localStorage에 있으면
            return defaultValue;
        }
        else{
            return false;
        }
    }

    const [showCount, setShowCount] = useState(parseInt(setting_Cnt));
    const [toggleCommit, setToggleCommit] = useState(createDefault("is_commit_mailing"));
    const [toggleIssue, setToggleIssue] = useState(createDefault("is_issue_mailing"));
    const [togglePulls, setTogglePulls] = useState(createDefault("is_pulls_mailing"));

    const send=(name:string, state:boolean)=>{
        const client = axios.create();   // axios 기능생성
        client.post('/setting' , {"name":name, "state":state} );   //axios 기능을 통한 post 사용및 name 값 전달.
    }
    
    const sendID=(name:string, state:string)=>{
        const client = axios.create();   // axios 기능생성
        client.post('/setting' , {"name":name, "state":state} );   //axios 기능을 통한 post 사용및 name 값 전달.
    }

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
        window.localStorage.setItem("is_commit_mailing", toggleCommit.toString());
        send("commit",Boolean(toggleCommit));
        sendID("user",userNAME);
    }

    function toggleIssueFunction(){
        setToggleIssue(prevStatus => prevStatus ? false : true);
        window.localStorage.setItem("is_issue_mailing", toggleIssue.toString());
        send("issue",Boolean(toggleIssue));
        sendID("user",userNAME);
    }

    function togglePullsFunction(){
        setTogglePulls(prevStatus => prevStatus ? false : true);
        window.localStorage.setItem("is_pulls_mailing", togglePulls.toString());
        send("pulls",Boolean(togglePulls));
        sendID("user",userNAME);
    }

    let [bgColor, setBgColor] = useState(null);
    let [hover_bgColor, setHoverColor] = useState(null);

    const handleChangeComplete = (color:any) => {
        setBgColor(color.hex)
        window.localStorage.setItem("chartColor", color.hex);
    }

    const handleHoverChangeComplete = (color:any) => {
        setHoverColor(color.hex)
        window.localStorage.setItem("chartColor_hover", color.hex);
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
                                    Project "SyncerBell"은 Team Devlll에서 시행한 첫 번째 학습용 프로젝트입니다.<br/>
                                    처음 시도해보는 FE와 BE사이의 협업, Git과 Slack을 통한 커뮤니케이션, <br/>
                                    Notion을 통한 개발문서화, Agile 개발방식을 활용한 프로젝트 관리까지 많은 시도를 하였고<br/>
                                    그 결과가 여러분이 보고 있는 SyncerBell DashBoard입니다.<br/>
                                    <br/>
                                    학습을 위한 프로젝트였기에 결과물의 완성도보다는 정해진 기간동안 기능구현에 비중을 두었습니다.
                                    본 프로젝트가 밑거름이 되어 앞으로의 개발에 도움이 될 것입니다.
                                    <br/>
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
                                    <div className={styles.chartColorWrapper}>
                                        <h3 className={styles.functionTitle}>👉 Select Chart Color</h3>
                                        <GithubPicker className={styles.colorPicker} onChangeComplete={handleChangeComplete}/>
                                    </div>
                                    <div className={styles.hoverChartColorWrapper}>
                                        <h3 className={styles.functionTitle}>👉 Select Chart Hover Color</h3>
                                        <GithubPicker className={styles.colorPicker} onChangeComplete={handleHoverChangeComplete}/>
                                    </div>
                                </div>
                                <div className={styles.showDetails}>
                                    <h3 className={styles.functionTitle}>👉 Show Item Count</h3>
                                    <div className={styles.controlForm}>
                                        <div className={styles.buttonArea}>
                                            <p>{setting_Cnt} : </p>
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
                                                        {color:"red"}:
                                                        {color:"green"}
                                                    }
                                            >Commit</p>
                                            <input className={styles.itemChecking} type="checkbox" checked={!Boolean(toggleCommit)} onClick={toggleCommitFunction}/>
                                        </div>
                                        <div className={styles.checkboxWrapper}>
                                            <p 
                                                className={styles.itemTitle}
                                                style={
                                                    (toggleIssue === true)?
                                                        {color:"red"}:
                                                        {color:"green"}
                                                    }
                                            >Issue</p>
                                            <input className={styles.itemChecking} type="checkbox" checked={!Boolean(toggleIssue)} onClick={toggleIssueFunction}/>
                                        </div>
                                        <div className={styles.checkboxWrapper}>
                                            <p 
                                                className={styles.itemTitle}
                                                style={
                                                    (togglePulls === true)?
                                                        {color:"red"}:
                                                        {color:"green"}
                                                    }
                                            >Pull Request</p>
                                            <input className={styles.itemChecking} type="checkbox" checked={!Boolean(togglePulls)} onClick={togglePullsFunction}/>
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
