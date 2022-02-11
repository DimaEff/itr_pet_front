import React, {FC, useContext} from 'react';
import {Box} from "@mui/material";
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';

import ShowMe, {ShowMeProps} from "./ShowMe";
import AddEvent, {AddEventProps} from "./AddEvent";
import MapBarItem from "../MapBarItem";
import {IconButton} from "../../common/Buttons";
import {appStore} from "../../../store";


interface MapBarProps {
}

const MapBar: FC<MapBarProps & ShowMeProps & AddEventProps> = ({setOpen, disabled}) => {
    const {setDrawerOpen} = appStore;

    return (
        <Box
            sx={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}
        >
            <ShowMe disabled={disabled}/>
            <AddEvent disabled={disabled} setOpen={setOpen}/>
            <IconButton onClick={() => setDrawerOpen(true)}>
                <MapBarItem>
                    <ViewListRoundedIcon fontSize={'large'}/>
                </MapBarItem>
            </IconButton>
        </Box>
    );
};

export default MapBar;