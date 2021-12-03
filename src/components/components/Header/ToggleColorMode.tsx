import React, {useContext} from 'react';
import {Box, IconButton, useTheme} from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import {ColorModeContext} from "../../../App";


const ToggleTheme = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    return (
        <Box
            // sx={{
            //     display: 'flex',
            //     width: '100%',
            //     alignItems: 'center',
            //     justifyContent: 'center',
            //     bgcolor: 'background.default',
            //     color: 'text.primary',
            //     borderRadius: 1,
            //     p: 3,
            // }}
        >
            <IconButton sx={{ml: 1}} onClick={colorMode.toggleColorMode} color="inherit">
                {
                    theme.palette.mode === 'dark' ?
                        <Brightness7Icon fontSize={'large'}/>:
                        <Brightness4Icon fontSize={'large'}/>
                }
            </IconButton>
        </Box>
    );
}

export default ToggleTheme;