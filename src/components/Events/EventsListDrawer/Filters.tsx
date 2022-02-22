import React, {useState} from 'react';
import {MenuItem, Select, SelectChangeEvent, Stack, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import {observer} from "mobx-react-lite";

import {EventFilters, eventFilters, eventsStore, eventTypesStore} from "../../../store";


const Filters = observer(() => {
    const {filters, setFilters, setEventType, eventType} = eventsStore;
    const {eventTypes, getEventsTypeById} = eventTypesStore;

    const handleFilter = (
        event: React.MouseEvent<HTMLElement>,
        newFormats: EventFilters[],
    ) => {
        setFilters(newFormats);
    };

    const filtersChildren: { [keys in EventFilters]: React.ReactNode } = {
        byLikes: <FavoriteRoundedIcon/>,
        validDate: <Typography>NOW</Typography>,
    };

    const [selectedET, setSelectedET] = useState<string>('all');
    const handleSelectEventType = (e: SelectChangeEvent<string>): void => {
        const value = e.target.value;
        setSelectedET(value);
        
        const eventType = getEventsTypeById(value) || null;
        setEventType(value === 'all' ? null: eventType);
    }

    return (
        <Stack spacing={1} direction={'row'}>
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
            <Select value={selectedET} onChange={handleSelectEventType}>
                <MenuItem value={'all'}>
                    All
                </MenuItem>
                {
                    eventTypes.map(et => <MenuItem value={et._id} key={et._id}>
                        <Typography variant={'body1'}>
                            {et.title}
                        </Typography>
                    </MenuItem>)
                }
            </Select>
        </Stack>
    );
});

export default Filters;