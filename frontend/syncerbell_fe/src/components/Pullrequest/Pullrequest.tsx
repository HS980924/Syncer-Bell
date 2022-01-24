import React from 'react'
import {useState, useEffect} from 'react';
import styles from './Pullrequest.module.scss';
import RightSide from '../RightSide/RightSide';
import { FaArrowLeft, FaSyncAlt, FaBoxes } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import axios from 'axios';

let prData=[{repoName:"", user:"", title:"", date:"", url:""}];
export let printPr=[{repoName:"", user:"", title:"", date:"", url:""}];

const Pullrequest = () => {
    const [pr, setPr] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState<any | null>(null);

    const fetchPullRequest = async()=>{
        try{
            setError(null);
            setPr(null);
            setLoading(true);
            const res = await axios.get('/pullrequest');
            setPr(res.data);
            console.log(res.data);
        } catch(error){
            setError(error);
        }
        setLoading(false);
    }

    useEffect(()=>{
        fetchPullRequest();
    }, []);

    if(loading) return <h3 className={styles.msg}>Loading....</h3>;
    if(errors) return <h3 className={styles.msg}>Error!!</h3>;
    if(!pr) return null;

    prData = JSON.parse(pr);
    printPr = prData.slice(0,10)

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
                                    <FaBoxes className={styles.prIcon}/>
                                    <p className={styles.title}>Pull Request</p>
                                    <p className={styles.dates}>January 1th ~ 30th, 2022</p>
                                </div>
                                <FaSyncAlt className={styles.prReloadIcon}/>
                            </div>
                        </div>

                        {/*<!-------------------------- 
                                    Pull Request Area 
                            ---------------------------->*/}
                        <div className={styles.prArea}>
                            <ul className={styles.listArea}>
                                {printPr.map((item)=>(
                                    <li className={styles.prList} key={item.title} onClick={()=>{
                                        window.open(`${item.url}`, '_blank')
                                    }}>
                                        <div className={styles.prListItem}>
                                                <div className={styles.itemHeader}>
                                                    <p className={styles.prTitle}>{item.title}</p>
                                                    <p className={styles.prTime}>{item.date}</p>
                                                    <div className={styles.secondInfo}>
                                                        <p className={styles.prRepo}>{item.repoName}</p>
                                                        <p className={styles.prAsignee}>{item.user}</p>
                                                    </div>
                                                </div>
                                        </div>
                                        <p className={styles.prBio}>{item.title}</p>
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

export default Pullrequest
