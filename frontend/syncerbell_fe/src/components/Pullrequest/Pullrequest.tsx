import React, { useState } from 'react'
import styles from './Pullrequest.module.scss';
import RightSide from '../RightSide/RightSide';
import { FaArrowLeft, FaSyncAlt, FaBoxes } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';

const Pullrequest = () => {
    
    function transforming(data:any){
        let res = JSON.parse(JSON.stringify(data));
        return JSON.parse(res);
    }

    let base_pulls = transforming(window.localStorage.getItem("pullsData"));

    const [newPullsData, setNewPullsData] = useState(base_pulls);
    
    const updatePulls = async()=>{
        try{
            const result = await axios.get('/pullrequest');
            let new_pulls = JSON.parse(result.data);
            if(new_pulls !== base_pulls){
                window.localStorage.setItem("pullsData", JSON.stringify(new_pulls));
            }
            else{
                alert("Can't load Pulls Update!");
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
                                    <FaBoxes className={styles.prIcon}/>
                                    <p className={styles.title}>Pull Request</p>
                                    <p className={styles.dates}>January 1th ~ 30th, 2022</p>
                                </div>
                                <FaSyncAlt className={styles.prReloadIcon} onClick={updatePulls}/>
                            </div>
                        </div>

                        {/*<!-------------------------- 
                                    Pull Request Area 
                            ---------------------------->*/}
                        <div className={styles.prArea}>
                            <ul className={styles.listArea}>
                                {newPullsData.map((item:any)=>(
                                    <li className={styles.prList} key={item.url.slice(15,)} onClick={()=>{
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
