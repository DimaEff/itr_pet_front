import React, {FC} from 'react';
import {Container as MContainer, ContainerProps as MContainerProps} from '@mui/material';


interface ContainerProps extends MContainerProps{

}

const Container: FC<ContainerProps> = ({children}) => {
    return (
        <MContainer
            maxWidth={'md'}
            sx={{
                height: '100vh',
                bgcolor: 'background.default',
                color: 'text.primary',
            }}
        >
            {children}
        </MContainer>
    );
};

export default Container;