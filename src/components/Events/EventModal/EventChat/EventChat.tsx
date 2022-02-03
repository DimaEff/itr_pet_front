import React, {FC, useEffect, useState} from 'react';
import {useAuth0} from "@auth0/auth0-react";
import {Accordion, AccordionDetails, AccordionSummary, Stack, TextField} from "@mui/material";
import {observer} from "mobx-react-lite";

import {Button} from "../../../common/Buttons";
import {eventChatStore} from "../../../../store";
import Message from "./Message";


interface ChatProps {
}

const EventChat: FC<ChatProps> = observer(() => {
    const {user} = useAuth0();

    const [open, setOpen] = useState(false);
    // useEffect(() => {
        // if (open && !eventChatStore.connected) {
        //     eventChatStore.subscribe('123');
        // }
        //
        // return eventChatStore.unsubscribe;
    // }, [open]);

    const [message, setMessage] = useState('');

    const handleMessage = () => {
        if (!user?.sub) {
            return
        }

        eventChatStore.message({
            message,
            eid: '123',
            uid: user?.sub,
        });
    }

    return (
        <Accordion
            onChange={(e, o) => setOpen(o)}
            sx={{
                zIndex: 2,
                position: 'absolute',
                bottom: 0,
                width: '100%',
                maxHeight: '100%',
                height: open ? '100%' : 'auto',
            }}
        >
            <AccordionSummary>
                Chat
            </AccordionSummary>
            <AccordionDetails sx={{maxHeight: '400px', overflowY: 'auto'}}>
                <Stack spacing={1}>
                    {eventChatStore.messages.map(m => <Message key={m._id} message={m}/>)}
                </Stack>
            </AccordionDetails>
            <AccordionDetails>
                <TextField value={message} onChange={e => setMessage(e.target.value)}/>
                <Button onClick={handleMessage}>
                    message
                </Button>
            </AccordionDetails>
        </Accordion>
    );
});

export default EventChat;