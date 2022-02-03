import React, { useState } from 'react'
import styles from './Pullrequest.module.scss';
import RightSide from '../RightSide/RightSide';
import { FaArrowLeft, FaSyncAlt, FaBoxes } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import { pullsData } from '../../view/Welcome';
import axios from 'axios';

export let refreshPr=[{repoName:"", user:"", title:"", date:"", url:""}];

const Pullrequest = () => {
    
    const [newPullsData, setNewPullsData] = useState(pullsData);
    
    const updatePulls = async()=>{
        try{
            const result = await axios.get('/pullrequest');
            console.log(result.data);
            setNewPullsData(JSON.parse(result.data));
            refreshPr = newPullsData;
        }catch(e){
            alert("Can't load Commit Update!");
        }
    }

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
                                <FaSyncAlt className={styles.prReloadIcon} onClick={updatePulls}/>
                            </div>
                        </div>

                        {/*<!-------------------------- 
                                    Pull Request Area 
                            ---------------------------->*/}
                        <div className={styles.prArea}>
                            <ul className={styles.listArea}>
                                {newPullsData.map((item)=>(
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
