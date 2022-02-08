import React, {FC} from 'react';
import {Stack} from "@mui/material";

import {IEvent} from "../../../store";
import EventCard from '../EventCard/EventCard';


interface EventListProps {
    events: IEvent[];
}

const EventsList: FC<EventListProps> = ({events}) => {
    return (
        <Stack>
            {events.map(e => <EventCard key={e._id} event={e}/>)}
        </Stack>
    );
};

export default EventsList;