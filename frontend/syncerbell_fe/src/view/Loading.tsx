import React, {useState, useEffect} from 'react'
import styles from './Loading.module.scss';
import axios from 'axios';

export let commitData = [{ repoName: "", user: "", message: "", date: "", url: "" }];
export let issueData = [{ repoName: "", user: "", title: "", date: "", url: "" }];
export let pullsData = [{ repoName: "", user: "", title: "", date: "", url: "" }];
export let statics = {commits:0, issues:0, pulls:0}; 
export let countNumber = 5;
export let printIssue = [{ repoName: "", user: "", title: "", date: "", url: "" }];
export let printPR = [{ repoName: "", user: "", title: "", date: "", url: "" }];
export let dData: any;

const Loading = () => {

    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState< any | null > (null);

    const fetchData = async() => {
        try{
            const res = await axios.get('/alldata');
            commitData = JSON.parse(res.data)["commit"];
            issueData = JSON.parse(res.data)["issue"];
            pullsData = JSON.parse(res.data)["pulls"];
            statics = JSON.parse(res.data)["cnt"];
            printIssue = issueData.slice(0, countNumber);
            printPR = pullsData.slice(0, countNumber);
            setData(JSON.parse(res.data));
            console.log("execute fetching");
            console.log(data);
            console.log(JSON.parse(res.data));
            console.log(JSON.stringify(res.data));
            console.log(commitData);
            console.log(issueData);
            console.log(pullsData);

            alert("why not?");
            dData = data;
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
        console.log(isLoading);
    }

    return (    
        <div className={styles.container}>
            <p className={styles.title}>Loading...</p>
        </div>
    )
}

export default Loading;