import React, {FC} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, ImageList, ImageListItem, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {AddedImg} from "./AddEventModal";
import {ImageContainer} from "../../common/Containers";


interface AddedImagesProps<T> {
    images: T[];
    setImages: (img: T[] | ((imgs: T[]) => T[])) => void;
}

const AddedImages: FC<AddedImagesProps<AddedImg>> = ({images, setImages}) => {
    const deleteImages = (imagesUrl: string[]) => {
        setImages(imgs => imgs
            .filter(img => !imagesUrl.includes(img[0]))
        );
    }

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
            <AccordionDetails>
                <ImageList>
                    {images.map(i => <ImageListItem key={i[0]}>
                        <ImageContainer src={i[0]} fullImg={true}/>
                    </ImageListItem>)}
                </ImageList>
            </AccordionDetails>
        </Accordion>
    );
};

export default AddedImages;