import React, {useContext} from 'react';
import {Box, IconButton, useTheme} from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import {ColorModeContext} from "../../App";


const ToggleTheme = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    return (
        <Box>
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