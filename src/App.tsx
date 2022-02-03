import React, {createContext, useEffect} from 'react';
import {ThemeProvider} from '@mui/material/styles';
import {useRoutes} from 'react-router-dom';
import {useAuth0} from "@auth0/auth0-react";

import {useRoles, useTheme, useTokenForRequests} from './hooks';
import {getRoutes} from './routing';
import {AppWrapper, Container} from "./components/common/Containers";
import {Header} from "./components/Header";
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
                        {element}
                    </Container>
                </AppWrapper>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;