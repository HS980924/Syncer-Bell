import React from 'react'
import styles from '../Sidebar/Sidebar.module.scss';
import {FaChild, FaCode} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from "axios";

function Leftside_data() {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState(null);

    const fetchUsers = async()=>{
        try{
            setError(null);
            setUsers(null);
            setLoading(true);
            const res = await axios.get('/home');
            setUsers(res.data);
        } catch(e) {
            setError(e);
        }
        setLoading(false);
    };

    useEffect(()=>{
        fetchUsers();
    }, []);

    if (loading) return <h3>Loading.....</h3>;
    if (errors) return <h3>Error!!</h3>;
    if (!users) return null;

    return (
        <>
            <div className={styles.profileDetails}>
                <div className={styles.profileImageDiv}>
                    <image src={users.image}/>
                </div>
                <div className={styles.userInfoWrapper}>
                    <p key={users.name} className={styles.userName}>{users.name}</p>
                    <p key={users.login} className={styles.userNickname}>{users.login}</p>
                    <p key={users.context} className={styles.userContext}>{users.context}</p>
                    <p key={
                        users.email === null ? 
                        users.company : 
                        users.email} 
                        className={styles.userEmail}>
                            {users.email === null ? users.company : users.email}
                    </p>
                    <ul className={styles.userInfoDetails}>
                        <li>
                            <FaChild className={styles.sectionIcon}/>
                            <p key={users.followers}><b>{users.followers}</b> flollowers ㆍ</p>
                            <p key={users.following}><b>{users.following}</b> followings</p>
                        </li>
                        <li>
                            <FaCode className={styles.sectionIcon}/>
                            <p className={styles.sectionLink} key={users.blog} onClick={()=> {
                                window.location.href = "users.blog";
                                return null;
                            }}>{users.blog}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Leftside_data;