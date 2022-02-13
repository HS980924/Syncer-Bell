import React, { useState } from 'react'
import styles from './Commit.module.scss';
import {FaArrowLeft, FaDelicious, FaSyncAlt} from 'react-icons/fa';
import RightSide from '../RightSide/RightSide';
import { Link } from 'react-router-dom';
import { commitData } from '../../view/Welcome';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';

export let refreshCommit = [
    {
        repoName: "",
        user: "",
        message: "",
        date: "",
        url: ""
    }
];

const Commit = () => {
    const [newCommitData, setNewCommitData] = useState(commitData);
    
    const updateCommit = async()=>{
        try{
            const result = await axios.get('/commit');
            setNewCommitData(JSON.parse(result.data));
            refreshCommit = newCommitData;
            console.log(refreshCommit);
        }catch(e){
            alert("Can't load Commit Update!");
        }
    }

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
                                <div className={styles.titleGroup}>
                                    <FaDelicious className={styles.commitIcon}/>
                                    <p className={styles.title}>Commit</p>
                                    <p className={styles.dates}>January 1th ~ 30th, 2022</p>
                                </div>
                                <FaSyncAlt className={styles.commitReloadIcon} onClick={updateCommit}/>
                            </div>
                        </div>

                        {/*<!-------------------------- 
                                    Commit Area 
                            ---------------------------->*/}
                        <div className={styles.commitArea}>
                            <ul className={styles.listArea}>
                                {newCommitData.map((item)=>(
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
                    </section>
                    <RightSide/>
                </div>
            </main> 
        </>
    )
}

export default Commit
