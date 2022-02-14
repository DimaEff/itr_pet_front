import React, {FC, MouseEvent, useState} from 'react';
import {Avatar, Box, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";

import {IconButton} from "../common/Buttons";
import {useMenu, useRoles} from "../../hooks";
import {Link} from "../common/Link";


interface UserProfileProps {
}

const UserMenu: FC<UserProfileProps> = () => {
    const {user, logout} = useAuth0();
    const {isAdmin} = useRoles();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const userMenuRoutes = useMenu(['user']);
    const adminMenuRoutes = useMenu(['admin']);

    const handleOpen = (e: MouseEvent<HTMLElement>) => {
        setAnchorElUser(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorElUser(null);
    }

    const getOptions = (path: string) => ({
        onNavigate: handleClose,
        key: path,
        to: path,
        wrapperComponent: MenuItem
    });

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
                    userMenuRoutes
                        .map(({path, label}) => <Link {...getOptions(path)}>
                            {label}
                        </Link>)
                }
                {
                    isAdmin && adminMenuRoutes
                        .map(({path, label}) => <Link {...getOptions(path)}>
                            {label}
                        </Link>)
                }
                <MenuItem onClick={() => logout({returnTo: window.location.origin})}>
                    <Typography textAlign="center">Log Out</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default UserMenu;