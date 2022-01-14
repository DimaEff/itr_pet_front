import React, {FC} from 'react';
import {Box} from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";

import {FileInput} from "../../../common/Form";
import {ContainerAbove} from "../../../common/Containers";


interface ImageMenuProps {
    currentPhoto: string | null;
    confirmCapture: () => Promise<void>;
    setCurrentPhoto: (img: string | null) => void;
    capture: () => Promise<void>;
    handleLoad: (files: File[]) => void;
}

const ImageMenu: FC<ImageMenuProps> = (
    {
        currentPhoto,
        capture,
        setCurrentPhoto,
        confirmCapture,
        handleLoad,
    }) => {
    return (
        <ContainerAbove>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    'svg': {
                        fontSize: '70px',
                        cursor: 'pointer'
                    }
                }}
            >
                {
                    currentPhoto ?
                        <>
                            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} width={'100%'}
                                 height={'100%'}>
                                <CheckRoundedIcon onClick={confirmCapture}/>
                                <HighlightOffRoundedIcon onClick={() => setCurrentPhoto(null)}/>
                            </Box>
                        </> :
                        <>
                            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} width={'50%'}
                                 height={'100%'}>
                                <CameraAltRoundedIcon onClick={capture}/>
                            </Box>
                            <FileInput
                                name={'img'}
                                handleLoad={handleLoad}
                                fileTypes={'image/*'}
                                w={'50%'}
                                h={'100%'}
                            />
                        </>
                }
            </Box>
        </ContainerAbove>
    );
};

export default ImageMenu;