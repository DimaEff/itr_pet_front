import React, {FC, useState} from 'react';
import {Position} from "google-map-react";
import {Icon, Paper} from "@mui/material";

import {IEvent} from '../../../store';
import EventIcon from "./EventIcon";
import {EventCard} from "../../Events";
import {CenteredModal} from "../../common/Modals";


interface EventMarkerProps extends Position {
    event: IEvent;
}

const EventMarker: FC<EventMarkerProps> = ({event}) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Paper
                variant={'outlined'}
                elevation={0}
                onClick={() => setOpen(true)}
                sx={{
                    width: 30,
                    height: 30,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}
            >
                <Icon>
                    <EventIcon eventType={event.type}/>
                </Icon>
            </Paper>
            {open && <CenteredModal open={open} onClose={() => setOpen(false)}>
                <EventCard event={event}/>
            </CenteredModal>}
        </>

    );
};

export default EventMarker;