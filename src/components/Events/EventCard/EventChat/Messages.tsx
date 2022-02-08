import React from 'react';
import {observer} from "mobx-react-lite";
import {AccordionDetails, Stack} from "@mui/material";

import {eventChatStore} from "../../../../store";
import Message from "./Message";


const Messages = observer(() => {
    return (
        <AccordionDetails sx={{maxHeight: '360px', overflowY: 'auto'}}>
            <Stack spacing={1} direction={'column-reverse'}>
                {eventChatStore.messages.map(m => <Message key={m._id} message={m}/>)}
            </Stack>
        </AccordionDetails>
    );
});

export default Messages;