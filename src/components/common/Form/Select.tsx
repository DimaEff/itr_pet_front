import React, {FC} from 'react';
import {Controller} from 'react-hook-form';
import {Select as MuiSelect, SelectProps as MuiSelectProps} from '@mui/material';

import {WithControlProps} from "./types";


interface SelectProps {
}

const Select: FC<SelectProps & WithControlProps & MuiSelectProps> = (
    {
        children,
        name,
        control,
        ...props
    }) => {

    return (
        <>
            <Controller
                name={name}
                control={control}
                defaultValue={''}
                render={({field}) => <MuiSelect
                    {...props}
                    {...field}
                >
                    {children}
                </MuiSelect>}
            />
        </>
    );
};

export default Select;