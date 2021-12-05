import React, {createContext} from 'react';
import {Alert, Box} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import {observer} from "mobx-react-lite";
import {Link} from 'react-router-dom';

import {useTheme, useTokenForRequests, useUserRoles} from './hooks';
import {adminStore} from './store';
import {Container, AppWrapper} from "./components/components/common/Containers";
import {Header} from "./components/components/Header";
import {Button} from "./components/components/common/Buttons";
import AppRouter from "./appRouter/AppRouter";


export const ColorModeContext = createContext({
    toggleColorMode: () => {
    }
});

const App = () => {
    useTokenForRequests();
    const {colorMode, theme} = useTheme();
    const roles = useUserRoles();

    const fetchUsers = async () => {
        // await adminStore.setAllUsers();
        console.log(roles);
    }

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <AppWrapper>
                    <Header/>
                    <Container>
                        <Box>
                            <Link to={'/'}>Home</Link>
                            <Link to={'admin'}>Admin</Link>
                        </Box>
                        <AppRouter />
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