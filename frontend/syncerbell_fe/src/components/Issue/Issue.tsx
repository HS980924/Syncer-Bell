import React from 'react'
import styles from './Issue.module.scss';
import RightSide from '../RightSide/RightSide';
// import {commitData} from '../Dashboard/Dashboard';

const Issue = () => {
    // const data = commitData;

    return (
        <>
            <main className={styles.dashBoard}>
                <div className={styles.dashBoardMain}>
                    <section className={styles.dashBoardCenterArea}>
                        {/*<!-------------------------- 
                                    Head Area 
                            ---------------------------->*/}
                        <div className={styles.headerArea}>
                            <div className={styles.headTitleArea}>
                                <p className={styles.title}>Syncer-Bell</p>
                                <p className={styles.dataRange}>01 - 31, January, 2022</p>
                            </div>
                        </div>

                        {/*<!-------------------------- 
                                    Issue Area 
                            ---------------------------->*/}
                        <div className={styles.issueArea}>
                            <div className={styles.titleArea}>
                                <p className={styles.areaTitle}>Issue</p>
                            </div>
                        </div>
                    </section>
                    <RightSide/>
                </div>
            </main> 
        </>
    )
}

export default Issue;