import * as React from 'react';
import {AppBar, Toolbar, Container, Typography} from '@mui/material';
import {useAuth0} from "@auth0/auth0-react";

import ToggleTheme from "./ToggleColorMode";
import {Loader} from "../common/Loader";
import Auth from "./Auth";


const ResponsiveAppBar = () => {
    const {isLoading} = useAuth0();

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
                    {isLoading ?
                        <Loader secondary/>:
                        <Auth />
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
