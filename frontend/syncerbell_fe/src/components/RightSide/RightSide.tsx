import React from 'react'
import styles from './Rightside.module.scss';
import dummy from '../../assets/png/dummy_img.jpg';
import { statics } from '../../view/Welcome';

const RightSide = () => {
    const user_statics = [
        {
            id:1,
            category: "Commit",
            entity:statics.commits,
        },{
            id:2,
            category: "Issues",
            entity:statics.issues,
        },{
            id:3,
            category: "Pull Request",
            entity:statics.pulls,
        },
    ]

    function checkPercentage(entity:number){
        if(entity>100){
            return false;
        }
        else{
            return true;
        }
    }
    return (
        <>
            <section className={styles.dashBoardRightSide}>
                <p className={styles.sideOverviewTitle}>2022's Statics</p>
                <ul>
                    {user_statics.map((item) => (
                        <li key={item.id}>
                            <div className={styles.spendCategory}>
                                <p className={styles.spendCategoryName}>{item.category}</p>
                                <p className={styles.spendCategoryPrice}>{item.entity}</p>
                            </div>
                            <div className={styles.spendCategoryBar}>
                                <div 
                                    style={checkPercentage(item.entity) ? {width:`${item.entity}%`} : {width:`100%`}}
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
