import React, {FC} from 'react';
import {Box, Typography} from "@mui/material";

import {EventType} from "../../../store";
import EventIcon from "../Markers/EventIcon";


interface SelectEventItemProps {
    eventType: EventType;
}

const SelectEventItem: FC<SelectEventItemProps> = ({eventType}) => {
    return (
        <Box display={'flex'}>
            <EventIcon eventType={eventType}/>
            <Typography marginLeft={1} variant={'h5'}>
                {eventType.title}
            </Typography>
        </Box>
    )
};

export default SelectEventItem;