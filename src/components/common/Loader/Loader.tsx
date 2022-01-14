import React, {FC, forwardRef} from 'react';
import {CircularProgress, CircularProgressProps, useTheme, Backdrop} from '@mui/material';


interface LoaderProps extends CircularProgressProps{
    secondary?: boolean;
    withBackdrop?: boolean;
}

const Loader: FC<LoaderProps> = forwardRef(({secondary, withBackdrop, ...props}, ref) => {
    const theme = useTheme();

    const light = secondary ? '#fff': theme.palette.primary.main;

    const circle = <CircularProgress
        sx={{
        color: (theme) => theme.palette.mode === 'dark' ?  '#fff': light,
        }}
        ref={ref}
        {...props}
    />;

    return <>
        {
            withBackdrop ?
                <Backdrop open={true} sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                    {circle}
                </Backdrop>:
                circle
        }
    </>;
});

export default Loader;