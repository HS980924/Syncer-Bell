import React from 'react'
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
            const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
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
            <ul>
                <li key={users.id}>
                    {users.title}
                </li>
            </ul>

            <button onClick={fetchUsers}>Reload</button>
        </>
    )
}

export default Leftside_data;
