import React, {FC, forwardRef} from 'react';
import {IconButton as MIconButton, IconButtonProps as MIconButtonProps} from '@mui/material';


interface IconButtonProps extends MIconButtonProps {

}

const IconButton: FC<IconButtonProps> = forwardRef(({children, ...props}, ref) => {
    return (
        <MIconButton ref={ref} {...props}>
            <div>
                {children}
            </div>
        </MIconButton>
    );
});

export default IconButton;