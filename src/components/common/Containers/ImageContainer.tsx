import React, {FC, useState} from 'react';
import {Box, Modal} from "@mui/material";


interface ImageContainerProps {
    src: string;
    w?: string | number;
    h?: string | number;
    fullImg?: boolean;
}

const ImageContainer: FC<ImageContainerProps> = (
    {
        src,
        w,
        h,
        fullImg,
    }) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        if (fullImg) {
            setOpen(true);
        }
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: w || 150,
                    height: h || 150,
                    borderRadius: 4,
                    'img': {
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        cursor: fullImg ? 'pointer': 'default',
                    },
                }}
                onClick={handleOpen}
            >
                <img src={src} alt={'image'}/>
            </Box>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: '95%',
                    maxHeight: '95%',
                    minWidth: '320px',
                    'img': {
                        width: '100%',
                        height: '100%',
                    }
                }}>
                    <img src={src} alt={'image'}/>
                </Box>
            </Modal>
        </>

    );
};

export default ImageContainer;