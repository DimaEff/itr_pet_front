import React, {FC, forwardRef} from 'react';
import {LoadingButton, LoadingButtonProps} from '@mui/lab';


interface ButtonProps {
}

const Button: FC<ButtonProps & LoadingButtonProps> = forwardRef(({children, ...props}, ref) => {
    return (
        <LoadingButton variant={"outlined"} ref={ref} {...props}>
            {children}
        </LoadingButton>
    );
});

export default Button;