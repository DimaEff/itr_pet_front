import React, {FC, useEffect, useState} from 'react';
import {useAuth0} from "@auth0/auth0-react";
import {Accordion, AccordionSummary} from "@mui/material";

import {eventChatStore} from "../../../../store";
import {CreateMessageForm} from "../../../../store/EventChat/dto/createMessage.dto";
import EventChatForm from "./EventChatForm";
import Messages from "./Messages";


interface ChatProps {
    eventId: string;
}

const EventChat: FC<ChatProps> = ({eventId}) => {
    const {user} = useAuth0();

    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (open && !eventChatStore.connected) {
            eventChatStore.subscribe(eventId);
        }

        return eventChatStore.unsubscribe;
    }, [open, eventId]);

    const handleMessage = (data: CreateMessageForm) => {
        if (!user?.sub) {
            return;
        }

        eventChatStore.message({
            eid: eventId,
            uid: user?.sub,
            ...data
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
            <Messages />
            <EventChatForm onMessage={handleMessage}/>
        </Accordion>
    );
};

export default EventChat;