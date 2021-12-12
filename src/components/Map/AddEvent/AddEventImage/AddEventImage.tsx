import React, {useCallback, useRef, useState} from 'react';
import {Box, CardMedia} from "@mui/material";

import Webcam from "react-webcam";
import MenuAbove from "./MenuAbove";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";


const AddEventImage = () => {
    const camRef = useRef<any>(null);
    const [imgSrc, setImgSrc] = useState<string | null>(null);

    const capture = useCallback(() => {
        const imgSrc = camRef?.current?.getScreenshot();
        setImgSrc(imgSrc);
    }, [camRef, setImgSrc]);

    const [open, setOpen] = useState(false);

    return (
        <CardMedia
            component={'div'}
        >
            <Box onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} sx={{position: 'relative'}}>
                {
                    imgSrc ?
                        <img src={imgSrc} alt={"event photo"} width={'100%'}/> :
                        <Webcam
                            ref={camRef}
                            screenshotFormat={'image/jpeg'}
                            width={'100%'}
                        />
                }
                {open &&
                <MenuAbove>
                    {
                        imgSrc ?
                            <>
                                <DeleteRoundedIcon onClick={() => setImgSrc(null)} sx={{cursor: 'pointer'}}/>
                            </> :
                            <>
                                <CameraAltRoundedIcon onClick={capture} sx={{cursor: 'pointer'}}/>
                                <DownloadForOfflineRoundedIcon/>
                            </>
                    }
                </MenuAbove>
                }
            </Box>
        </CardMedia>
    );
};

export default AddEventImage;