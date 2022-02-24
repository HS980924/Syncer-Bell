import React, { useState } from 'react'
import styles from './Commit.module.scss';
import {FaArrowLeft, FaDelicious, FaSyncAlt} from 'react-icons/fa';
import RightSide from '../RightSide/RightSide';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';

const Commit = () => {
    function transforming(data:any){
        let res = JSON.parse(JSON.stringify(data));
        return JSON.parse(res);
    }

    let base_commit = transforming(window.localStorage.getItem("commitData"));
    const [newCommitData, setNewCommitData] = useState(base_commit);
    
    const updateCommit = async()=>{
        try{
            const result = await axios.get('/commit');
            let new_commit = JSON.parse(result.data);
            if (new_commit !== base_commit){
                window.localStorage.setItem("commitData", JSON.stringify(new_commit));
                // console.log("Update is noting!");
            }
            else{
                alert("Can't load Commit Update!");
            }
        }catch(e){
            alert("Error!!");
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
                                {newCommitData.map((item:any)=>(
                                    <li className={styles.commitList} key={item.url.slice(15,)} onClick={()=>{
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
