import React, {createContext, useState} from 'react';
import {ThemeProvider} from '@mui/material/styles';
import {observer} from "mobx-react-lite";

import {useTheme, useTokenForRequests, useUserRoles} from './hooks';
import {adminStore} from './store';
import {Container, AppWrapper} from "./components/components/common/Containers";
import {Header} from "./components/components/Header";
import {Button} from "./components/components/common/Buttons";


export const ColorModeContext = createContext({
    toggleColorMode: () => {
    }
});

const App = () => {
    useTokenForRequests();
    const {colorMode, theme} = useTheme();
    const getRoles = useUserRoles();

    const fetchUsers = async () => {
        await adminStore.setAllUsers();
        // const roles = await getRoles();
        // console.log(roles);
    }

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <AppWrapper>
                    <Header/>
                    <Container>
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