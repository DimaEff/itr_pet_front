import React from 'react';
import {Box, Stack, SwipeableDrawer, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {observer} from "mobx-react-lite";
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

import {appStore, EventFilters, eventFilters, eventsStore} from "../../store";
import EventCard from './EventCard/EventCard';


const EventsListDrawer = observer(() => {
    const {filteredEvents, filters, setFilters} = eventsStore;
    const {drawerOpen, setDrawerOpen} = appStore;

    const handleFilter = (
        event: React.MouseEvent<HTMLElement>,
        newFormats: EventFilters[],
    ) => {
        setFilters(newFormats);
    };

    const filtersChildren: {[keys in EventFilters]: React.ReactNode} = {
        byLikes: <FavoriteRoundedIcon />,
        validDate: <Typography>NOW</Typography>
    };

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
                        <ToggleButtonGroup
                            value={filters}
                            onChange={handleFilter}
                            aria-label="text formatting"
                        >
                            {
                                eventFilters.map(f => <ToggleButton key={f} value={f} aria-label={f}>
                                    {filtersChildren[f]}
                                </ToggleButton>)
                            }
                        </ToggleButtonGroup>
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