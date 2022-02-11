import React, {FC} from 'react';
import {Box} from "@mui/material";


interface MapIconContainerProps {
    disabled?: boolean;
}

const MapBarItem: FC<MapIconContainerProps> = ({children, disabled}) => {
    return <Box
        sx={
            (theme) => ({
                opacity: disabled ? '0.5' : '1',
                color: theme.palette?.mode === 'dark' ? '#f39a1c' : '#5ea55e',
                textAlign: 'center',
            })
        }
    >
        {children}
    </Box>
};

export default MapBarItem;