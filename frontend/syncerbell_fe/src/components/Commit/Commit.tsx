import React from 'react'
import styles from './Commit.module.scss';
import {FaArrowLeft, FaDelicious, FaSyncAlt} from 'react-icons/fa';
import RightSide from '../RightSide/RightSide';
import { Link } from 'react-router-dom';
import { commitData } from '../../view/Welcome';


const Commit = () => {

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
                                    <FaDelicious className={styles.commitIcon}/>
                                    <p className={styles.title}>Commit</p>
                                    <p className={styles.dates}>January 1th ~ 30th, 2022</p>
                                </div>
                                <FaSyncAlt className={styles.commitReloadIcon}/>
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
                    </section>
                    <RightSide/>
                </div>
            </main> 
        </>
    )
}

export default Commit
