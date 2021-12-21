import React, {FC, useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, ImageList, Typography} from "@mui/material";
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

    return (
        <Accordion sx={{
            position: 'absolute',
            width: '100%',
            bottom: 0,
            left: 0,
            maxHeight: '100%',
            zIndex: 2,
            overflowY: 'auto',
        }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{transform: 'rotate(180deg)'}}/>}>
                <Typography>
                    Added images
                </Typography>
            </AccordionSummary>
            <ImagesMode
                editMode={editMode}
                selectedImages={selectedImages}
                deleteImages={deleteImages}
                setEditMode={setEditMode}
                setSelectedImages={setSelectedImages}
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
                    />)}
                </ImageList>
            </AccordionDetails>
        </Accordion>
    );
};

export default AddedImages;