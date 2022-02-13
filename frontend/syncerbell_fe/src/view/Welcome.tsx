import React, { useState } from 'react';
import styles from './Welcome.module.scss';
import component from '../assets/png/component.png';
import ProjectTitle from '../assets/png/ProjectTitle.png';
import axios from 'axios';

export let commitData = [{ repoName: "", user: "", message: "", date: "", url: "" }];
export let issueData = [{ repoName: "", user: "", title: "", date: "", url: "" }];
export let pullsData = [{ repoName: "", user: "", title: "", date: "", url: "" }];
export let statics = {commits:0, issues:0, pulls:0}; 
export let countNumber = 5;
export let printIssue = [{ repoName: "", user: "", title: "", date: "", url: "" }];
export let printPR = [{ repoName: "", user: "", title: "", date: "", url: "" }];

const Welcome = () => {

    const [isAuth, setAuth] = useState(false);
    const [userData, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState< any | null > (null);
    
    const onLogin = (e:any) => {
        window.open("http://localhost:5000/auth/github", "_self");
        fetchData();
    }

    // const goToDashboard=(userId:any)=>{
    //     fetchData();
    //     navigate("/home");
    //     navigate( "/home", {state : {id:userId}} );
    // }

    const fetchData = async() => {
        try{
            setAuth(false);
            setLoading(false);
            setData(null);
            const res = await axios.get('/alldata');
            commitData = JSON.parse(res.data)["commit"];
            issueData = JSON.parse(res.data)["issue"];
            pullsData = JSON.parse(res.data)["pulls"];
            statics = JSON.parse(res.data)["cnt"];
            printIssue = issueData.slice(0, countNumber);
            printPR = pullsData.slice(0, countNumber);
            setData(JSON.parse(res.data));
        }catch(e){
            setError(e);
        }
        setLoading(false);
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