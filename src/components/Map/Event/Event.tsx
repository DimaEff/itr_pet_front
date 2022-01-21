import React, {FC} from 'react';
import {Box} from "@mui/material";

import {Event} from '../../../store'


interface EventProps {
    event: Event;
}

const Event: FC<EventProps> = ({event}) => {
    return (
        <Box>

        </Box>
    );
};

export default Event;