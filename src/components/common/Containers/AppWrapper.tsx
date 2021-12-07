import React, {FC} from 'react';
import {Box} from "@mui/material";


const AppWrapper: FC = ({children}) => {
    return (
        <Box sx={{
            position: 'relative',
            overflowX: 'hidden',
            width: '100vw',
            height: '100vh',
            bgcolor: 'background.default',
            color: 'text.primary',
        }}>
            {children}
        </Box>
    );
};

export default AppWrapper;