import * as React from 'react';
import {AppBar, Toolbar, Container, Box} from '@mui/material';
import {useAuth0} from "@auth0/auth0-react";

import ToggleTheme from "./ToggleColorMode";
import {Loader} from "../common/Loader";
import Auth from "./Auth";
import {Link} from "../common/Link";


const ResponsiveAppBar = () => {
    const {isLoading} = useAuth0();

    return (
        <AppBar position="static" sx={{boxShadow: 'none'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            flexGrow: 1,
                        }}
                    >
                        <Link to={'/'} variant={"h6"}>
                            Interesting Map
                        </Link>
                    </Box>
                    <ToggleTheme/>
                    {isLoading ?
                        <Loader secondary/> :
                        <Auth/>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
