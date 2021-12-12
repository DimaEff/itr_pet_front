import React, {FC} from 'react';
import {useTheme} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";


interface MapIconContainerProps {
    disabled: boolean;
}

const MapIconContainer: FC<MapIconContainerProps> = ({children, disabled}) => {
    const theme = useTheme();

    const style = {
        opacity: disabled ? '0.5': '1',
        color: theme.palette?.mode === 'dark' ? '#f39a1c': '#000',
    };

    return <span style={style}>
        {children}
    </span>
};

export default MapIconContainer;