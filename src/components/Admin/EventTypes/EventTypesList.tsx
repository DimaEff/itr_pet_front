import React, {FC, useEffect, useMemo, useState} from 'react';
import {Box, Grid, Stack, Toolbar, Typography} from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {observer} from "mobx-react-lite";
import Fuse from "fuse.js";

import {eventTypesStore} from "../../../store";
import EventType from "./EventType";
import SearchTextField from "../../common/Form/SearchTextField";
import {Button} from "../../common/Buttons";


interface EventTypesListProps {
    onOpenAddNewEventType: () => void;
}

const EventTypesList: FC<EventTypesListProps> = observer(({onOpenAddNewEventType}) => {
    const fuse = useMemo(() => new Fuse(eventTypesStore.eventTypes, {
        keys: [
            'title',
            'value',
        ],
    }), [eventTypesStore.eventTypes]);

    const [search, setSearch] = useState('');
    const [searchedTypes, setSearchedTypes] = useState(eventTypesStore.eventTypes);

    useEffect(() => {
        if (search.length < 3) {
            setSearchedTypes(eventTypesStore.eventTypes);
            return;
        }

        const res = fuse.search(search);
        setSearchedTypes(res.map(r => r.item));
    }, [search, eventTypesStore.eventTypes]);

    return (
        <Box>
            <Toolbar>
                <Typography
                    variant={"h6"}
                    noWrap
                    component={"div"}
                    sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                >
                    All event types
                </Typography>
                <Stack direction="row" spacing={1}>
                    <SearchTextField
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <Button onClick={onOpenAddNewEventType}>
                        <AddRoundedIcon />
                    </Button>
                </Stack>
            </Toolbar>
            <Grid container m={1} spacing={2}>
                {
                    searchedTypes.map(et => <Grid
                        key={et._id}
                        item
                        display={'flex'}
                        justifyContent={'center'}
                    >
                        <EventType eventType={et}/>
                    </Grid>)
                }
            </Grid>
        </Box>
    );
});

export default EventTypesList;