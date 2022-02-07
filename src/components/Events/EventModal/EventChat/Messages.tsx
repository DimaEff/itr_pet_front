import React from 'react';
import {observer} from "mobx-react-lite";
import {AccordionDetails, Stack} from "@mui/material";

import {eventChatStore} from "../../../../store";
import Message from "./Message";


const Messages = observer(() => {
    return (
        <AccordionDetails sx={{maxHeight: '400px', overflowY: 'auto'}}>
            <Stack spacing={1}>
                {eventChatStore.messages.map(m => <Message key={m._id} message={m}/>)}
            </Stack>
        </AccordionDetails>
    );
});

export default Messages;