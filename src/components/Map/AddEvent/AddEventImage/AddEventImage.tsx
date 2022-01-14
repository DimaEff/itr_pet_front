import React, {FC, useCallback, useRef, useState} from 'react';
import {Box, CardMedia} from "@mui/material";
import Webcam from "react-webcam";

import {AddedImg} from '../AddEventModal';
import {base64toFile, getFileUrl} from "../../../../utils/helper";
import ImageMenu from "./ImageMenu";


interface AddEventImagesProps<T> {
    addImages: (images: AddedImg[]) => void;
}

const AddEventImage: FC<AddEventImagesProps<AddedImg>> = ({addImages}) => {
    const camRef = useRef<any>(null);
    const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);

    const capture = useCallback(async () => {
        const imgSrc = camRef?.current?.getScreenshot({width: 1920, height: 1280});
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
                <ImageMenu
                    currentPhoto={currentPhoto}
                    confirmCapture={confirmCapture}
                    setCurrentPhoto={setCurrentPhoto}
                    capture={capture}
                    handleLoad={handleLoad}
                />
            </Box>
        </CardMedia>
    );
};

export default AddEventImage;