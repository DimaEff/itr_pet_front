import React, {FC} from 'react';
import {Box} from "@mui/material";


const MenuAbove: FC = ({children}) => {
    return (
        <Box sx={{
            position: 'absolute',
            top: 0,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            height: '98%',
            backgroundColor: 'rgba(0, 0, 0, .2)',
            '>*': {
                fontSize: '70px',
                cursor: 'pointer',
            },
        }}>
            {children}
        </Box>
    );
};

export default MenuAbove;