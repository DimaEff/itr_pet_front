import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import {AccordionDetails, Box, Stack} from "@mui/material";

import {eventChatStore} from "../../../../store";
import Message from "./Message";


interface MessagesProps {
    open: boolean;
}

const Messages: FC<MessagesProps> = observer(({open}) => {
    const {messages} = eventChatStore;


    const container = useRef<HTMLElement>();
    const [isNear, setIsNear] = useState(true);

    const messagesEnd = useRef<HTMLElement>();
    const handleScrollToBottom = () => messagesEnd.current?.scrollIntoView({behavior: 'smooth'});

    useEffect(() => {
        const handleScroll = () => {
            const c = container.current;
            if (!c) {
                return;
            }

            const checkScroll = () => (c.scrollHeight - 360 - c.scrollTop) <= 200;

            if (checkScroll()) {
                setIsNear(true);
            } else if (!checkScroll()) {
                setIsNear(false);
            }
        }

        container.current?.addEventListener('scroll', handleScroll);

        (isNear && open) && handleScrollToBottom();
    }, [messages, isNear]);

    return (
        <AccordionDetails sx={{maxHeight: '360px', overflowY: 'auto'}} ref={container}>
            <Stack sx={{}} spacing={1} direction={'column-reverse'}>
                <Box ref={messagesEnd}/>
                {messages.map(m => <Message key={m._id} message={m}/>)}
            </Stack>
        </AccordionDetails>
    );
});

export default Messages;