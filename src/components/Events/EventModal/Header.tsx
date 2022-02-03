import React, {FC} from 'react';
import {Avatar, Box, CardHeader, Typography} from "@mui/material";
import {red} from "@mui/material/colors";

import {IEvent} from "../../../store";
import {isoToDateString} from "../../../utils/helper";
import EventMenu from "./EventMenu";


interface CardHeaderProps {
    event: IEvent;
}

const Header: FC<CardHeaderProps> = ({event}) => {
    return (
        <>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                        D
                        {/*{event.uid[0]}*/}
                    </Avatar>
                }
                action={<EventMenu eventId={event._id}/>}
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