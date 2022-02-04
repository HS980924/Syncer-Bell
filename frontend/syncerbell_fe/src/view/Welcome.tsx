import React, { useEffect } from 'react';
import styles from './Welcome.module.scss';
import component from '../assets/png/component.png';
import ProjectTitle from '../assets/png/ProjectTitle.png';
import {useState} from 'react';
import axios from "axios";
import Dashboard from '../components/Dashboard/Dashboard';

export let commitData = [
    {
        repoName: "",
        user: "",
        message: "",
        date: "",
        url: ""
    }
];
export let issueData = [
    {
        repoName: "",
        user: "",
        title: "",
        date: "",
        url: ""
    }
];
export let pullsData = [
    {
        repoName: "",
        user: "",
        title: "",
        date: "",
        url: ""
    }
];
export let statics = {commits:0, issues:0, pulls:0}; 

export let countNumber = 5;

export let printIssue = [
    {
        repoName: "",
        user: "",
        title: "",
        date: "",
        url: ""
    }
];

export let printPR = [
    {
        repoName: "",
        user: "",
        title: "",
        date: "",
        url: ""
    }
];

const Welcome = () => {
    const [userData, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState < any | null > (null);
    const [isClick, setIsClick] = useState(false);

    const moveURL = "http://localhost:5000/auth/github";
    const checkURL = "http://localhost:5000/home";

    let checkTest = () =>{
        while(true){
            if(window.location.href === checkURL){    
                fetchData();
                console.log("check");
                console.log(userData);
                return <Dashboard/>;
            }
        }
    }

    const fetchData = async() => {
        try {
            setError(null);
            setData(null);
            setLoading(true);
            const res = await axios.get('/alldata');
            commitData = JSON.parse(res.data)["commit"];
            issueData = JSON.parse(res.data)["issue"];
            pullsData = JSON.parse(res.data)["pulls"];
            statics = JSON.parse(res.data)["cnt"];
            printIssue = issueData.slice(0, countNumber);
            printPR = pullsData.slice(0, countNumber);
            setData(JSON.parse(res.data));
            await checkTest();
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }

    useEffect(()=>{
        setError(null);
        setData(null);
        setLoading(true);
        setIsClick(false);
    },[]);

    if (loading)
        if (!isClick){
            return( //data prevent
                <div className={styles.introWrap}>
                    <img className={styles.logo} src={component} alt={component}/>
                    <img className={styles.logoWriting} src={ProjectTitle} alt={ProjectTitle}/>
                    <button className={styles.enterBtn} onClick={()=>{
                        window.location.href=moveURL;
                        checkTest();
                    }}>Enter</button>
                </div>
            );}
        else return ( //data loading
            <div className={styles.container}>
                <h2 className={styles.beforeLoadData_msg}>Loading....</h2>
            </div>
        );
    if(errors) return <h3 className={styles.msg}>Error!!</h3>;
    if (!userData) 
        return null;
    
    return (<> 
        <Dashboard/>
    </>);
};

export default Welcome;