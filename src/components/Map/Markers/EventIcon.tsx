import React, {FC} from 'react';
import {Property} from 'csstype';
import {Icon} from '@mui/material';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import FastfoodRoundedIcon from '@mui/icons-material/FastfoodRounded';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';

import {EventsTypes} from '../../../store';


interface EventIconProps {
    eventType: EventsTypes;
}

// Пока не знаю, как будут добавляться типы событий через админ панель
type TypesIconsObject = {[key in EventsTypes]: [React.ElementType, Property.Color, Property.Color?]}
const TypesIcons: TypesIconsObject = {
    music: [MusicNoteRoundedIcon, 'red'],
    art: [AccountBalanceRoundedIcon, 'orange', 'yellow'],
    food: [FastfoodRoundedIcon, 'rosybrown', 'greenyellow'],
    other: [PriorityHighRoundedIcon, 'darkred', 'orangered'],
};

const EventIcon: FC<EventIconProps> = ({eventType}) => {
    const IconSetting = TypesIcons[eventType];

    const EIcon = IconSetting[0];
    const IconColorLight = IconSetting[1];
    const IconColorDark = IconSetting[2] || IconColorLight;

    return <Icon sx={theme => ({color: theme.palette.mode === 'light' ? IconColorLight: IconColorDark})}>
        <EIcon />
    </Icon>
};

export default EventIcon;