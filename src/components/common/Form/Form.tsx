import React, {FC, Children} from 'react';
import {Box} from "@mui/material";


interface FormProps {
    handleSubmit: () => void;
}

const Form: FC<FormProps> = ({children, handleSubmit}) => {
    const childrenArray = Children.toArray(children);

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{'>*': {marginBottom: 1}}}>
                {children}
            </Box>
        </form>
    );
};

export default Form;