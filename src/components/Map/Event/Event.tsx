import React, {FC} from 'react';
import {Box} from "@mui/material";

import {IEvent} from '../../../store'


interface EventProps {
    event: IEvent;
}

const Event: FC<EventProps> = ({event}) => {
    return (
        <Box>

        </Box>
    );
};

export default Event;