import React, {FC, forwardRef} from 'react';
import {Box, IconButton as MIconButton, IconButtonProps as MIconButtonProps} from '@mui/material';


interface IconButtonProps extends MIconButtonProps {

}

const IconButton: FC<IconButtonProps> = forwardRef(({children, ...props}, ref) => {
    return (
        <MIconButton ref={ref} {...props}>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                {children}
            </Box>
        </MIconButton>
    );
});

export default IconButton;