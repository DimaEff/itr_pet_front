import React from 'react';
import {Stack, SwipeableDrawer} from "@mui/material";
import {observer} from "mobx-react-lite";

import {appStore, eventsStore} from "../../store";
import EventCard from './EventCard/EventCard';


const EventsListDrawer = observer(() => {
    const {events} = eventsStore;
    const {drawerOpen, setDrawerOpen} = appStore;

    return (
        <>
            <SwipeableDrawer
                variant={'temporary'}
                anchor={'right'}
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                onOpen={() => setDrawerOpen(true)}
            >
                <Stack spacing={1} width={345}>
                    {
                        events.map(e => <EventCard
                            key={e._id}
                            event={e}
                            withoutChat
                            withMapPointer
                        />)
                    }
                </Stack>
            </SwipeableDrawer>
        </>
    );
});

export default EventsListDrawer;