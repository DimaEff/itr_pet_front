import React, {FC, forwardRef} from 'react';
import {CircularProgress, CircularProgressProps, useTheme, colors} from '@mui/material';


interface LoaderProps extends CircularProgressProps{
    secondary?: boolean;
}

const Loader: FC<LoaderProps> = forwardRef(({secondary, ...props}, ref) => {
    const theme = useTheme();

    const light = secondary ? '#fff': theme.palette.primary.main;

    return <CircularProgress
        sx={{
            color: theme.palette.mode === 'dark' ?  '#fff': light,
        }}
        ref={ref}
        {...props}
    />;
});

export default Loader;