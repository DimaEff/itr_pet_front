import React, {FC, Children} from 'react';
import {Box} from "@mui/material";


interface FormProps {
    id?: string;
    handleSubmit: () => void;
}

const Form: FC<FormProps> = ({children, handleSubmit, id}) => {
    const childrenArray = Children.toArray(children);

    return (
        <form id={id} onSubmit={handleSubmit}>
            <Box sx={{'>*': {marginBottom: 1}}}>
                {children}
            </Box>
        </form>
    );
};

export default Form;