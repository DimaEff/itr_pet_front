import React, {FC} from 'react';
import {useAuth0} from "@auth0/auth0-react";
import {Paper, Typography} from "@mui/material";

import {IMessage} from "../../../../store";


interface MessageProps {
    message: IMessage;
}

const Message: FC<MessageProps> = ({message}) => {
    const {user} = useAuth0();

    return (
        <Paper
            elevation={0}
            sx={{
                p: 1,
                background: user?.sub === message.uid ?
                    'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' :
                    'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: user?.sub === message.uid ?
                    '0 3px 5px 2px rgba(255, 105, 135, .3)' :
                    '0 3px 5px 2px rgba(33, 203, 243, .3)',
            }}
        >
            <Typography>
                {message._id}
            </Typography>
            <Typography>
                {message.message}
            </Typography>
        </Paper>
    );
};

export default Message;