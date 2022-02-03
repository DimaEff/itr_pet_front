import React, {FC} from 'react';
import {Box, Grid} from "@mui/material";
import {observer} from "mobx-react-lite";

import {eventTypesStore, IEventType} from "../../../store";
import EventType from "./EventType";
import {SimpleSearch} from "../../common/Different";
import {useSearch} from "../../../hooks";


interface EventTypesListProps {
    onOpenAddNewEventType: () => void;
}

const EventTypesList: FC<EventTypesListProps> = observer(({onOpenAddNewEventType}) => {
    const {searchInput, setSearchInput, searchedValues} = useSearch<IEventType>(
        eventTypesStore.eventTypes,
        {keys: ['title', 'value']}
    );

    // const fuse = useMemo(() => new Fuse<IEventType>(eventTypesStore.eventTypes, {
    //     keys: [
    //         'title',
    //         'value',
    //     ],
    // }), [eventTypesStore.eventTypes]);
    //
    // const [search, setSearch] = useState('');
    // const [searchedTypes, setSearchedTypes] = useState(eventTypesStore.eventTypes);
    //
    // useEffect(() => {
    //     if (search.length < 3) {
    //         setSearchedTypes(eventTypesStore.eventTypes);
    //         return;
    //     }
    //
    //     const res = fuse.search(search);
    //     setSearchedTypes(res.map(r => r.item));
    // }, [search, eventTypesStore.eventTypes]);

    return (
        <Box>
            <SimpleSearch
                inputValue={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                onAdd={onOpenAddNewEventType}
            />
            <Grid container m={1} spacing={2}>
                {
                    searchedValues.map(et => <Grid
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