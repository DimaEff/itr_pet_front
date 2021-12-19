import React, {FC, useCallback, useRef, useState} from 'react';
import {Box, CardMedia} from "@mui/material";
import Webcam from "react-webcam";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

import {AddedImg} from './AddEventModal';
import {ContainerAbove} from "../../common/Containers";
import FileInput from "../../common/Form/FileInput";
import {base64toFile, getFileUrl} from "../../../utils/helper";


interface AddEventImagesProps<T> {
    setImages: (img: T[] | ((imgs: T[]) => T[])) => void;
}

const AddEventImage: FC<AddEventImagesProps<AddedImg>> = ({setImages}) => {
    const camRef = useRef<any>(null);
    const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);

    const addImages = (images: AddedImg[]) => {
        setImages(imgs => [...imgs, ...images]);
    }

    const capture = useCallback(async () => {
        const imgSrc = camRef?.current?.getScreenshot();
        setCurrentPhoto(imgSrc);
    }, [camRef]);

    const confirmCapture = async () => {
        if (currentPhoto) {
            const imgFile = await base64toFile(currentPhoto);
            addImages([[currentPhoto, imgFile]]);
            setCurrentPhoto(null);
        }
    }

    const handleLoad = (acceptedFiles: File[]) => {
        const images: AddedImg[] = acceptedFiles.map(f => [getFileUrl(f), f]);
        addImages(images);
    }

    return (
        <CardMedia
            component={'div'}
        >
            <Box sx={{position: 'relative'}}>
                {
                    currentPhoto ?
                        <img src={currentPhoto} alt={"event photo"} width={'100%'}/> :
                        <Webcam
                            ref={camRef}
                            screenshotFormat={'image/jpeg'}
                            width={'100%'}
                        />
                }
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
            </Box>
        </CardMedia>
    );
};

export default AddEventImage;