import React, {FC, useState} from 'react';
import {Card, CardActions, CardContent} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";

import {eventsStore} from '../../../store';
import {Button} from "../../common/Buttons";
import AddEventImage from "./AddEventImage/AddEventImage";
import AddEventForm from "./AddEventForm";
import AddedImages from "./AddedImages/AddedImages";
import useUserLocation from "../../../hooks/useUserLocation";
import {CreateEventForm} from "../../../store/Events/dto/create-event.dto";
import {CenteredModal} from "../../common/Modals";


interface AddEventProps {
    open: boolean;
    setOpen: (isOpen: boolean) => void;
}

export type AddedImg = [string, File];

const AddEventModal: FC<AddEventProps> = ({open, setOpen}) => {
    const {createEvent, pending} = eventsStore;

    const [images, setImages] = useState<AddedImg[]>([]);

    const addImages = (images: AddedImg[]) => {
        setImages(imgs => [...imgs, ...images]);
    }

    const deleteImages = (imagesUrl: string[]) => {
        setImages(imgs => imgs
            .filter(img => !imagesUrl.includes(img[0]))
        );
    }

    const {user} = useAuth0();
    const {coords} = useUserLocation();
    const handleCreateEvent = (data: CreateEventForm) => {
        if (!user?.sub || !images.length || !coords) {
            console.log('have not user, images or user coords');
            console.log(user?.sub, images.length);
            return
        }

        const files: File[] = images.map(i => i[1]);
        createEvent({...data, ...coords, files, uid: user.sub});
        setOpen(false);
    }

    const onClose = () => {
        setImages([]);
        setOpen(false);
    }

    const formId = 'event';

    return (
        <CenteredModal
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
                    <Button loading={pending}>Cancel</Button>
                    <Button loading={pending} form={formId} type={'submit'}>Add</Button>
                </CardActions>
                <AddedImages images={images} deleteImages={deleteImages}/>
            </Card>
        </CenteredModal>
    );
};

export default AddEventModal;