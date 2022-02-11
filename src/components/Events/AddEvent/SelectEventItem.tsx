import React, {FC} from 'react';
import {Box, Typography} from "@mui/material";

import {IEventType} from "../../../store";
import EventIcon from "../../Map/Markers/EventIcon";
import {useMenu} from "../../../hooks";


interface SelectEventItemProps {
    eventType: IEventType;
}

const SelectEventItem: FC<SelectEventItemProps> = ({eventType}) => {
    return (
        <Box display={'flex'}>
            <Typography marginLeft={1} variant={'body1'}>
                {eventType.title}
            </Typography>
        </Box>
    )
};

export default SelectEventItem;