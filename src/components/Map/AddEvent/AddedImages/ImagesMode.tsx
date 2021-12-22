import React, {FC} from 'react';
import {AccordionDetails, Box} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from '@mui/icons-material/EditRounded';

import {Button, IconButton} from "../../../common/Buttons";


interface ImagesModeProps {
    editMode: boolean;
    setEditMode: (edit: boolean) => void;
    selectedImages: string[];
    deleteImages: () => void;
}

const ImagesMode: FC<ImagesModeProps> = (
    {
        editMode,
        setEditMode,
        selectedImages,
        deleteImages,
    }) => {

    return (
        <AccordionDetails
            sx={{
                textAlign: 'end',
            }}
        >
            {
                editMode ?
                    <Box>
                        <Button onClick={() => setEditMode(false)}>
                            Cancel
                        </Button>
                        <IconButton disabled={selectedImages.length === 0} onClick={deleteImages}>
                            <DeleteRoundedIcon/>
                        </IconButton>
                    </Box> :
                    <Box>
                        <IconButton onClick={() => setEditMode(true)}>
                            <EditRoundedIcon/>
                        </IconButton>
                    </Box>
            }
        </AccordionDetails>
    );
};

export default ImagesMode;