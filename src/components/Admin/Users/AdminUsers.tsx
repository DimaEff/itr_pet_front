import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Grid} from "@mui/material";

import {adminStore} from "../../../store";
import User from "./User";


const AdminUsers = observer(() => {
    useEffect(() => {
        adminStore.fetchUsers();
    }, [])

    return (
        <Grid container m={1} spacing={2}>
            {adminStore.users.map(u => <Grid key={u.email} md={6} item>
                <User user={u}/>
            </Grid>)}
        </Grid>
    );
});

export default AdminUsers;