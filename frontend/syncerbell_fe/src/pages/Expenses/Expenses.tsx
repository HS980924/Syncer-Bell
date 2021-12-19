import styles from './Expenses.module.scss';
import personOne from '../../assets/png/person1.png';
import personTwo from '../../assets/png/person2.png';
import personThree from '../../assets/png/person3.png';
import addIcon from '../../assets/png/addIcon.png';
import {Bar, BarChart, Cell, ResponsiveContainer} from 'recharts';
import {useState} from 'react';
import optionIcon from '../../assets/png/menuIcon.png';
import cartIcon from '../../assets/svg/cartIcon.svg';
import transportIcon from '../../assets/svg/transportIcon.svg';
import houseIcon from '../../assets/svg/houseIcon.svg';

export default function Expenses() {

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
        }
    ];

    const todayExpense_dummy = [
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
        }
    ]

    const spendCategories = [
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
                    <div className={styles.expensesActions}>
                        <div className={styles.personImages}>
                            <img className={styles.personOne} src={personOne} alt="person one"/>
                            <img className={styles.personTwo} src={personTwo} alt="person two"/>
                            <img className={styles.personThree} src={personThree} alt="person three"/>
                        </div>
                        <button>
                            <img className={styles.addIcon} src={addIcon} alt="add"/>
                        </button>
                    </div>
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
                                ? "rgb(21,122,255)"
                                : "rgba(21,122,255,.2)"}
                                key={index}
                            />
                        ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>

                <div className={styles.expensesOverviewHeader}>
                    <p className={styles.expensesOverviewTitle}>Today</p>
                    <button>
                        <img className={styles.expenseOption} src={optionIcon} alt="options"/>
                    </button>
                </div>

                <ul>
                    {todayExpense_dummy.map((expense) => (
                        <li className={styles.expenseItem} key={expense.id}>
                            <div className={styles.expenseItemLeft}>
                                <div 
                                    style={{backgroundColor: expense.iconBackgroundColor}}
                                    className={styles.expenseItemDiv}
                                >
                                    <img src={cartIcon} alt={expense.expense}/>
                                </div>
                                <div className={styles.expenseItemDetails}>
                                    <p className={styles.expenseItemTitle}>{expense.expense}</p>
                                    <p className={styles.expenseItemTime}>
                                        {expense.time} . {expense.location}
                                    </p>
                                </div>
                            </div>
                            <p className={styles.expenseItemPrice}>{expense.price}</p>
                        </li>
                    ))}
                    
                </ul>

                <div className={styles.expensesOverviewHeader}>
                    <p className={styles.expensesOverviewTitle}>4th week, December, 2021</p>
                    <button>
                        <img className={styles.expenseOption} src={optionIcon} alt="options"/>
                    </button>
                </div>

                <ul>
                    {todayExpense_dummy.map((expense) => (
                        <li className={styles.expenseItem} key={expense.id}>
                            <div className={styles.expenseItemLeft}>
                                <div 
                                    style={{backgroundColor: expense.iconBackgroundColor}}
                                    className={styles.expenseItemDiv}
                                >
                                    <img src={cartIcon} alt={expense.expense}/>
                                </div>
                                <div className={styles.expenseItemDetails}>
                                    <p className={styles.expenseItemTitle}>{expense.expense}</p>
                                    <p className={styles.expenseItemTime}>
                                        {expense.time} . {expense.location}
                                    </p>
                                </div>
                            </div>
                            <p className={styles.expenseItemPrice}>{expense.price}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <section className={styles.sideOverview}>
                <p className={styles.sideOverviewTitle}>Weekend Statics</p>
                <ul>
                    {spendCategories.map((category) => (
                        <li key={category.id}>
                            <div className={styles.spendCategory}>
                                <p className={styles.spendCategoryName}>{category.category}</p>
                                <p className={styles.spendCategoryPrice}>{category.entity}</p>
                            </div>
                            <div className={styles.spendCategoryBar}>
                                <div 
                                    style={{width:`${category.entity}%`}}
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