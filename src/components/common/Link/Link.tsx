import React, {FC} from 'react';
import {useNavigate, NavigateProps} from 'react-router-dom';
import {Typography, TypographyProps} from "@mui/material";


interface LinkProps {

}

const Link: FC<LinkProps & NavigateProps & TypographyProps> = (
    {children,
        to,
        sx,
        ...props
    }) => {
    const navigate = useNavigate();

    return (
        <Typography
            sx={{
                cursor: 'pointer',
                ...sx,
            }}
            onClick={() => navigate(to)}
            variant={'body1'}
            {...props}
        >
            {children}
        </Typography>
    );
};

export default Link;