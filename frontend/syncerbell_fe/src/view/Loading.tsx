import React, {useState, useEffect} from 'react'
import styles from './Loading.module.scss';
import axios from 'axios';

export let cogDefaultCnt:number;

const Loading = () => {

    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState< any | null > (null);

    function createDefaultNumber(){
        const defaultValue = window.localStorage.getItem("countNumber");
        if(defaultValue !== null){//target값이 localStorage에 있으면
            return defaultValue;
        }
        else{
            return "5";
        }
    }

    let default_cnt = parseInt(createDefaultNumber());
    cogDefaultCnt = default_cnt;

    const fetchData = async() => {
        try{
            const res = await axios.get('/alldata');
            /* Originally, below data should be saved the DB. After version 1.0.0, 
            If we refactoring this project. we must intergrated data to DB */
            window.localStorage.setItem("userData", res.data);
            window.localStorage.setItem("weeklyData", JSON.stringify(JSON.parse(res.data)["threeWeek"]));
            window.localStorage.setItem("commitData", JSON.stringify(JSON.parse(res.data)["commit"]));
            window.localStorage.setItem("issueData", JSON.stringify(JSON.parse(res.data)["issue"]));
            window.localStorage.setItem("pullsData", JSON.stringify(JSON.parse(res.data)["pulls"]));
            window.localStorage.setItem("static", JSON.stringify(JSON.parse(res.data)["cnt"]));
            window.localStorage.setItem("printIssue", JSON.stringify(JSON.parse(res.data)["issue"].slice(0, default_cnt)));
            window.localStorage.setItem("printPR", JSON.stringify(JSON.parse(res.data)["pulls"].slice(0, default_cnt)));
            window.localStorage.setItem("countNumber", createDefaultNumber());
            setLoading(true);
        }catch(e){
            setError(e);
            alert(isError);
        }
    }

    useEffect(()=>{
        fetchData();
    }, []);

    const movePage = ()=>{
        window.open("http://localhost:3000/home", "_self");
    }

    if(isLoading){
        movePage();
    }

    return (    
        <div className={styles.container}>
            <p className={styles.title}>Loading...</p>
        </div>
    )
}

export default Loading;