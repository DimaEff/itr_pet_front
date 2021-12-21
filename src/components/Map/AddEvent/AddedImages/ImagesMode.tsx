import React, {FC} from 'react';
import {AccordionDetails, Box} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from '@mui/icons-material/EditRounded';

import {Button, IconButton} from "../../../common/Buttons";


interface ImagesModeProps {
    editMode: boolean;
    setEditMode: (edit: boolean) => void;
    selectedImages: string[];
    setSelectedImages: (images: string[]) => void;
    deleteImages: (images: string[]) => void;
}

const ImagesMode: FC<ImagesModeProps> = (
    {
        editMode,
        setEditMode,
        setSelectedImages,
        deleteImages,
        selectedImages
    }) => {
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
        <AccordionDetails
            sx={{
                textAlign: 'end',
            }}>
            {
                editMode ?
                    <AccordionDetails>
                        <Button onClick={() => handleSetEditMode(false)}>
                            Cancel
                        </Button>
                        <IconButton disabled={selectedImages.length === 0} onClick={handleDeleteImages}>
                            <DeleteRoundedIcon/>
                        </IconButton>
                    </AccordionDetails> :
                    <Box>
                        <IconButton onClick={() => handleSetEditMode(true)}>
                            <EditRoundedIcon/>
                        </IconButton>
                    </Box>
            }
        </AccordionDetails>
    );
};

export default ImagesMode;