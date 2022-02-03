import React from 'react';
import {Outlet, useLocation} from "react-router-dom";
import {Box, Stack} from "@mui/material";

import {useMenu} from "../hooks";
import {Link} from "../components/common/Link";
import {Button} from "../components/common/Buttons";


const Admin = () => {
    const adminMenu = useMenu(['admin.children'], true);
    const {pathname} = useLocation()

    return (
        <Box>
            <Stack m={1} spacing={1} direction={'row'}>
                {adminMenu.map(({label, path}) => <Link
                    key={path}
                    to={path}
                    wrapperComponent={Button}
                    wrapperProps={{
                        variant: pathname.includes(path) ? 'contained': 'outlined',
                    }}
                >
                    {label}
                </Link>)}
            </Stack>
            <Outlet/>
        </Box>
    );
};

export default Admin;