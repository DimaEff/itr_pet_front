import React, {FC} from 'react';
import {useNavigate, NavigateProps} from 'react-router-dom';
import {Box, Typography, TypographyProps} from "@mui/material";


interface LinkProps {
    wrapperComponent?: React.FC;
}

const Link: FC<LinkProps & NavigateProps & TypographyProps> = (
    {children,
        to,
        sx,
        wrapperComponent,
        ...props
    }) => {
    const navigate = useNavigate();
    const Wrapper = wrapperComponent || Box;

    return (
        <Wrapper onClick={() => navigate(to)}>
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