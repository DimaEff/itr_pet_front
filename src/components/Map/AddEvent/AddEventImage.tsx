import React, {useCallback, useRef, useState} from 'react';
import {Box, CardMedia} from "@mui/material";
import Webcam from "react-webcam";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";

import {ContainerAbove} from "../../common/Containers";
import FileInput from "../../common/Form/FileInput";
import {base64toFile, convertToBase64, getFileUrl} from "../../../utils/helper";


type AddedImg = [string, File];

const AddEventImage = () => {
    const camRef = useRef<any>(null);
    const [images, setImages] = useState<AddedImg[]>([]);

    const addImages = (images: AddedImg[]) => {
        setImages(imgs => [...imgs, ...images]);
    }

    const deleteImage = (imageUrl: string) => {
        setImages(imgs => imgs.filter(img => img[0] !== imageUrl));
    }

    const capture = useCallback(async () => {
        const imgSrc = camRef?.current?.getScreenshot();
        const t = await base64toFile(imgSrc);
        const url = getFileUrl(t);
        addImages([imgSrc]);
    }, [camRef]);

    const handleLoad = (acceptedFiles: File[]) => {
        // const base64Images = await Promise.all(acceptedFiles.map(f => convertToBase64(f)));
        const urlImages: AddedImg[] = acceptedFiles.map(f => [getFileUrl(f), f]);
        addImages(urlImages);
    }

    return (
        <CardMedia
            component={'div'}
        >
            <Box sx={{position: 'relative'}}>
                {
                    images.length > 0 ?
                        <img src={images[0][0]} alt={"event photo"} width={'100%'}/> :
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
                        {images.length}
                        {
                            images.length > 0 ?
                                <>
                                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} width={'100%'}
                                         height={'100%'}>
                                        <DeleteRoundedIcon onClick={() => deleteImage('')}/>
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