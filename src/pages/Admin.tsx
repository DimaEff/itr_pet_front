import React from 'react';
import {Outlet} from "react-router-dom";
import {Box} from "@mui/material";

import {Admin as A} from '../components/Admin';


const Admin = () => {
    return (
        <Box>
            <A/>
            <Outlet/>
        </Box>
    );
};

export default Admin;