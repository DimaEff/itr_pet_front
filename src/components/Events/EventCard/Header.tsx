import React, {FC} from 'react';
import {Avatar, Box, CardHeader, Typography} from "@mui/material";
import {red} from "@mui/material/colors";

import {IEvent} from "../../../store";
import {isoToDateString} from "../../../utils/helper";
import EventMenu from "./EventMenu";
import EventIcon from "../../Map/Markers/EventIcon";


interface CardHeaderProps {
    event: IEvent;
}

const Header: FC<CardHeaderProps> = ({event}) => {
    return (
        <>
            <CardHeader
                avatar={
                    <EventIcon eventType={event.type}/>
                }
                action={<EventMenu event={event}/>}
                title={event.title}
                subheader={<Box>
                    <Typography variant="caption" component={'div'}>
                       {isoToDateString(event.startDate)}
                    </Typography>
                    <Typography variant="caption">
                        {isoToDateString(event.endDate)}
                    </Typography>
                </Box>}
            />
        </>
    );
};

export default Header;