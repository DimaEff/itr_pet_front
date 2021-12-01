import React, {useState} from 'react';
import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";

import Auth from "./components/auth";


function App() {
    const {user, getAccessTokenSilently} = useAuth0();

    const baseUrl = process.env.REACT_APP_SERVER_URL;

    const [users, setUsers] = useState<any[]>([]);

    const getAllUsers = async () => {
        const token = await getAccessTokenSilently();
        if (!token) return;

        const res = await axios.get(
            baseUrl + '/admin/users',
            {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            }
        );
        console.log(res.data);
        setUsers(res.data);
    }

    const testFetch = async () => {
        const token = await getAccessTokenSilently();
        if (!token) return;

        const res = await axios.put(
            baseUrl + '/users/update',
            {data: {name: 'Dima'}},
            {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            }
        );
        console.log(res.data)
    }

    const setBlockUser = async (uid: string, isBlocked: boolean) => {
        const token = await getAccessTokenSilently();
        if (!token) return;

        const res = await axios.put(
            baseUrl + '/admin/users/block',
            {uid, isBlocked},
            {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            }
        );
        console.log(res.data);
    }

    const showToken = async () => {
        const token = await getAccessTokenSilently();
        console.log(token);
    }

    const deleteUser = async (uid: string) => {
        const token = await getAccessTokenSilently();
        if (!token) return;

        const res = await axios.delete(
            baseUrl + `/admin/users/${uid}`,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            }
        );
        console.log(res.data);
    }

    return (
        <div>
            <div>Name: {user?.name}</div>
            <div>Email: {user?.email}</div>
            <div>Nickname: {user?.nickname}</div>
            <Auth/>
            <button onClick={testFetch}>Set new name</button>
            <button onClick={showToken}>Show token</button>
            <button onClick={getAllUsers}>Fetch users</button>

            <div>
                {users.map(u => <div style={{border: '1px solid', borderColor: u.blocked ? 'red': 'green'}}>
                    <span>{u.user_id}</span>
                    <span>{u.name}</span>
                    <span>{u.blocked}</span>
                    {
                        u.blocked ?
                            <button
                                onClick={() => setBlockUser(u.user_id, false)}
                            >
                                Unblock user
                            </button>:
                            <button
                                onClick={() => setBlockUser(u.user_id, true)}
                            >
                                Block user
                            </button>
                    }
                    <button onClick={() => deleteUser(u.user_id)}>Delete user</button>
                </div>)}
            </div>

        </div>
    );
}

export default App;
