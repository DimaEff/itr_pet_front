import React, {FC, useEffect, useState} from 'react';
import {Box, ImageListItem} from "@mui/material";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { useLongPress } from 'use-long-press';

import {ImageContainer} from "../../../common/Containers";


interface ImageProps {
    src: string;
    selectedImages: string[];
    selectImage: (img: string) => void;
    removeImage: (img: string) => void;
    editMode: boolean;
    setEditMode: (mode: boolean) => void;
}

const AddedImage: FC<ImageProps> = (
    {
        src,
        selectedImages,
        selectImage,
        removeImage,
        editMode,
        setEditMode,
    }) => {
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        setSelected(selectedImages.includes(src));
    }, [selectedImages]);

    const handleSelectImage = () => {
        if (!editMode) return

        console.log('click')
        if (selected) {
            removeImage(src);
        } else {
            selectImage(src);
        }
    }

    const handleLongPress = () => {
        console.log('long click')
        if (editMode) {
            setEditMode(false);
        } else {
            setEditMode(true);
        }
    }

    const longPressEvent = useLongPress(handleLongPress);

    return (
        <ImageListItem
            sx={{
                position: 'relative',
            }}
            onClick={handleSelectImage}
            {...longPressEvent}
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