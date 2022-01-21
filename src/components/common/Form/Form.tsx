import React, {FC} from 'react';
import {Stack} from "@mui/material";


interface FormProps {
    id?: string;
    handleSubmit: () => void;
}

const Form: FC<FormProps> = ({children, handleSubmit, id}) => {
    return (
        <form id={id} onSubmit={handleSubmit}>
            <Stack spacing={1}>
                {children}
            </Stack>
        </form>
    );
};

export default Form;