import React, {createContext} from 'react';
import {Box} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import {observer} from "mobx-react-lite";
import {Link, useRoutes} from 'react-router-dom';

import {useMenu, useRoles, useTheme, useTokenForRequests} from './hooks';
import {adminStore} from './store';
import {getRoutes} from './routing';
import {Container, AppWrapper} from "./components/common/Containers";
import {Header} from "./components/Header";
import {Button} from "./components/common/Buttons";
import {useAuth0} from "@auth0/auth0-react";


export const ColorModeContext = createContext({
    toggleColorMode: () => {
    }
});

const App = () => {
    const mainMenuRoutes = useMenu(['main']);
    const allMenuRoutes = useMenu();

    const {isAuthenticated} = useAuth0();
    const {isAdmin} = useRoles()

    const routes = useRoutes(getRoutes(isAuthenticated, isAdmin));

    useTokenForRequests();
    const {colorMode, theme} = useTheme();

    const fetchUsers = async () => {
        // await adminStore.setAllUsers();
    }

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <AppWrapper>
                    <Header/>
                    <Container>
                        <Box>
                            {mainMenuRoutes.map(r => <Link to={r.path}>{r.label}</Link>)}
                            {allMenuRoutes.map(r => <Link to={r.path}>{r.label}</Link>)}
                        </Box>
                        {routes}
                        <Button onClick={fetchUsers}>
                            Get all users
                        </Button>
                        {adminStore.users.map(u => <div key={u.user_id}>
                            <Button onClick={() => console.log(u.user_id)}>
                                {u.user_id}
                            </Button>
                            <span>{u.name}</span>|
                            <span>{u.email}</span>|
                            <span>{u.nickname}</span>
                        </div>)}
                    </Container>
                </AppWrapper>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default observer(App);