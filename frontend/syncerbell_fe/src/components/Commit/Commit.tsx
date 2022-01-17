import React from 'react'
import styles from './Commit.module.scss';
import {FaArrowLeft, FaDelicious} from 'react-icons/fa';
import RightSide from '../RightSide/RightSide';
import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from "axios";

export let commitData=[{repoName:"", user:"", message:"", date:"", url:""}];

const Commit = () => {
    const [commit, setCommit] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState<any | null>(null);

    const fetchCommit = async()=>{
        try{
            setError(null);
            setCommit(null);
            setLoading(true);
            const res = await axios.get('/commit');
            setCommit(res.data);
            console.log(res.data);
        } catch(error){
            setError(error);
        }
        setLoading(false);
    }

    useEffect(()=>{
        fetchCommit();
    }, []);

    if(loading) return <h3 className={styles.msg}>Loading....</h3>;
    if(errors) return <h3 className={styles.msg}>Error!!</h3>;
    if(!commit) return null;

    commitData = JSON.parse(commit);
    // const dummyCommitData = [
    //     {
    //         id:1,
    //         title: "Issue 01",
    //         commitTime: "5:12 PM",
    //         repo: "Repo : syncer-bell",
    //         asignee: "JH9892",
    //         bio:"lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
    //     },
    //     {
    //         id:2,
    //         title: "Issue 02",
    //         commitTime: "5:12 PM",
    //         repo: "Repo : syncer-bell",
    //         asignee: "JH9892",
    //         bio:"lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
    //     },
    //     {
    //         id:3,
    //         title: "Issue 03",
    //         commitTime: "5:12 PM",
    //         repo: "Repo : syncer-bell",
    //         asignee: "JH9892",
    //         bio:"lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
    //     },
    //     {
    //         id:4,
    //         title: "Issue 04",
    //         commitTime: "5:12 PM",
    //         repo: "Repo : syncer-bell",
    //         asignee: "JH9892",
    //         bio:"lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
    //     },
    //     {
    //         id:5,
    //         title: "Issue 05",
    //         commitTime: "5:12 PM",
    //         repo: "Repo : syncer-bell",
    //         asignee: "JH9892",
    //         bio:"lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
    //     },
    //     {
    //         id:6,
    //         title: "Issue 06",
    //         commitTime: "5:12 PM",
    //         repo: "Repo : syncer-bell",
    //         asignee: "JH9892",
    //         bio:"lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
    //     },
    //     {
    //         id:7,
    //         title: "Issue 07",
    //         commitTime: "5:12 PM",
    //         repo: "Repo : syncer-bell",
    //         asignee: "JH9892",
    //         bio:"lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
    //     },
    //     {
    //         id:8,
    //         title: "Issue 08",
    //         commitTime: "5:12 PM",
    //         repo: "Repo : syncer-bell",
    //         asignee: "JH9892",
    //         bio:"lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
    //     },
    //     {
    //         id:9,
    //         title: "Issue 09",
    //         commitTime: "5:12 PM",
    //         repo: "Repo : syncer-bell",
    //         asignee: "JH9892",
    //         bio:"lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
    //     },
    //     {
    //         id:10,
    //         title: "Issue 10",
    //         commitTime:"5:32 PM",
    //         repo:"Repo : syncer-bell",
    //         asignee: "JH9892",
    //         bio:"lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
    //     }
    // ]

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
                                <FaDelicious className={styles.commitIcon}/>
                                <p className={styles.title}>Commit</p>
                                <p className={styles.dates}>January 1th ~ 30th, 2022</p>
                            </div>
                        </div>

                        {/*<!-------------------------- 
                                    Commit Area 
                            ---------------------------->*/}
                        <div className={styles.commitArea}>
                            <ul className={styles.listArea}>
                                {commitData.map((item)=>(
                                    <li className={styles.commitList} key={item.message} onClick={()=>{
                                        window.open(`${item.url}`, '_blank')
                                    }}>
                                        <div className={styles.commitListItem}>
                                                <div className={styles.itemHeader}>
                                                    <p className={styles.commitTitle}>{item.message}</p>
                                                    <p className={styles.commitTime}>{item.date}</p>
                                                    <div className={styles.secondInfo}>
                                                        <p className={styles.commitRepo}>{item.repoName}</p>
                                                        <p className={styles.commitAsignee}>{item.user}</p>
                                                    </div>
                                                </div>
                                        </div>
                                        <p className={styles.commitBio}>{item.message}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* <!----------------------------------------------
                                    Commit Area : demo data
                            -------------------------------------------> */}
                        {/* <div className={styles.commitArea}>
                            <ul className={styles.listArea}>
                                {dummyCommitData.map((items)=>(
                                    <li className={styles.commitList} key={items.id}>
                                        <div className={styles.commitListItem}>
                                                <div className={styles.itemHeader}>
                                                    <p className={styles.commitTitle}>{items.title}</p>
                                                    <p className={styles.commitTime}>{items.commitTime}</p>
                                                    <div className={styles.secondInfo}>
                                                        <p className={styles.commitRepo}>{items.repo}</p>
                                                        <p className={styles.commitAsignee}>{items.asignee}</p>
                                                    </div>

                                                </div>
                                        </div>
                                        <p className={styles.commitBio}>{items.bio}</p>
                                    </li>
                                ))}
                            </ul>
                        </div> */}
                    </section>
                    <RightSide/>
                </div>
            </main> 
        </>
    )
}

export default Commit
