import React from 'react'
import styles from '../Sidebar/Sidebar.module.scss';
import {FaChild, FaCode} from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from "axios";

export let userGit;
export let userData;

function Leftside_data() {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(null);
    const [errors, setError] = useState(null);

    // let USER = JSON.parse(JSON.parse(JSON.stringify(window.localStorage.getItem("userProfile"))));
    // setUsers(USER);
    const fetchUsers = async()=>{
        try{
            setUsers(null);
            const res = await axios.get('/home');
            setUsers(res.data);
            window.localStorage.setItem("userProfile", JSON.stringify(res.data));
        } catch(e) {
            setError(e);
        }
        setLoading(false);
    };

    useEffect(()=>{
        fetchUsers();
    }, []);

    
    if (loading) return <h3 className={styles.msg}>Loading.....</h3>;
    if (errors) return <h3 className={styles.msg}>Error!!</h3>;
    if (!users) return null;
    
    const url = users.blog;
    userGit = users.url;
    userData = users;

    return(
        <>
            <div className={styles.profileDetails}>
                <div className={styles.profileImageDiv}>
                    <img className={styles.profiileImage} src={users.image} alt={users.image}/>
                </div>
                <div className={styles.userInfoWrapper}>
                    <p key={users.name} className={styles.userName}>{users.name}</p>
                    <p key={users.login} className={styles.userNickname}>{users.login}</p>
                    <p key={
                        users.email === null ? 
                        users.company : 
                        users.email} 
                        className={styles.userEmail}>
                            {users.email === null ? users.company : users.email}
                    </p>
                    <p key={users.context} className={styles.userContext}>{users.context}</p>
                    <ul className={styles.userInfoDetails}>
                        <li>
                            <FaChild className={styles.sectionIcon}/>
                            <p key={users.followers}><b>{users.followers}</b> flollowers ㆍ</p>
                            <p key={users.following}><b>{users.following}</b> followings</p>
                        </li>
                        <li>
                            <FaCode className={styles.sectionIcon}/>
                            <p 
                                className={styles.sectionLink}
                                key={users.blog}
                                onClick={()=> {
                                    window.open(url, '_blank')
                                }}>
                                    {userGit}
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Leftside_data;