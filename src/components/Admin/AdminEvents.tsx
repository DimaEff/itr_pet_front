import React from 'react';
import {observer} from "mobx-react-lite";

import {eventsStore} from "../../store";
import {Box} from "@mui/material";
import {EventList} from "../Events";


const AdminEvents = observer(() => {
    return (
        <>
            {eventsStore.events.length === 0 && <Box>Have not events</Box>}
            {eventsStore.events.map(e => <Box key={e._id}>
                {e.title}
                <img style={{width: '100px', height: '100px'}} src={e.images[0].path} alt="event image"/>
                <button onClick={() => eventsStore.deleteEvent(e._id)}>delete event</button>
            </Box>)}
            <EventList events={eventsStore.events}/>
        </>
    );
});

export default AdminEvents;