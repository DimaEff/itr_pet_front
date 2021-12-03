import React, {FC, forwardRef} from 'react';
import {Button as MButton, ButtonProps as MButtonProps} from '@mui/material';


interface ButtonProps extends MButtonProps {

}

const Button: FC<ButtonProps> = forwardRef(({children, ...props}, ref) => {
    return (
        <MButton variant={"outlined"} ref={ref} {...props}>
            {children}
        </MButton>
    );
});

export default Button;