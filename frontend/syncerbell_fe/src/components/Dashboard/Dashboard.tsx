import styles from './Dashboard.module.scss';
import { FaBox, FaBoxes  } from 'react-icons/fa';
import {Bar, BarChart, Cell, ResponsiveContainer} from 'recharts';
import {Link} from 'react-router-dom';
import {useState} from 'react';

import optionIcon from '../../assets/png/menuIcon.png';
import RightSide from '../RightSide/RightSide';
import { changeNumber } from '../cognition/Settings';
import Sidebar from '../Sidebar/Sidebar';

function Dashboard() {
    const [activeIndex, setActiveIndex] = useState(0);
    // let weekly = transforming(window.localStorage.getItem("weeklyData"));
    

    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400
        }, {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210
        }, {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290
        }, {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000
        }, {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181
        }, {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500
        }, {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100
        },
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400
        }, {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210
        }, {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290
        }, {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000
        }, {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181
        }, {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500
        }, {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100
        },
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400
        }, {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210
        }, {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290
        }, {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000
        }, {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181
        }, {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500
        }, {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100
        },
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400
        }, {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210
        }, {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290
        }, {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000
        }, {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181
        }, {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500
        }, {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100
        },
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400
        }, {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210
        }, {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290
        }, {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000
        }, {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181
        }, {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500
        }, {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500
        }, {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100
        },
    ];


    const onMouseOver = (data : any, index : number) => setActiveIndex(index);
    
    function transforming(data:any){
        let res = JSON.parse(JSON.stringify(data));
        return JSON.parse(res);
    }

    let dash_printIssue = transforming(window.localStorage.getItem("printIssue"));
    let dash_printPR = transforming(window.localStorage.getItem("printPR"));
    let chartColor = window.localStorage.getItem("chartColor");
    let chartColor_hover = window.localStorage.getItem("chartColor_hover");

    return ( 
        <> 
            <Sidebar/>
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
                            
                            <ResponsiveContainer className={styles.chartArea} width="70%" height="70%">
                                <BarChart data={data}>
                                    <Bar 
                                        dataKey="uv" 
                                        fill="rgba(21,122,255,.2)" 
                                        onMouseOver={onMouseOver}>
                                        {data.map((entry, index) => (
                                        <Cell
                                            cursor="pointer"
                                            fill={index === activeIndex
                                            ? `${chartColor}`
                                            : `${chartColor_hover}`}
                                            key={index}
                                        />
                                    ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/*<!-------------------------- 
                                    Issue Area 
                            ---------------------------->*/}
                        <div className={styles.issueArea}>
                            <div className={styles.titleArea}>
                                <div className={styles.titleWrapper}>
                                    <FaBox className={styles.titleIcon}/>
                                    <p className={styles.areaTitle}>Issue</p>
                                </div>
                                <Link to="/issue">
                                    <button>
                                        <img className={styles.showDetails} src={optionIcon} alt="options"/>
                                    </button>
                                </Link>
                                
                            </div>

                            <ul>
                                {dash_printIssue.slice(0,changeNumber).map((item:any) => (
                                    <li className={styles.showingItem} key={item.date} onClick={()=>{
                                        window.open(`${item.url}`, '_blank')
                                    }}>
                                        <div className={styles.showingItemLeft}>
                                            <div 
                                                className={styles.showingItemDiv}>
                                                <p className={styles.showingItemIcon}>👉</p>
                                            </div>
                                            <div className={styles.showingItemDetails}>
                                                <p className={styles.showingItemTitle}>{item.repoName}</p>
                                                <p className={styles.showingItemTime}>
                                                    {item.title}
                                                </p>
                                            </div>
                                        </div>
                                        <p className={styles.showingItemPrice}>{item.user}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        {/*<!-------------------------- 
                                    PR Area 
                            ---------------------------->*/}
                        <div className={styles.prArea}>
                            <div className={styles.titleArea}>
                            <div className={styles.titleWrapper}>
                                    <FaBoxes className={styles.titleIcon}/>
                                    <p className={styles.areaTitle}>Pull Request</p>
                                </div>
                                <Link to="/pullrequest">
                                    <button>
                                        <img className={styles.showDetails} src={optionIcon} alt="options"/>
                                    </button>
                                </Link>
                            </div>

                            <ul>
                                {dash_printPR.slice(0,changeNumber).map((item:any) => (
                                    <li className={styles.showingItem} key={item.date} onClick={()=>{
                                        window.open(`${item.url}`, '_blank')
                                    }}>
                                        <div className={styles.showingItemLeft}>
                                            <div className={styles.showingItemDiv}>
                                                <p className={styles.showingItemIcon}>👉</p>
                                            </div>
                                            <div className={styles.showingItemDetails}>
                                                <p className={styles.showingItemTitle}>{item.repoName}</p>
                                                <p className={styles.showingItemTime}>
                                                    {item.title}
                                                </p>
                                            </div>
                                        </div>
                                        <p className={styles.showingItemPrice}>{item.user}</p>
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

export default Dashboard;