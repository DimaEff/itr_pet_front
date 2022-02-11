import React, {FC, useState} from 'react';
import {Box, Card, CardContent, CardMedia, Typography} from "@mui/material";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import {eventTypesStore, IEventType} from "../../../store";
import {ContainerAbove} from "../../common/Containers";
import {IconButton} from "../../common/Buttons";
import {ConfirmDialog} from "../../common/Modals";


interface EventTypeProps {
    eventType: IEventType;
}

const EventType: FC<EventTypeProps> = ({eventType}) => {
    const [open, setOpen] = useState(false);

    return (
        <Card
            sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                height: 50,
                width: 250,
            }}
        >
            <ConfirmDialog
                open={open}
                onClose={() => setOpen(false)}
                title={'Do you want to delete this type and all events using it?'}
                onConfirm={() => eventTypesStore.deleteEventType(eventType._id)}
            />
            <ContainerAbove sx={{justifyContent: 'center', alignItems: 'center'}}>
                <IconButton
                    onClick={() => setOpen(true)}
                    disableFocusRipple
                    disableRipple
                >
                    <DeleteRoundedIcon />
                </IconButton>
            </ContainerAbove>
            <CardMedia
                component={"img"}
                sx={{width: 50}}
                image={eventType.icon.path}
                alt={"event type icon"}
            />
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{flex: '1 0 auto'}}>
                    <Typography component={"div"} variant="h5">
                        {eventType.title}: {eventType.value}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    );
};

export default EventType;