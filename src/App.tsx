import React, {createContext, useEffect} from 'react';
import {Box} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import {Link, useRoutes} from 'react-router-dom';

import {useMenu, useRoles, useTheme, useTokenForRequests} from './hooks';
import {getRoutes} from './routing';
import {AppWrapper, Container} from "./components/common/Containers";
import {Header} from "./components/Header";
import {useAuth0} from "@auth0/auth0-react";
import {eventsStore, eventTypesStore} from "./store";


export const ColorModeContext = createContext({
    toggleColorMode: () => {
    }
});

const App = () => {
    // init app
    useEffect(() => {
        eventsStore.subscribe();
        eventTypesStore.fetchEventTypes();

        return eventsStore.unsubscribe;
    }, [])

    const mainMenuRoutes = useMenu(['main']);
    const allMenuRoutes = useMenu();

    const {isAuthenticated} = useAuth0();
    const {isAdmin} = useRoles()

    const element = useRoutes(getRoutes(isAuthenticated, isAdmin));

    // set auth0_token to local storage 'auth0_token'
    useTokenForRequests();
    const {colorMode, theme} = useTheme();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <AppWrapper>
                    <Header/>
                    <Container>
                        <Box>
                            {mainMenuRoutes.map(r => <Link key={r.path} to={r.path}>{r.label}</Link>)}
                            {allMenuRoutes.map(r => <Link key={r.path} to={r.path}>{r.label}</Link>)}
                        </Box>
                        {element}
                    </Container>
                </AppWrapper>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;