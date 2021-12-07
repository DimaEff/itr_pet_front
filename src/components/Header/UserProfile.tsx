import React, {FC, MouseEvent, useState} from 'react';
import {Avatar, Box, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";

import {IconButton} from "../common/Buttons";
import {useMenu} from "../../hooks";
import {Link} from "react-router-dom";


interface UserProfileProps {
}

const UserProfile: FC<UserProfileProps> = () => {
    const {user, logout} = useAuth0();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const userMenuRoutes = useMenu(['user']);
    const adminMenuRoutes = useMenu(['admin']);

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
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleClose}
            >
                {
                    userMenuRoutes.map(({path, label}) => <MenuItem key={path}>
                        <Link to={path}>{label}</Link>
                    </MenuItem>)
                }
                {
                    adminMenuRoutes.map(({path, label}) => <MenuItem key={path}>
                        <Link to={path}>{label}</Link>
                    </MenuItem>)
                }
                <MenuItem onClick={() => logout({returnTo: window.location.origin})}>
                    <Typography textAlign="center">Log Out</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default UserProfile;