import React, {FC} from 'react';
import {
    Card,
    CardActions,
    CardContent,
    Modal,
} from "@mui/material";

import {Button} from "../../common/Buttons";
import AddEventImage from "./AddEventImage";
import AddEventForm from "./AddEventForm";


interface AddEventProps {
    open: boolean;
    setOpen: (isOpen: boolean) => void;
}

const AddEventModal: FC<AddEventProps> = ({open, setOpen}) => {


    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Card sx={{
                maxWidth: 360, position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}>
                <AddEventImage/>
                <CardContent>
                    <AddEventForm/>
                </CardContent>
                <CardActions sx={{width: '100%', display: 'flex', justifyContent: 'flex-end', pr: 2}}>
                    <Button>Cancel</Button>
                    <Button>Add</Button>
                </CardActions>
            </Card>
        </Modal>
    );
};

export default AddEventModal;