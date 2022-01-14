import React from 'react';
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import {useAuth0} from "@auth0/auth0-react";

import {IconButton} from "../common/Buttons";
import UserMenu from "./UserMenu";


const Auth = () => {
    const {isAuthenticated, loginWithPopup} = useAuth0();

    return (
        <>
            {
                isAuthenticated ?
                    <UserMenu/>:
                    <IconButton onClick={loginWithPopup}>
                        <ExitToAppRoundedIcon fontSize={'large'}/>
                    </IconButton>
            }
        </>
    );
};

export default Auth;