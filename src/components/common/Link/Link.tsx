import React, {FC} from 'react';
import {useNavigate, NavigateProps} from 'react-router-dom';
import {Box, Typography, TypographyProps} from "@mui/material";


interface LinkProps {
    wrapperComponent?: React.FC;
    wrapperProps?: any;
    onNavigate?: () => void;
}

const Link: FC<LinkProps & NavigateProps & TypographyProps> = (
    {children,
        to,
        sx,
        wrapperComponent,
        wrapperProps,
        onNavigate,
        ...props
    }) => {
    const navigate = useNavigate();
    const Wrapper = wrapperComponent || Box;

    const handleNavigate = () => {
        onNavigate && onNavigate();
        navigate(to)
    }

    return (
        <Wrapper onClick={handleNavigate} {...wrapperProps}>
            <Typography
                sx={{
                    cursor: 'pointer',
                    ...sx,
                }}
                variant={'body1'}
                {...props}
            >
                {children}
            </Typography>
        </Wrapper>
    );
};

export default Link;