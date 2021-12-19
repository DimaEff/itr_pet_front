import React, {FC, useState} from 'react';
import {
    Card,
    CardActions,
    CardContent,
    Modal,
} from "@mui/material";

import {Button} from "../../common/Buttons";
import AddEventImage from "./AddEventImage";
import AddEventForm from "./AddEventForm";
import AddedImages from "./AddedImages";


interface AddEventProps {
    open: boolean;
    setOpen: (isOpen: boolean) => void;
}

export type AddedImg = [string, File];

const AddEventModal: FC<AddEventProps> = ({open, setOpen}) => {
    const [images, setImages] = useState<AddedImg[]>([]);

    const handleAddEvent = (data: any) => {
        console.log(data);
        console.log(images.map(i => i[1]));
    }

    const onClose = () => {
        setImages([]);
        setOpen(false);
    }

    const formId = 'event';

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Card sx={{
                width: '95%',
                maxWidth: 360,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}>
                <AddEventImage setImages={setImages}/>
                <CardContent>
                    <AddEventForm formId={formId} onAddEvent={handleAddEvent}/>
                </CardContent>
                <CardActions sx={{width: '100%', display: 'flex', justifyContent: 'flex-end', pr: 2}}>
                    <Button>Cancel</Button>
                    <Button form={formId} type={'submit'}>Add</Button>
                </CardActions>
                <AddedImages images={images} setImages={setImages}/>
            </Card>
        </Modal>
    );
};

export default AddEventModal;