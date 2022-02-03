import React, {FC} from 'react';
import {Card, CardContent, Typography} from "@mui/material";

import {IEvent} from "../../../store";
import {LoremIpsum} from "lorem-ipsum";
import Header from "./Header";
import Media from "./Media";
import Actions from "./Actions";
import EventChat from "./EventChat/EventChat";


interface EventProps {
    event: IEvent;
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

const Event: FC<EventProps> = ({event, withoutChat}) => {

    return (
        <>
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
                        {/*{event.description}*/}
                        {lorem.generateParagraphs(2)}
                    </Typography>
                </CardContent>
                <Actions event={event}/>
                {!withoutChat && <EventChat eventId={event._id}/>}
            </Card>
        </>
    );
};

export default Event;