import React from 'react';
import {useAuth0} from "@auth0/auth0-react";
import LogOut from "./LogOut";
import LoginButton from "./LoginButton";


const Auth = () => {
    const {isAuthenticated, isLoading} = useAuth0();

    return (
        <div>
            {isAuthenticated ?
                <LogOut />:
                <LoginButton />
            }
            {isLoading && <div>Loading...</div>}
        </div>
    );
};

export default Auth;