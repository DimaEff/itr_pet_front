import React, {FC, MouseEvent, useState} from 'react';
import {Avatar, Box, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";

import {useMenu} from '../../hooks';
import {Menus} from '../../routing';
import {IconButton} from "../common/Buttons";


interface UserProfileProps {
}

const UserProfile: FC<UserProfileProps> = () => {
    const {user, logout} = useAuth0();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    // const userRoutes = useMenu();
    // const adminRoutes = useMenu([Menus.Admin]);

    const handleOpen = (e: MouseEvent<HTMLElement>) => {
        setAnchorElUser(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorElUser(null);
    }

    return (
        <Box>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpen} sx={{p: 0}}>
                    <Avatar alt={user?.name} src={user?.picture}/>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{mt: '45px'}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => logout({ returnTo: window.location.origin })}>
                    <Typography textAlign="center">Log Out</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default UserProfile;