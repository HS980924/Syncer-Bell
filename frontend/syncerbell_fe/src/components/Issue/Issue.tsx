import React from 'react'
import styles from './Issue.module.scss';
import RightSide from '../RightSide/RightSide';
import { FaArrowLeft, FaBox, FaSyncAlt } from 'react-icons/fa';
import { issueData } from '../../view/Welcome';
import { Link } from 'react-router-dom';

// export let printIssue=[{repoName:"", user:"", title:"", date:"", url:""}];

const Issue = () => {

    // printIssue = issueData.slice(0,10)

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
                                    Issue Area 
                            ---------------------------->*/}
                        <div className={styles.issueArea}>
                            <ul className={styles.listArea}>
                                {issueData.map((item)=>(
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