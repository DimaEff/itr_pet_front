import React, {Dispatch, FC} from 'react';
import {Box} from "@mui/material";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import {FileInput} from "../../common/Form";
import {ContainerAbove} from "../../common/Containers";


interface PictureDownloadProps {
    preview: string | undefined;
    handleUpdatePicture: () => void;
    setImage: Dispatch<null>;
    handleLoad: (files: File[]) => void;
}

const PictureDownload: FC<PictureDownloadProps> = (
    {
        preview,
        handleLoad,
        handleUpdatePicture,
        setImage,
    }) => {
    return (
        <ContainerAbove sx={{justifyContent: 'center', alignItems: 'center'}}>
            {
                preview ?
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <DoneRoundedIcon fontSize={'large'} onClick={handleUpdatePicture}/>
                        <DeleteRoundedIcon fontSize={'large'} onClick={() => setImage(null)}/>
                    </Box> :
                    <FileInput sx={{borderRadius: '50%'}} name={'picture'} handleLoad={handleLoad}/>
            }
        </ContainerAbove>
    );
};

export default PictureDownload;