import * as React from 'react';
import {AppBar, Toolbar, Container, Typography} from '@mui/material';
import {useAuth0} from "@auth0/auth0-react";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';

import ToggleTheme from "./ToggleColorMode";
import UserProfile from "./UserProfile";
import {Loader} from "../common/Loader";
import {IconButton} from "../common/Buttons";


const ResponsiveAppBar = () => {
    const {isAuthenticated, isLoading, loginWithPopup} = useAuth0();

    return (
        <AppBar position="static" sx={{boxShadow: 'none'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}
                        flexGrow={1}
                    >
                        Interesting Map
                    </Typography>
                    <ToggleTheme/>
                    {isLoading && <Loader secondary/>}
                    {
                        isAuthenticated ?
                            <UserProfile/>:
                            <IconButton onClick={loginWithPopup}>
                                <ExitToAppRoundedIcon fontSize={'large'}/>
                            </IconButton>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
