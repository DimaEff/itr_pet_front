import React from 'react';
import {Box, Grid} from "@mui/material";
import {observer} from "mobx-react-lite";

import {eventsStore, IEvent} from "../../../store";
import {EventCard} from "../../Events";
import {SimpleSearch} from "../../common/Different";
import {useSearch} from "../../../hooks";


const AdminEvents = observer(() => {
    const {searchInput, setSearchInput, searchedValues} = useSearch<IEvent>(
        eventsStore.events,
        {keys: ['title', 'description']},
    );

    return (
        <Box>
            <SimpleSearch inputValue={searchInput} onChange={e => setSearchInput(e.target.value)}>
                <></>
            </SimpleSearch>
            <Grid container m={1} spacing={2}>
                {searchedValues.map(e => <Grid key={e._id} item>
                    <EventCard event={e}/>
                </Grid>)}
            </Grid>
        </Box>
    );
});

export default AdminEvents;