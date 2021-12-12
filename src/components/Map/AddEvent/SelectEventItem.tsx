import React, {FC} from 'react';
import {Box, Typography} from "@mui/material";

import {EventsTypes} from "../../../store";
import EventIcon from "../Markers/EventIcon";


interface SelectEventItemProps {
    eventType: EventsTypes;
}

const SelectEventItem: FC<SelectEventItemProps> = ({eventType}) => {
    return (
        <Box display={'flex'}>
            <EventIcon eventType={eventType}/>
            <Typography marginLeft={1} variant={'h5'}>
                {eventType}
            </Typography>
        </Box>
    )
};

export default SelectEventItem;