import React, {FC, useEffect, useState} from 'react';
import {Box, Card, CardActions, CardContent, Modal} from "@mui/material";

import {eventsStore} from '../../../store';
import {Button} from "../../common/Buttons";
import AddEventImage from "./AddEventImage/AddEventImage";
import AddEventForm from "./AddEventForm";
import AddedImages from "./AddedImages/AddedImages";
import {observable} from "mobx";


interface AddEventProps {
    open: boolean;
    setOpen: (isOpen: boolean) => void;
}

export type AddedImg = [string, File];

const AddEventModal: FC<AddEventProps> = ({open, setOpen}) => {
    const [images, setImages] = useState<AddedImg[]>([]);

    const addImages = (images: AddedImg[]) => {
        setImages(imgs => [...imgs, ...images]);
    }

    const deleteImages = (imagesUrl: string[]) => {
        setImages(imgs => imgs
            .filter(img => !imagesUrl.includes(img[0]))
        );
    }

    const handleCreateEvent = async (data: any) => {
        const imageFiles = images.map(i => i[1]);
        // await eventsStore.test(imageFiles);
        await eventsStore.createEvent({...data, lat: 1, lng: 1}, imageFiles);
    }

    const onClose = () => {
        setImages([]);
        setOpen(false);
    }

    const formId = 'event';

    useEffect(() => {
        console.log(eventsStore.events);
    }, [eventsStore.events])

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Card
                sx={{
                    width: '95%',
                    maxWidth: 360,
                }}
            >
                <AddEventImage addImages={addImages}/>
                <CardContent>
                    <AddEventForm formId={formId} submit={handleCreateEvent}/>
                </CardContent>
                <CardActions
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        pr: 2,
                        mb: 5,
                    }}
                >
                    <Button>Cancel</Button>
                    <Button form={formId} type={'submit'}>Add</Button>
                </CardActions>
                <AddedImages images={images} deleteImages={deleteImages}/>
            </Card>
        </Modal>
    );
};

export default AddEventModal;