import React, {FC, useState} from 'react';
import {Box} from "@mui/material";


const ContainerAbove: FC = ({children}) => {
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
            // onTouchStart={() => setOpen(true)}
            // onTouchMove={() => setOpen(true)}
        >
            {<Box
                onMouseLeave={() => setOpen(false)}
                onDragLeave={() => setOpen(false)}
                onPointerLeave={() => setOpen(false)}
                sx={{
                    display: open ? 'auto': 'none',
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    height: '98%',
                    backgroundColor: 'rgba(0, 0, 0, .35)',
                    '>*': {
                        width: '100%',
                        height: '100%',
                    },
                }}
            >
                {children}
            </Box>}
        </Box>
    );
};

export default ContainerAbove;