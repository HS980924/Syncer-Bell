import styles from './Dashboard.module.scss';
import {Bar, BarChart, Cell, ResponsiveContainer} from 'recharts';
import {useState} from 'react';
import optionIcon from '../../assets/png/menuIcon.png';
import cartIcon from '../../assets/svg/cartIcon.svg';
import transportIcon from '../../assets/svg/transportIcon.svg';
import houseIcon from '../../assets/svg/houseIcon.svg';

export default function Dashboard() {

    const [activeIndex, setActiveIndex] = useState(0);
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
            uv: 5000,
            pv: 9800,
            amt: 2290
        }, {
            name: 'Page D',
            uv: 4780,
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
            uv: 6000,
            pv: 3800,
            amt: 2500
        }, {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100
        }
    ];

    const issue_dummy = [
        {
            id:1,
            expense: "Dummy01",
            time: "5:12 PM",
            location: "Repo : syncer-bell",
            price: 326.8,
            icon: cartIcon,
            iconBackgroundColor: "#32a7e2",
        },
        {
            id:2,
            expense: "Dummy02",
            time: "5:12 PM",
            location: "Repo : syncer-bell",
            price: 326.8,
            icon: transportIcon,
            iconBackgroundColor: "#B548C6",
        },
        {
            id:3,
            expense: "Dummy03",
            time: "5:12 PM",
            location: "Repo : syncer-bell",
            price: 326.8,
            icon: houseIcon,
            iconBackgroundColor: "#FF8700",
        },
        {
            id:4,
            expense: "Dummy02",
            time: "5:12 PM",
            location: "Repo : syncer-bell",
            price: 326.8,
            icon: transportIcon,
            iconBackgroundColor: "#B548C6",
        },
        {
            id:5,
            expense: "Dummy03",
            time: "5:12 PM",
            location: "Repo : syncer-bell",
            price: 326.8,
            icon: houseIcon,
            iconBackgroundColor: "#FF8700",
        }
    ]

    const pullRequest_dummy = [
        {
            id:1,
            expense: "Dummy01",
            time: "5:12 PM",
            location: "Repo : syncer-bell",
            price: 326.8,
            icon: cartIcon,
            iconBackgroundColor: "#32a7e2",
        },
        {
            id:2,
            expense: "Dummy02",
            time: "5:12 PM",
            location: "Repo : syncer-bell",
            price: 326.8,
            icon: transportIcon,
            iconBackgroundColor: "#B548C6",
        },
        {
            id:3,
            expense: "Dummy03",
            time: "5:12 PM",
            location: "Repo : syncer-bell",
            price: 326.8,
            icon: houseIcon,
            iconBackgroundColor: "#FF8700",
        },
        {
            id:4,
            expense: "Dummy02",
            time: "5:12 PM",
            location: "Repo : syncer-bell",
            price: 326.8,
            icon: transportIcon,
            iconBackgroundColor: "#B548C6",
        },
        {
            id:5,
            expense: "Dummy03",
            time: "5:12 PM",
            location: "Repo : syncer-bell",
            price: 326.8,
            icon: houseIcon,
            iconBackgroundColor: "#FF8700",
        }
    ]

    const year_statics = [
        {
            id:1,
            category: "Commit",
            entity:50,
        },
        {
            id:2,
            category: "Pull Request",
            entity:10,
        },
        {
            id:3,
            category: "Issue",
            entity:15,
        },
        {
            id:4,
            category: "Todays's Commit",
            entity:36,
        },
    ]

    const onMouseOver = (data : any, index : number) => setActiveIndex(index);

    return ( <> <main className={styles.expenses}>
        <div className={styles.expensesCard}>
            <section className={styles.expensesOverview}>
                <div className={styles.expensesHeader}>
                    <p className={styles.expensesTitle}>Syncer-Bell</p>
                </div>
                <p className={styles.dataRange}>01 - 31, December, 2021</p>
                <ResponsiveContainer width="100%" height="9%">
                    <BarChart data={data}>
                        <Bar 
                            dataKey="uv" 
                            fill="rgba(21,122,255,.2)" 
                            onMouseOver={onMouseOver}>
                            {data.map((entry, index) => (
                            <Cell
                                cursor="pointer"
                                fill={index === activeIndex
                                ? "rgb(0,255,69)"
                                : "rgba(0,255,69,.2)"}
                                key={index}
                            />
                        ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>

                <div className={styles.expensesOverviewHeader}>
                    <p className={styles.expensesOverviewTitle}>Issue</p>
                    <button>
                        <img className={styles.expenseOption} src={optionIcon} alt="options"/>
                    </button>
                </div>

                <ul>
                    {issue_dummy.map((item) => (
                        <li className={styles.expenseItem} key={item.id}>
                            <div className={styles.expenseItemLeft}>
                                <div 
                                    style={{backgroundColor: item.iconBackgroundColor}}
                                    className={styles.expenseItemDiv}
                                >
                                    <img src={cartIcon} alt={item.expense}/>
                                </div>
                                <div className={styles.expenseItemDetails}>
                                    <p className={styles.expenseItemTitle}>{item.expense}</p>
                                    <p className={styles.expenseItemTime}>
                                        {item.time} . {item.location}
                                    </p>
                                </div>
                            </div>
                            <p className={styles.expenseItemPrice}>{item.price}</p>
                        </li>
                    ))}
                    
                </ul>

                <div className={styles.expensesOverviewHeader}>
                    <p className={styles.expensesOverviewTitle}>Pull Request</p>
                    <button>
                        <img className={styles.expenseOption} src={optionIcon} alt="options"/>
                    </button>
                </div>

                <ul>
                    {pullRequest_dummy.map((item) => (
                        <li className={styles.expenseItem} key={item.id}>
                            <div className={styles.expenseItemLeft}>
                                <div 
                                    style={{backgroundColor: item.iconBackgroundColor}}
                                    className={styles.expenseItemDiv}
                                >
                                    <img src={cartIcon} alt={item.expense}/>
                                </div>
                                <div className={styles.expenseItemDetails}>
                                    <p className={styles.expenseItemTitle}>{item.expense}</p>
                                    <p className={styles.expenseItemTime}>
                                        {item.time} . {item.location}
                                    </p>
                                </div>
                            </div>
                            <p className={styles.expenseItemPrice}>{item.price}</p>
                        </li>
                    ))}
                </ul>
            </section>
            
            <section className={styles.sideOverview}>
                <p className={styles.sideOverviewTitle}>2021's Statics</p>
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
            </section>
        </div>
    </main> 
    </>
    )
}