import React from 'react'
import {useState, useEffect} from 'react';
import styles from './Issue.module.scss';
import RightSide from '../RightSide/RightSide';
import { FaArrowLeft, FaBox, FaSyncAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

let issueData=[{repoName:"", user:"", title:"", date:"", url:""}];
export let printIssue=[{repoName:"", user:"", title:"", date:"", url:""}];

const Issue = () => {
    const [issue, setIssue] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState<any | null>(null);

    const fetchIssue = async()=>{
        try{
            setError(null);
            setIssue(null);
            setLoading(true);
            const res = await axios.get('/issue');
            setIssue(res.data);
            console.log(res.data);
        } catch(error){
            setError(error);
        }
        setLoading(false);
    }

    useEffect(()=>{
        fetchIssue();
    }, []);

    if(loading) return <h3 className={styles.msg}>Loading....</h3>;
    if(errors) return <h3 className={styles.msg}>Error!!</h3>;
    if(!issue) return null;

    issueData = JSON.parse(issue);
    printIssue = issueData.slice(0,10)

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
                                <div className={styles.titleGroup}>
                                    <FaBox className={styles.issueIcon}/>
                                    <p className={styles.title}>Issue</p>
                                    <p className={styles.dates}>January 1th ~ 30th, 2022</p>
                                </div>
                                <FaSyncAlt className={styles.issueReloadIcon}/>
                            </div>
                        </div>

                        {/*<!-------------------------- 
                                    Commit Area 
                            ---------------------------->*/}
                        <div className={styles.issueArea}>
                            <ul className={styles.listArea}>
                                {printIssue.map((item)=>(
                                    <li className={styles.issueList} key={item.title} onClick={()=>{
                                        window.open(`${item.url}`, '_blank')
                                    }}>
                                        <div className={styles.issueListItem}>
                                                <div className={styles.itemHeader}>
                                                    <p className={styles.issueTitle}>{item.title}</p>
                                                    <p className={styles.issueTime}>{item.date}</p>
                                                    <div className={styles.secondInfo}>
                                                        <p className={styles.issueRepo}>{item.repoName}</p>
                                                        <p className={styles.issueAsignee}>{item.user}</p>
                                                    </div>
                                                </div>
                                        </div>
                                        <p className={styles.issueBio}>{item.title}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                    <RightSide/>
                </div>
            </main> 
        </>
    )
}

export default Issue;