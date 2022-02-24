import React, { useState } from 'react'
import styles from './Issue.module.scss';
import RightSide from '../RightSide/RightSide';
import { FaArrowLeft, FaBox, FaSyncAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';

const Issue = () => {

    function transforming(data:any){
        let res = JSON.parse(JSON.stringify(data));
        return JSON.parse(res);
    }

    let base_issue = transforming(window.localStorage.getItem("issueData"));
    const [newIssueData, setNewIssueData] = useState(base_issue);

    const updateIssue = async()=>{
        try{
            const result = await axios.get('/issue');
            let new_issue = JSON.parse(result.data);
            if(new_issue !== base_issue){
                window.localStorage.setItem("issueData", JSON.stringify(new_issue));
            }
            else{
                alert("Can't load issue Update!");
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
                                    <FaBox className={styles.issueIcon}/>
                                    <p className={styles.title}>Issue</p>
                                    <p className={styles.dates}>January 1th ~ 30th, 2022</p>
                                </div>
                                <FaSyncAlt className={styles.issueReloadIcon} onClick={updateIssue}/>
                            </div>
                        </div>

                        {/*<!-------------------------- 
                                    Issue Area 
                            ---------------------------->*/}
                        <div className={styles.issueArea}>
                            <ul className={styles.listArea}>
                                {newIssueData.map((item:any)=>(
                                    <li className={styles.issueList} key={item.url.slice(15,)} onClick={()=>{
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