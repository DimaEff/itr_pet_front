import React, {FC} from 'react';
import {Stack} from "@mui/material";

import {IEvent} from '../../../store';
import Event from '../EventModal/Event';


interface EventListProps {
    events: IEvent[];
}

const EventList: FC<EventListProps> = ({events}) => {
    return (
        <Stack>
            {events.map(e => <Event key={e._id} event={e}/>)}
        </Stack>
    );
};

export default EventList;