import React from 'react'
import styles from './Rightside.module.scss';
import dummy from '../../assets/png/dummy_img.jpg';

const RightSide = () => {
    const year_statics = [
        {
            id:1,
            category: "Commit",
            entity:65,
        },{
            id:2,
            category: "Pull Request",
            entity:23,
        },{
            id:3,
            category: "Issue",
            entity:40,
        },{
            id:4,
            category: "Todays's Commit",
            entity:15,
        },
    ]

    return (
        <>
            <section className={styles.dashBoardRightSide}>
                <p className={styles.sideOverviewTitle}>2022's Statics</p>
                <ul>
                    {year_statics.map((item) => (
                        <li key={item.id}>
                            <div className={styles.spendCategory}>
                                <p className={styles.spendCategoryName}>{item.category}</p>
                                <p className={styles.spendCategoryPrice}>{item.entity}</p>
                            </div>
                            <div className={styles.spendCategoryBar}>
                                <div 
                                    style={{width:`${item.entity}%`}}
                                    className={styles.spendCategoryColoredBar}></div>
                            </div>
                        </li> 
                    ))}
                </ul>
                <div className={styles.adsImageSection}>
                    <img className={styles.adsImage} src={dummy} alt="dummy_image"/>
                </div>
            </section>
        </>
    )
}

export default RightSide
