import React, {FC} from 'react';
import {Position} from "google-map-react";
import {Icon, Paper} from "@mui/material";

import {Event} from '../../../store';
import EventIcon from "./EventIcon";


interface EventMarkerProps extends Position{
    event: Event;
}

const EventMarker: FC<EventMarkerProps> = ({event}) => {
    return (
        <Paper
            variant={'outlined'}
            elevation={0}
            onClick={() => console.log('123')}
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
    );
};

export default EventMarker;