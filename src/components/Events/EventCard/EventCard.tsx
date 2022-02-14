import React, {FC, forwardRef} from 'react';
import {Card, CardContent, Typography} from "@mui/material";

import {IEvent} from "../../../store";
import {LoremIpsum} from "lorem-ipsum";
import Header from "./Header";
import Media from "./Media";
import Actions from "./Actions";
import EventChat from "./EventChat/EventChat";


interface EventProps {
    event: IEvent;
    withMapPointer?: boolean;
    withoutChat?: boolean;
}

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});

const EventCard: FC<EventProps> = forwardRef(({event, withoutChat, withMapPointer}, ref) => {

    return (
        <div id={'test'}>
            <Card sx={{position: 'relative', width: 345}}>
                <Header event={event}/>
                <Media event={event}/>
                <CardContent
                    sx={{
                        overflowY: 'auto',
                        height: 170,
                        mt: 6,
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        {event.description}
                    </Typography>
                </CardContent>
                <Actions withMapPointer={!!withMapPointer} event={event}/>
                {!withoutChat && <EventChat eventId={event._id}/>}
            </Card>
        </div>
    );
});

export default EventCard;