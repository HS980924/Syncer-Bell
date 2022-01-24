import React from 'react';
import styles from './Welcome.module.scss';
import RouterModule from '../Router';
import {useEffect, useState} from 'react';
import axios from "axios";

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
export let statics = [
    {
        commit: 0,
        issue: 0,
        pulls: 0
    }
];

const Welcome = () => {
    const [userData, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState < any | null > (null);

    const fetchCommit = async() => {
        try {
            setError(null);
            setData(null);
            setLoading(true);
            const res = await axios.get('/alldata');
            setData(res.data);
            console.log(res.data["commit"].data);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchCommit();
        console.log("loading?")
    }, []);

    if (loading) 
        return <div className={styles.container}> <h2 className={styles.beforeLoadData_msg}>Loading....</h2> </div>;
    if(errors) return <h3 className={styles.msg}>Error!!</h3 >;
    if (!userData) 
        return null;
    
    return <> <RouterModule/> </>;
};

export default Welcome;