import React from 'react';
import {Box, Stack, SwipeableDrawer} from "@mui/material";
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
                <Box p={1}>
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
                </Box>
            </SwipeableDrawer>
        </>
    );
});

export default EventsListDrawer;