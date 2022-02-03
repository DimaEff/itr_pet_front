import React, {FC} from 'react';
import {Icon} from '@mui/material';

import {IEventType} from '../../../store';


interface EventIconProps {
    eventType: IEventType;
}

const EventIcon: FC<EventIconProps> = ({eventType}) => {
    return <Icon sx={{width: '100%', height: '100%'}}>
        <img style={{width: '100%', height: '100%'}} src={eventType.icon.path} alt={'icon'}/>
    </Icon>
};

export default EventIcon;