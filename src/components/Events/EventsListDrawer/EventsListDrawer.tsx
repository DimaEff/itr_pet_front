import React from 'react';
import {Box, Stack, SwipeableDrawer} from "@mui/material";
import {observer} from "mobx-react-lite";

import {appStore, eventsStore} from "../../../store";
import EventCard from '../EventCard/EventCard';
import Filters from "./Filters";


const EventsListDrawer = observer(() => {
    const {filteredEvents} = eventsStore;
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
                <Stack spacing={1} p={1}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            width: '100%',
                        }}
                    >
                        <Filters />
                    </Box>
                    <Box>
                        <Stack spacing={1} width={345}>
                            {
                                filteredEvents.map(e => <EventCard
                                    key={e._id}
                                    event={e}
                                    withoutChat
                                    withMapPointer
                                />)
                            }
                        </Stack>
                    </Box>
                </Stack>
            </SwipeableDrawer>
        </>
    );
});

export default EventsListDrawer;