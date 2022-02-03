import React from 'react';
import {Box, Grid} from "@mui/material";
import {observer} from "mobx-react-lite";

import {eventsStore} from "../../../store";
import {EventCard} from "../../Events";


const AdminEvents = observer(() => {
    return (
        <Box>
            <Grid container>
                {eventsStore.events.map(e => <Grid key={e._id} item>
                    <EventCard event={e} withoutChat/>
                </Grid>)}
            </Grid>
        </Box>
    );
});

export default AdminEvents;