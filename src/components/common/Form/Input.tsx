import React, {FC, forwardRef} from 'react';
import {TextField, BaseTextFieldProps} from '@mui/material';


interface InputProps extends BaseTextFieldProps {
    register: any;
}

const Input: FC<InputProps> = forwardRef(({children, register, ...props}, ref) => {

    return <TextField variant={'outlined'} autoComplete={'off'} {...register} {...props}/>
});

export default Input;