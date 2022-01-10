import React from 'react'
import styles from './Pullrequest.module.scss';
import RightSide from '../RightSide/RightSide';

const Pullrequest = () => {
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
                                Pull Request Area 
                            ---------------------------->*/}
                        <div className={styles.issueArea}>
                            <div className={styles.titleArea}>
                                <p className={styles.areaTitle}>Pull Request</p>
                            </div>
                        </div>
                    </section>
                    <RightSide/>
                </div>
            </main> 
        </>
    )
}

export default Pullrequest
