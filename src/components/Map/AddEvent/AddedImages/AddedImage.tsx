import React, {FC, useEffect, useState} from 'react';
import {Box, ImageListItem} from "@mui/material";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

import {ImageContainer} from "../../../common/Containers";


interface ImageProps {
    src: string;
    selectedImages: string[];
    selectImage: (img: string) => void;
    removeImage: (img: string) => void;
    editMode: boolean;
}

const AddedImage: FC<ImageProps> = (
    {
        src,
        selectImage,
        selectedImages,
        removeImage,
        editMode,
    }) => {
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        setSelected(selectedImages.includes(src));
    }, [selectedImages]);

    const handleSelectImage = () => {
        if (!editMode) return

        if (selected) {
            removeImage(src);
        } else {
            selectImage(src);
        }
    }

    return (
        <ImageListItem
            sx={{
                position: 'relative',
            }}
            onClick={handleSelectImage}
        >
            <ImageContainer src={src} fullImg={!editMode}/>
            <Box
                sx={{
                    display: selected ? 'auto': 'none',
                    position: 'absolute',
                    bottom: 10,
                    right: 15,
                }}
            >
                <DoneRoundedIcon color={'primary'}/>
            </Box>
        </ImageListItem>
    );
};

export default AddedImage;