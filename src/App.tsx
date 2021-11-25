import React, {useState} from 'react';

import Auth from "./components/auth";
import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";


function App() {
    const {user, getAccessTokenSilently} = useAuth0();

    const [t, setT] = useState<string>('test');

    const showToken = async () => {
        // const t = await getAccessTokenSilently();
        const t = await getAccessTokenSilently();
        setT(t);
    }

    const request = async () => {

        const url = `${process.env.REACT_APP_SERVER_URL}/cats`;
        console.log(url);
        const res = await axios.post(url,
            {name: 'Lisa', age: 4, breed: 'afsdvfb'},
            {
                headers: {
                    Authorization: `Bearer ${t}`
                }
            }
        );
        console.log(res.data);
    }

    return (
        <div>
            <div>Name: {user?.name}</div>
            <div>Email: {user?.email}</div>
            <Auth/>
            <div>{t}</div>
            <button onClick={showToken}>token</button>
            <button onClick={request}>request</button>
        </div>
    );
}

export default App;
