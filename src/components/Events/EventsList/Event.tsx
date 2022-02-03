import React, {FC} from 'react';
import {Box, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {LoremIpsum} from "lorem-ipsum";

import {IEvent} from '../../../store';
import {isoToDateString} from "../../../utils/helper";


interface EventProps {
    event: IEvent;
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

const Event: FC<EventProps> = ({event}) => {
    return (
        <Card sx={{display: 'flex', height: '170px'}}>
            <CardMedia
                component="img"
                sx={{width: 200}}
                image={event.images[0].path}
                alt="Live from space album cover"
            />
            <Box sx={{display: 'flex', flexDirection: 'column', width: '50%', overflowY: 'auto'}}>
                <CardContent sx={{flex: '1 0 auto'}}>
                    <Typography component="div" variant="h5">
                        {event.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {event.uid}
                    </Typography>
                    <Box>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {isoToDateString(event.startDate)}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            -
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {isoToDateString(event.endDate)}
                        </Typography>
                    </Box>
                </CardContent>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', width: '50%'}}>
                <CardContent sx={{overflowY: 'auto'}}>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {/*{event.description}*/}
                        {lorem.generateParagraphs(2)}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    );
};

export default Event;