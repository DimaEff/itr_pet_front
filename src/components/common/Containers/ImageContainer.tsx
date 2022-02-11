import React, {FC, useState} from 'react';
import {Box} from "@mui/material";
import {CenteredModal} from "../Modals";


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
                        cursor: fullImg ? 'pointer' : 'default',
                    },
                }}
                onClick={handleOpen}
            >
                <img src={src} alt={'image'}/>
            </Box>
            <CenteredModal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box sx={{
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
            </CenteredModal>
        </>
    );
};

export default ImageContainer;