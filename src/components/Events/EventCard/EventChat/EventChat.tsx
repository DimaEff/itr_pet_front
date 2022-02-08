import React, {FC, useEffect, useState} from 'react';
import {useAuth0} from "@auth0/auth0-react";
import {Accordion, AccordionSummary} from "@mui/material";
import {observer} from "mobx-react-lite";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';

import {eventChatStore} from "../../../../store";
import {CreateMessageForm} from "../../../../store/EventChat/dto/createMessage.dto";
import EventChatForm from "./EventChatForm";
import Messages from "./Messages";
import {IconButton} from "../../../common/Buttons";


interface ChatProps {
    eventId: string;
}

const EventChat: FC<ChatProps> = observer(({eventId}) => {
    const {user} = useAuth0();

    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (open && !eventChatStore.connect) {
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
            uid: user.sub,
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
                display: 'flex',
                flexFlow: 'column',
                justifyContent: 'flex-end',
                width: '100%',
                maxHeight: '100%',
                height: open ? '100%' : 'auto',
            }}
        >
            <AccordionSummary
                sx={{
                    position: 'absolute',
                    top: open ? 0 : -60,
                    right: 0,
                    backgroundColor: 'transparent',
                }}
            >
                <IconButton>
                    {
                        open ?
                            <CloseRoundedIcon/>
                            : <ChatRoundedIcon/>
                    }
                </IconButton>
            </AccordionSummary>
            <Messages/>
            <EventChatForm onMessage={handleMessage}/>
        </Accordion>
    );
});

export default EventChat;