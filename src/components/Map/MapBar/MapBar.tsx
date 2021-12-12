import React, {FC} from 'react';
import {Box} from "@mui/material";

import ShowMe, {ShowMeProps} from "./ShowMe";
import AddEvent, {AddEventProps} from "./AddEvent";


interface MapBarProps {
}

const MapBar: FC<MapBarProps & ShowMeProps & AddEventProps> = ({setCenter, setOpen, disabled}) => {
    return (
        <Box sx={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <ShowMe disabled={disabled} setCenter={setCenter}/>
            <AddEvent disabled={disabled} setOpen={setOpen}/>
        </Box>
    );
};

export default MapBar;