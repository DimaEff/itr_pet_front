import React, {FC, useState} from 'react';
import {Box, BoxProps} from "@mui/material";


const ContainerAbove: FC<BoxProps> = ({children, sx, ...props}) => {
    const [open, setOpen] = useState(false);

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                width: '100%',
                height: '100%',
            }}
            onMouseEnter={() => setOpen(true)}
            onDragEnter={() => setOpen(true)}
        >
            <Box
                onMouseLeave={() => setOpen(false)}
                onDragLeave={() => setOpen(false)}
                sx={{
                    display: open ? 'auto' : 'none',
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, .35)',
                    '>*': {
                        width: '100%',
                        height: '100%',
                    },
                    ...sx
                }}
                {...props}
            >
                {children}
            </Box>
        </Box>
    );
};

export default ContainerAbove;