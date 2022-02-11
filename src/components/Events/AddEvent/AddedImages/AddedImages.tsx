import React, {FC, useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Badge, ImageList, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {AddedImg} from "../AddEventModal";
import AddedImage from "./AddedImage";
import ImagesMode from "./ImagesMode";


interface AddedImagesProps<T> {
    images: T[];
    deleteImages: (images: string[]) => void;
}

const AddedImages: FC<AddedImagesProps<AddedImg>> = ({images, deleteImages}) => {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    const selectImage = (image: string) => {
        setSelectedImages(imgs => [...imgs, image]);
    }

    const removeImage = (image: string) => {
        setSelectedImages(imgs => imgs.filter(img => img !== image));
    }

    const [editMode, setEditMode] = useState(false);

    const handleSetEditMode = (edit: boolean) => {
        setEditMode(edit);
        setSelectedImages([]);
    }

    const handleDeleteImages = () => {
        deleteImages(selectedImages);
        setSelectedImages([]);
        setEditMode(false);
    }

    return (
        <Accordion
            sx={{
                position: 'absolute',
                width: '100%',
                bottom: 0,
                left: 0,
                maxHeight: '100%',
                zIndex: 2,
                overflowY: 'auto',
            }}
            onChange={(event, expanded) => expanded && setEditMode(false)}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{transform: 'rotate(180deg)'}}/>}>
                <Badge variant={'middle'} badgeContent={images.length} color={'primary'} showZero>
                    <Typography>
                        Added images
                    </Typography>
                </Badge>
            </AccordionSummary>
            <ImagesMode
                editMode={editMode}
                selectedImages={selectedImages}
                deleteImages={handleDeleteImages}
                setEditMode={handleSetEditMode}
            />
            <AccordionDetails>
                <ImageList>
                    {images.map(i => <AddedImage
                        key={i[0]}
                        src={i[0]}
                        selectedImages={selectedImages}
                        selectImage={selectImage}
                        removeImage={removeImage}
                        editMode={editMode}
                        setEditMode={handleSetEditMode}
                    />)}
                </ImageList>
            </AccordionDetails>
        </Accordion>
    );
};

export default AddedImages;